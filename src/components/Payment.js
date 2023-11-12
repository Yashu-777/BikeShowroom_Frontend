import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Payment.css'; // Import your custom CSS

function Payment() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();

    // Simulate loading state
    setLoading(true);

    // Simulate payment logic (replace with actual logic)
    setTimeout(() => {
      setLoading(false);
      setPaymentStatus('Payment successful');
    }, 2000);
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>
      {isAuthenticated ? (
        <form className="payment-form" onSubmit={handlePayment}>
          <div className="form-group">
            <label className="custom-label" htmlFor="cardNumber">
              Card Number:
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="custom-label" htmlFor="expiryDate">
              Expiry Date:
            </label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="custom-label" htmlFor="cvv">
              CVV:
            </label>
            <input type="text" id="cvv" value={cvv} onChange={(e) => setCVV(e.target.value)} />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      ) : (
        <div className="unauthenticated-message">
          <p>You need to be authenticated to make a payment.</p>
          <button onClick={() => navigate('/signup')}>Signup</button>
        </div>
      )}
      {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
    </div>
  );
}

export default Payment;
