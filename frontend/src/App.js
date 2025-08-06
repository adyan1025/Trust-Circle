// import React from 'react';
// import Header from './components/Header';
// import Hero from './components/Hero';
// import Steps from './components/Steps';
// import Features from './components/Features';
// import CTA from './components/CTA';
// import Footer from './components/Footer';
// import GridBackground from './components/GridBackground';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <GridBackground />
//       <Header />
//       <Hero />
//       <Steps />
//       <Features />
//       <CTA />
//       <Footer />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import GroupPage from './pages/GroupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/group" element={<GroupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
