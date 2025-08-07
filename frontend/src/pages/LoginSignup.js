import React, { useState } from 'react';
import Header from '../components/Header';
import '../css/LoginSignup.css';

const LoginSignup = ({ mode = 'login' }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    ssn: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const BASE_URL = 'https://trust-circle.cfapps.us10-001.hana.ondemand.com';
    // const url = mode === 'login' ? `${BASE_URL}/login` : `${BASE_URL}/signup`;

    const payload = mode === 'login'
      ? { email: formData.email, password: formData.password }
      : {
          firstName: formData.firstName,
          lastName: formData.lastName,
          dob: formData.dob,
          email: formData.email,
          phone: formData.phone,
          ssn: formData.ssn,
          password: formData.password
        };

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const contentType = response.headers.get('content-type');

      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Expected JSON, got:', text);
        alert('Server returned unexpected response. Check console for details.');
        return;
      }

      const result = await response.json();

      if (response.ok) {
        if (mode === 'login') {
          localStorage.setItem('userId', result.userID);
          window.location.href = '/group';
        } else {
          alert(result.message || 'Signup successful');
        }
      } else {
        alert(result.message || `${mode} failed`);
      }
    } catch (err) {
      console.error('Fetch failed:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <div>
      <Header showButtons={false} />
      <div className="form-container">
        <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              <input id="firstName" type="text" placeholder="First Name" required onChange={handleChange} />
              <input id="lastName" type="text" placeholder="Last Name" required onChange={handleChange} />
              <input id="email" type="email" placeholder="Email" required onChange={handleChange} />
              <input id="phone" type="tel" placeholder="Phone" required onChange={handleChange} />
              <input id="dob" type="text" placeholder="Date of Birth (MM/DD/YYYY)" required onChange={handleChange} />
              <input id="ssn" type="text" placeholder="SSN" required onChange={handleChange} />
              <input id="password" type="password" placeholder="Password" required minLength={6} onChange={handleChange} />
            </>
          )}
          {mode === 'login' && (
            <>
              <input id="email" type="email" placeholder="Email" required onChange={handleChange} />
              <input id="password" type="password" placeholder="Password" required minLength={6} onChange={handleChange} />
            </>
          )}
          <button type="submit">{mode === 'login' ? 'Login' : 'Sign Up'}</button>
        </form>
        <div className="switch-link">
          {mode === 'login' ? (
            <>Don't have an account? <a href="/signup">Sign Up</a></>
          ) : (
            <>Already have an account? <a href="/login">Login</a></>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
