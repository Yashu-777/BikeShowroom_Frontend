import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Payment() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);

  const {isAuthenticated} = useAuth();
  console.log(isAuthenticated);

  const handlePayment = async (e) => {
    e.preventDefault();
    // Implement payment logic here (e.g., simulate success)
    // Set paymentStatus based on the payment outcome
    setPaymentStatus('Payment successful');
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <form onSubmit={handlePayment}>
        <div className="form-group">
          <label>Card Number:</label>
          <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Expiry Date:</label>
          <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>CVV:</label>
          <input type="text" value={cvv} onChange={(e) => setCVV(e.target.value)} />
        </div>
        <button type="submit">Pay Now</button>
      </form>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
}

export default Payment;
