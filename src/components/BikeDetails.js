import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext'; // Import your AuthContext
import { useState,useEffect } from 'react';
import axios from 'axios';
import './BikeCarousel'
import BikeCarousel from './BikeCarousel';

const BikeDetails = ({id}) => {
  // Access the context
  const { isAuthenticated } = useAuth();
  
  // Create a navigate function to programmatically navigate
  const navigate = useNavigate();


  const [selectedColor, setSelectedColor] = useState('imageblack'); // Default color
  const [bikeDetails, setBikeDetails] = useState(null);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };




  // Function to handle the "Purchase Bike" button click
  const handlePurchaseClick = () => {
    // Check if the user is authenticated using the context state
    if (isAuthenticated) {
      // User is authenticated, you can proceed with the bike purchase logic
      navigate('/payment');
    } else {
      // User is not authenticated, navigate to the Signup page
      navigate('/signup');
    }
  };


  useEffect(() => {
    if (id) {
      // Fetch bike details based on bikeId from your API
      axios.get(`http://localhost:4000/api/bikes/${id}`)
        .then((response) => {
          setBikeDetails(response.data);
        })
        .catch((error) => {
          console.error('Error fetching bike details:', error);
        });
    }
  }, [id]);

  return (
    <div>
    <div className="bike-details-container">
      {bikeDetails && (
        <div className="bike-details">
          <div className="color-options">
            <button
              key="imageblack"
              onClick={() => handleColorChange("imageblack")}
              className={`color-button ${selectedColor === "imageblack" ? "active" : ""}`}
              style={{ backgroundColor: "black", height: "35px" }}
            ></button>
            <button
              key="imageblue"
              onClick={() => handleColorChange("imageblue")}
              className={`color-button ${selectedColor === "imageblue" ? "active" : ""}`}
              style={{ backgroundColor: "blue", height: "35px" }}
            ></button>
            <button
              key="imagered"
              onClick={() => handleColorChange("imagered")}
              className={`color-button ${selectedColor === "imagered" ? "active" : ""}`}
              style={{ backgroundColor: "red", height: "35px" }}
            ></button>
          </div>
          <div className="bike-options">
            <div className="bike-image-container">
              <img
                src={bikeDetails[selectedColor]}
                alt="Bike"
                style={{ maxWidth: '100%', height: '400px' }}
              />
            </div>
            <div className="purchase-section">
              <h4>{bikeDetails.brand} {bikeDetails.model}</h4>
              <h4>Price: ₹ {bikeDetails.price}</h4>
              <button onClick={handlePurchaseClick} style={{marginBottom: '40px'}}>Purchase Bike</button>
            </div>
          </div>
          <div className="bike-details-table">
            
            <table className="product-table">
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Brand</td>
                  <td>{bikeDetails.brand}</td>
                </tr>
                <tr>
                  <td>Model</td>
                  <td>{bikeDetails.model}</td>
                </tr>
                <tr>
                  <td>Mileage</td>
                  <td>{bikeDetails.mileage}</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>{bikeDetails.weight}</td>
                </tr>
                <tr>
                  <td>Engine Capacity</td>
                  <td>{bikeDetails.EngineCapacity}</td>
                </tr>
                <tr>
                  <td>Fuel Tank Capacity</td>
                  <td>{bikeDetails.FuelTankCapacity}</td>
                </tr>
                <tr>
                  <td>Seat Height</td>
                  <td>{bikeDetails.SeatHeight}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      
    </div>
    <div>
    <BikeCarousel/>
    </div>
    </div>

  );
};

export default BikeDetails;