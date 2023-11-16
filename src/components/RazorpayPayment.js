// RazorpayPayment.js
import React, { useState } from 'react';
import axios from 'axios';

const RazorpayPayment = ({ amount, onSuccess }) => {
  const [paymentId, setPaymentId] = useState(null);

  const handlePayment = async () => {
    try {
      // Make an API request to your backend to create a Razorpay order
      const response = await axios.post('http://localhost:4000/api/orders', {
        amount: amount * 100, // Razorpay expects amount in paisa
      });
      console.log('Razorpay Order API Response:', response.data);
      const { orderId, options } = response.data;

      console.log('Order ID:', orderId);
      console.log('Options:', options);

      const razorpay = new window.Razorpay(options);
      console.log('Razorpay instance created');

      razorpay.on('payment.success', (response) => {
        console.log('Payment success callback triggered:', response);
        setPaymentId(response.razorpay_payment_id);
        onSuccess(response.razorpay_payment_id);
      });

      razorpay.on('payment.error', (error) => {
        console.error('Payment failed:', error);
      });

      razorpay.open();
      console.log('Razorpay dialog opened');
      
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay Now</button>
      {paymentId && <p>Payment successful. Payment ID: {paymentId}</p>}
    </div>
  );
};

export default RazorpayPayment;
