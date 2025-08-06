import React, { useState } from 'react';

const MemberCircle = ({ groupData, hidden, animationsLoaded }) => {

    const [hoveredMember, setHoveredMember] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = (memberData, event) => {
        setHoveredMember(memberData);
        setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event) => {
    if (hoveredMember) {
        setMousePosition({ x: event.clientX, y: event.clientY });
    }
    };

    const handleMouseLeave = () => {
        setHoveredMember(null);
    };

  return (
    <div className={`circle-wrapper ${animationsLoaded ? 'animate-circle' : ''}`}>
      <div className="dotted-circle"></div>
      <div className="center-info">
        <h2 id="total-pool" className={`${animationsLoaded ? 'animate-pool' : ''}`}>
          {hidden ? '****' : groupData.groupBalance}
        </h2>
        <p className={`payment-info ${animationsLoaded ? 'animate-payment-info' : ''}`}>
          {hidden ? '****' : groupData.groupBalance} out of {hidden ? '****' : groupData.poolSize}
        </p>
      </div>
      
      {/* Add members-container div that will rotate */}
      <div className={`members-container ${animationsLoaded ? 'animate-members' : ''}`}>
        {/* Render members in a circle */}
        {groupData.members.map((member, index) => {
          const angle = (2 * Math.PI / groupData.members.length) * index;
          const radius = 200;
          const x = radius * Math.cos(angle) + 200;
          const y = radius * Math.sin(angle) + 200;
          
          return (
            <div 
              key={index}
              className={`member ${animationsLoaded ? 'animate-member' : ''}`}
              style={{
                left: `${x}px`,
                top: `${y}px`,
                animationDelay: `${0.2 + (index * 0.15)}s`,
                // Counter-rotate to keep members upright while they orbit
                transform: 'translate(-50%, -50%) rotate(0deg)',
                animation: `${animationsLoaded ? 'fadeIn 0.5s ease-out forwards, ' : ''}counterRotate 30s linear infinite`
              }}
              onMouseEnter={(e) => handleMouseEnter(member, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {typeof member === 'string' ? member : member.initials}
            </div>
          );
        })}
      </div>
      {/* Hover Popup */}
      {hoveredMember && (
        <div 
          className="member-popup"
          style={{
            left: `${mousePosition.x + 15}px`,
            top: `${mousePosition.y - 10}px`
          }}
        >
          <div className="popup-content">
            <h4>{typeof hoveredMember === 'string' ? hoveredMember : hoveredMember.name}</h4>
            <div className="popup-details">
              <p><strong>Status:</strong> {typeof hoveredMember === 'string' ? 'Active' : hoveredMember.status}</p>
              <p><strong>Contribution:</strong> {typeof hoveredMember === 'string' ? '$100' : hoveredMember.contribution}</p>
              <p><strong>Position:</strong> {typeof hoveredMember === 'string' ? 'Member' : hoveredMember.position}</p>
              {typeof hoveredMember === 'object' && hoveredMember.nextPayout && (
                <p><strong>Next Payout:</strong> {hoveredMember.nextPayout}</p>
              )}
            </div>
          </div>
          <div className="popup-arrow"></div>
        </div>
      )}
    </div>
  );
};

export default MemberCircle;