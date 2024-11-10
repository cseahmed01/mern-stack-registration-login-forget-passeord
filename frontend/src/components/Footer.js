// src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-light py-3 mt-5">
      <div className="container text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} MyApp. All Rights Reserved.
        </p>
        <p>
          <a href="/privacy-policy" className="text-decoration-none">Privacy Policy</a> | 
          <a href="/terms" className="text-decoration-none"> Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
