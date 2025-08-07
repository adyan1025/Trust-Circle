import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GridBackground from '../components/GridBackground';
import LoanRequestTable from '../components/LoanRequestTable';
import LoanRequestModal from '../components/LoanRequestModal';
import PayModal from '../components/PayModal';
import '../css/App.css';
import '../css/GroupPage.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import ChatbotWidget from '../components/ChatbotWidget';
import TransactionHistory from '../components/TransactionHistory';

const GroupPage = () => {
  const [hidden, setHidden] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [animationsLoaded, setAnimationsLoaded] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [showLatePopup, setShowLatePopup] = useState(false);

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
      members: ['MB', 'AJ', 'NL', 'HC', 'HW'],
      transactions: [
        { name: 'Alex Johnson', amount: '$500', date: 'May 1, 2025' },
        { name: 'Sarah Lee', amount: '$300', date: 'May 3, 2025' },
      ],
      nextPaymentDue: 'September 15, 2025',
    },
    {
      name: 'Vacation Trip',
      poolSize: '$3,200',
      groupBalance: '$2,300',
      members: ['AD', 'BC', 'CD'],
      transactions: [
        { name: 'Chris P', amount: '$200', date: 'April 28, 2025' },
      ],
      nextPaymentDue: 'August 28, 2025',
    },
    {
      name: 'Startup Fund',
      poolSize: '$10,000',
      groupBalance: '$8,000',
      members: ['AA', 'BB', 'CC', 'DD'],
      transactions: [
        { name: 'Alice W', amount: '$1000', date: 'May 2, 2025' },
        { name: 'Bob K', amount: '$500', date: 'May 4, 2025' },
      ],
      isLate: true,
      nextPaymentDue: 'May 10, 2025',
    },
  ]);

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

  const groupData = allGroups[currentGroupIndex];

  useEffect(() => {
    setTimeout(() => {
      setAnimationsLoaded(true);
      setHasInitialized(true);
    }, 100);
  }, []);

  useEffect(() => {
    const isLate = allGroups[currentGroupIndex]?.isLate;
    setShowLatePopup(!!isLate);
  }, [currentGroupIndex]);

  const toggleBalances = () => setHidden(!hidden);

  const openModal = () => {
    setModalOpen(true);
    setFormData({ ...formData, date: formatDate(new Date()) });
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    const modalElement = document.getElementById('loan-modal');
    if (modalElement) {
      modalElement.classList.add('fade-out');
      setTimeout(() => {
        setModalOpen(false);
        document.body.classList.remove('modal-open');
        modalElement.classList.remove('fade-out');
      }, 300);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const submitRequest = () => {
    const { reason, amount } = formData;
    if (reason && amount) {
      const newRequest = {
        name: 'You',
        amount: `$${amount}`,
        reason,
        date: formData.date,
        status: `0/${groupData.members.length} Approved`,
        requiresAction: false
      };
      setLoanRequests([...loanRequests, newRequest]);
      closeModal();
      setFormData({ reason: '', amount: '', date: formatDate(new Date()) });
    }
  };

  function formatDate(dateObj) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
  }

  const getMemberPosition = (index, totalMembers, radius = 180) => {
    const angle = (index * 360) / totalMembers;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return { left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` };
  };

  const CustomMemberCircle = ({ groupData, hidden, slideIndex, isActive }) => (
    <div className={`circle-wrapper`}>
      <div className="dotted-circle"></div>
      <div className="members-container">
        {groupData.members.map((member, index) => {
          const position = getMemberPosition(index, groupData.members.length);
          return (
            <div
              key={`${slideIndex}-${index}`}
              className="member"
              style={{ ...position, animation: 'counterRotate 30s linear infinite' }}
            >
              {member}
            </div>
          );
        })}
      </div>
      <div className="center-info">
        <h2>{hidden ? '••••' : groupData.groupBalance}</h2>
        <p>out of</p>
        <div style={{ marginTop: '10px' }}>
          <h2 style={{ fontSize: '2rem', color: '#48cae4' }}>
            {hidden ? '••••' : groupData.poolSize}
          </h2>
        </div>
        {groupData.nextPaymentDue && (
          <div
            className="next-payment-info"
            style={{
              marginTop: '12px',
              fontSize: '0.9rem',
              color: groupData.isLate ? 'red' : '#444',
              fontWeight: groupData.isLate ? 'bold' : 'normal'
            }}
          >
            <strong>Next Due:</strong> {groupData.nextPaymentDue}
          </div>
        )}
      </div>
    </div>
  );

  const handlePayment = (amount) => {
    alert(`You paid $${amount.toFixed(2)} to ${groupData.name}`);
    const newTransaction = {
      name: 'You',
      amount: `$${amount.toFixed(2)}`,
      date: formatDate(new Date())
    };
    const updatedGroups = [...allGroups];
    updatedGroups[currentGroupIndex].transactions.unshift(newTransaction);
    setAllGroups(updatedGroups);
  };

  return (
    <>
      <GridBackground />
      <Header />

      {showLatePopup && (
        <div className="late-popup">
          <div className="late-popup-content">
            <button className="late-popup-close" onClick={() => setShowLatePopup(false)}>✖</button>
            <h2>⚠️ Late Payment Warning</h2>
            <p>
              Your payment for the <strong>{groupData.name}</strong> is overdue.
              Please make a payment immediately to avoid penalties.
            </p>
          </div>
        </div>
      )}

      <main className="main-content">
        <div className={`container ${hasInitialized ? 'animate-container' : ''}`}>
          <div className={`group-name ${hasInitialized ? 'animate-title' : ''}`}>
            <h2>{groupData.name}</h2>
            <button className="pay-button" onClick={() => setPayModalOpen(true)}>
              Make a Payment
            </button>
          </div>

          <Swiper
            modules={[Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView={1.7}
            loop={false}
            spaceBetween={500}
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
                  slideIndex={index}
                  isActive={index === currentGroupIndex}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='tables'>
            <div className='single-table'>
              <div className={`loan-header ${hasInitialized ? 'animate-loan-header' : ''}`} >
                <h2>Transaction History</h2>
              </div>
              <TransactionHistory groupData={groupData} animationsLoaded={hasInitialized} />
            </div>

            <div className='single-table'>
              <div className={`loan-header ${hasInitialized ? 'animate-loan-header' : ''}`}>
                <h2>Loan Requests</h2>
                <button className="request-loan-btn" onClick={openModal}>+</button>
              </div>
              <LoanRequestTable loanRequests={loanRequests} animationsLoaded={hasInitialized} />
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

      {payModalOpen && (
        <PayModal
          groupName={groupData.name}
          closeModal={() => setPayModalOpen(false)}
          handlePayment={handlePayment}
        />
      )}

      <ChatbotWidget />
      <Footer />
    </>
  );
};

export default GroupPage;
