import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GridBackground from '../components/GridBackground';
import MemberCircle from '../components/MemberCircle';
import LoanRequestTable from '../components/LoanRequestTable';
import LoanRequestModal from '../components/LoanRequestModal';
import '../css/App.css';
import '../css/GroupPage.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

const totalCircles = 1

const GroupPage = () => {
  const [hidden, setHidden] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [animationsLoaded, setAnimationsLoaded] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false); // Track if initial animations have run
  const [formData, setFormData] = useState({
    reason: '',
    amount: '',
    date: formatDate(new Date())
  });
  const [allGroups, setAllGroups] = useState([
    {
      name: 'Roomate Rent',
      poolSize: '$7,500',
      groupBalance: '$5,000',
      members: ['MB', 'AJ', 'NL', 'HC', 'HW']
    },
    {
        name: 'Vacation Trip',
        poolSize: '$3,200',
        groupBalance: '$2,300',
        members: ['AD', 'BC', 'CD']
    },
    {
        name: 'Startup Fund',
        poolSize: '$10,000',
        groupBalance: '$8,000',
        members: ['AA', 'BB', 'CC', 'DD']
    }
]);
const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
const groupData = allGroups[currentGroupIndex];

const [loanRequests, setLoanRequests] = useState([
    {
      name: 'Alex Johnson',
      amount: '$500',
      reason: 'Medical Expense',
      date: 'May 1, 2025',
      status: '3/5',
      requiresAction: true
    }
  ]);

  // Trigger animations when component mounts
  useEffect(() => {
    setTimeout(() => {
      setAnimationsLoaded(true);
      setHasInitialized(true);
    }, 100);
  }, []);

  // Toggle visibility of balance numbers
  const toggleBalances = () => {
    setHidden(!hidden);
  };

  // Open the loan request modal
  const openModal = () => {
    setModalOpen(true);
    setFormData({
      ...formData,
      date: formatDate(new Date())
    });
    document.body.classList.add('modal-open');
  };

  // Close the modal
  const closeModal = () => {
    const modalElement = document.getElementById('loan-modal');
    if (modalElement) {
      modalElement.classList.add('fade-out');
    
      setTimeout(() => {
        setModalOpen(false);
        document.body.classList.remove('modal-open');
        if (modalElement) {
          modalElement.classList.remove('fade-out');
        }
      }, 300);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Submit a new loan request
  const submitRequest = () => {
    const { reason, amount } = formData;
    
    if (reason && amount) {
      const newRequest = {
        name: 'You',
        amount: `$${amount}`,
        reason: reason,
        date: formData.date,
        status: `0/${groupData.members.length} Approved`,
        requiresAction: false
      };
      
      setLoanRequests([...loanRequests, newRequest]);
      closeModal();
      setFormData({
        reason: '',
        amount: '',
        date: formatDate(new Date())
      });
    }
  };

  // Format date for display
  function formatDate(dateObj) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
  }

  // Function to calculate member positions around the circle
  const getMemberPosition = (index, totalMembers, radius = 180) => {
    const angle = (index * 360) / totalMembers;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return {
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`
    };
  };

  // Custom MemberCircle component with rotating members
  const CustomMemberCircle = ({ groupData, hidden, shouldAnimate, slideIndex, isActive }) => {
    return (
      <div className={`circle-wrapper ${shouldAnimate && isActive ? 'animate-circle' : ''}`}>
        <div className="dotted-circle"></div>
        
        {/* Rotating members container */}
        <div className="members-container">
          {groupData.members.map((member, index) => {
            const position = getMemberPosition(index, groupData.members.length);
            return (
              <div
                key={`${slideIndex}-${index}`} // Unique key per slide
                className="member"
                style={{
                  ...position,
                  // Only apply initial fade animation, not the counter-rotate flicker
                  animation: 'counterRotate 30s linear infinite'
                }}
              >
                {member}
              </div>
            );
          })}
        </div>

        {/* Center info */}
        <div className="center-info">
          <h2>{hidden ? '••••' : groupData.groupBalance}</h2>
          <p>out of</p>
          <div style={{ marginTop: '10px' }}>
            <h2 style={{ fontSize: '2rem', color: '#48cae4' }}>
              {hidden ? '••••' : groupData.poolSize}
            </h2>
            <p style={{ fontSize: '1.2rem' }}></p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <GridBackground />
      <Header />
      
      <main className="main-content">
        <div className={`container ${hasInitialized ? 'animate-container' : ''}`}>
          <div className={`group-name ${hasInitialized ? 'animate-title' : ''}`}>
            <h2>{groupData.name}</h2>
          </div>
          
          <Swiper
            modules={[Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1.7}
            loop={false}
            spaceBetween={500}
            autoHeight={false}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 250,
                modifier: 1.5,
                slideShadows: false,
            }}
            navigation
            className="member-carousel"
            onSlideChange={(swiper) => setCurrentGroupIndex(swiper.activeIndex)}
            initialSlide={0}
          >
            {allGroups.map((group, index) => (
              <SwiperSlide key={index}>
                <CustomMemberCircle 
                  groupData={group}
                  hidden={hidden}
                  shouldAnimate={animationsLoaded}
                  slideIndex={index}
                  isActive={index === currentGroupIndex}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='tables'>
            <div className='single-table'>
              <div className={`loan-header ${hasInitialized ? 'animate-loan-header' : ''}`}>
                <h2>Transaction History</h2>
                <button className="request-loan-btn" onClick={openModal}>
                  +
                </button>
              </div>
              <LoanRequestTable 
                loanRequests={loanRequests} 
                animationsLoaded={hasInitialized} 
              />
            </div>

            <div className='single-table'>
              <div className={`loan-header ${hasInitialized ? 'animate-loan-header' : ''}`}>
                <h2>Loan Requests</h2>
                <button className="request-loan-btn" onClick={openModal}>
                  +
                </button>
              </div>
              <LoanRequestTable 
                loanRequests={loanRequests} 
                animationsLoaded={hasInitialized} 
              />
            </div>
          </div>
        </div>
      </main>
      
      {modalOpen && (
        <LoanRequestModal
          formData={formData}
          handleInputChange={handleInputChange}
          submitRequest={submitRequest}
          closeModal={closeModal}
          handleBackdropClick={(e) => {
            if (e.target.id === 'loan-modal') {
              closeModal();
            }
          }}
        />
      )}
      
      <Footer />
    </>
  );
};

export default GroupPage;