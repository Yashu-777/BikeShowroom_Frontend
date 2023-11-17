// SuccessPage.js
import React from 'react';
import './SuccessPage.css';

const SuccessPage = () => {
  return (
    <div className="success-container">
      <h1 className="success-heading">Payment Successful!</h1>
      <h2 className="success-message">Thank you for your purchase.</h2>
      {/* You can add more content or redirect to another page from here if needed. */}
    </div>
  );
};

export default SuccessPage;
