// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Menu from './components/Menu';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Ensure Bootstrap's JavaScript is also included
import Footer from './components/Footer';
import ResetPassword from './components/ResetPassword';
import ResetPasswordForm from './components/ResetPasswordForm';


function App() {
  return (
    <Router>
      <Menu />
      <div className="container mt-5">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset/:token" element={<ResetPasswordForm />} /> {/* Updated */}
          
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
