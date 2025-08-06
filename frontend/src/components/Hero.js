import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <h2>Save Together. Borrow Smarter.</h2>
      <p>Build trust, share resources, and access funds when you need them most with your own trusted circle of friends and family.</p>
      <button onClick={() => window.location.href = 'signup.html'}>Start Your Circle Today</button>
    </section>
  );
};

export default Hero;