// src/components/ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5050/api/reset-password', { email });
      setMessage('If this email is registered, a reset link has been sent.');
    } catch (error) {
      setMessage('Error sending reset email. Please try again.');
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default ResetPassword;
