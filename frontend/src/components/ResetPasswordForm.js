// src/components/ResetPasswordForm.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ResetPasswordForm() {
  const { token } = useParams();  // Get the token from the URL
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      // Send the new password and token to the backend to update the password
      await axios.post('mern-stack-registration-login-forget-password-api.vercel.app/api/reset', { token, newPassword });
      setMessage('Password has been reset successfully.');
    } catch (error) {
      setMessage('Error resetting password. Please try again.');
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Enter New Password</h2>
      <form onSubmit={handlePasswordReset}>
        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Reset Password</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default ResetPasswordForm;
