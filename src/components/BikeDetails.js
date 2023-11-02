import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BikeDetails() {
  // State to track whether the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Create a navigate function to programmatically navigate
  const navigate = useNavigate();

  // Function to handle the "Purchase Bike" button click
  const handlePurchaseClick = () => {
    // Check if the user is authenticated
    if (isAuthenticated) {
      // User is authenticated, you can proceed with the bike purchase logic
      alert('Purchase bike logic goes here');
    } else {
      // User is not authenticated, navigate to the Signup page
      navigate('/signup');
    }
  };

  return (
    <div>
      {/* Other Bike details */}
      <button onClick={handlePurchaseClick}>Purchase Bike</button>
    </div>
  );
}

export default BikeDetails;
