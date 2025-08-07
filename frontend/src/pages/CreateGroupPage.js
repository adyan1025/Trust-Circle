import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GridBackground from '../components/GridBackground';
import '../css/App.css';
import '../css/GroupPage.css';

const CreateGroupPage = () => {
  const [hasInitialized, setHasInitialized] = useState(false);
  const [groupData, setGroupData] = useState({
    name: '',
    poolSize: '',
    members: []
  });
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberInitials, setNewMemberInitials] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setHasInitialized(true);
    }, 100);
  }, []);

  const handleGroupNameChange = (e) => {
    setGroupData({
      ...groupData,
      name: e.target.value
    });
  };

  const handlePoolSizeChange = (e) => {
    setGroupData({
      ...groupData,
      poolSize: e.target.value
    });
  };

  const handleMemberNameChange = (e) => {
    const name = e.target.value;
    setNewMemberName(name);
    // Auto-generate initials from name
    const initials = name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
    setNewMemberInitials(initials);
  };

  const handleInitialsChange = (e) => {
    setNewMemberInitials(e.target.value.toUpperCase().slice(0, 2));
  };

  const addMember = () => {
    if (newMemberName.trim() && newMemberInitials.trim()) {
      const newMember = {
        name: newMemberName.trim(),
        initials: newMemberInitials.trim()
      };
      
      setGroupData({
        ...groupData,
        members: [...groupData.members, newMember]
      });
      
      setNewMemberName('');
      setNewMemberInitials('');
    }
  };

  const removeMember = (indexToRemove) => {
    setGroupData({
      ...groupData,
      members: groupData.members.filter((_, index) => index !== indexToRemove)
    });
  };

  const getMemberPosition = (index, totalMembers, radius = 180) => {
    if (totalMembers === 0) return { left: '50%', top: '50%' };
    
    const angle = (index * 360) / totalMembers;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return {
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`
    };
  };

  const CreateGroupMemberCircle = ({ groupData, shouldAnimate }) => {
    return (
      <div className={`circle-wrapper ${shouldAnimate ? 'animate-circle' : ''}`}>
        <div className="dotted-circle"></div>
        
        <div className="members-container">
          {groupData.members.map((member, index) => {
            const position = getMemberPosition(index, groupData.members.length);
            return (
              <div
                key={index}
                className="member"
                style={{
                  ...position,
                  animation: 'counterRotate 30s linear infinite'
                }}
              >
                {member.initials}
              </div>
            );
          })}
        </div>

        <div className="center-info">
          <h2 style={{ fontSize: '1.5rem', color: '#0077b6' }}>
            {groupData.name || 'Group Name'}
          </h2>
          <p style={{ fontSize: '0.9rem', margin: '10px 0' }}>Pool Size:</p>
          <div style={{ marginTop: '10px' }}>
            <h2 style={{ fontSize: '2rem', color: '#48cae4' }}>
              {groupData.poolSize ? `$${groupData.poolSize}` : '$0'}
            </h2>
          </div>
        </div>
      </div>
    );
  };

  const createGroup = () => {
    if (groupData.name && groupData.poolSize && groupData.members.length > 0) {
      // Here you would typically save to a database or state management
      console.log('Creating group:', groupData);
      alert('Group created successfully!');
      // Reset form or navigate to the new group
      setGroupData({
        name: '',
        poolSize: '',
        members: []
      });
    } else {
      alert('Please fill in all fields and add at least one member.');
    }
  };

  return (
    <>
      <GridBackground />
      <Header />

      <main className="cg-main-content">
        <div className={`container ${hasInitialized ? 'animate-container' : ''}`}>
          <div className={`group-name ${hasInitialized ? 'animate-title' : ''}`}>
            <h2>Create New Group</h2>
          </div>

          <div className="create-group-layout">
            {/* Left Side - Forms */}
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="groupName">Group Name</label>
                <input
                  type="text"
                  id="groupName"
                  value={groupData.name}
                  onChange={handleGroupNameChange}
                  placeholder="Enter group name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="poolSize">Initial Pool Size ($)</label>
                <input
                  type="number"
                  id="poolSize"
                  value={groupData.poolSize}
                  onChange={handlePoolSizeChange}
                  placeholder="Enter pool size"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Add Members</label>
                <div className="member-input-group">
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={handleMemberNameChange}
                    placeholder="Member name"
                    className="form-input member-name-input"
                  />
                  <input
                    type="text"
                    value={newMemberInitials}
                    onChange={handleInitialsChange}
                    placeholder="Initials"
                    className="form-input member-initials-input"
                    maxLength="2"
                  />
                  <button 
                    onClick={addMember}
                    className="add-member-btn"
                    disabled={!newMemberName.trim() || !newMemberInitials.trim()}
                  >
                    Add
                  </button>
                </div>
              </div>

              {groupData.members.length > 0 && (
                <div className="members-list">
                  <h4>Members ({groupData.members.length})</h4>
                  {groupData.members.map((member, index) => (
                    <div key={index} className="member-item">
                      <span className="member-initials">{member.initials}</span>
                      <span className="member-name">{member.name}</span>
                      <button 
                        onClick={() => removeMember(index)}
                        className="remove-member-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button 
                onClick={createGroup}
                className="create-group-btn"
                disabled={!groupData.name || !groupData.poolSize || groupData.members.length === 0}
              >
                Create Group
              </button>
            </div>

            {/* Right Side - Member Circle Preview */}
            <div className="preview-section">
              <h3>Group Preview</h3>
              <CreateGroupMemberCircle 
                groupData={groupData}
                shouldAnimate={hasInitialized}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CreateGroupPage;