// src/components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function ProtectedRoute({ children }) {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://mern-stack-registration-login-forget-password-api.vercel.app/api/verify-token', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.valid) {
          setIsVerified(true);
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return isVerified ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
