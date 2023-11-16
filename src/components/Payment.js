// Payment.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate,useLocation } from 'react-router-dom';
import RazorpayPayment from './RazorpayPayment'; // Import the Razorpay component
import './Payment.css'
function Payment() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Access price from location.state
  const { price, color, brand, model,pic } = location.state || {};

  console.log(color);
  const handlePaymentSuccess = (paymentId) => {
    // Handle successful payment (e.g., update order status, navigate to success page)
    console.log('Payment successful. Payment ID:', paymentId);
  };

  return (
    <div>
      <h2 className='paymenth2'>Purchase Confirmation</h2>
      <div >
        {isAuthenticated ? (
          <div className="payment-container">
            <div><img src={pic} alt="bike" /></div>
            <div>
              <h3>Brand: {brand}</h3>
              <h3>Model: {model}</h3>
              <h3>Variant : {color}</h3>
              <RazorpayPayment amount={price} onSuccess={handlePaymentSuccess} />
            </div>
          </div>
        ) : (
          <div className="unauthenticated-message">
            <p>You need to be authenticated to make a payment.</p>
            <button onClick={() => navigate('/signup')}>Signup</button>
          </div>
        )}  
      </div>
    </div>
  );
}

export default Payment;
