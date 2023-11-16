import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext'; // Import your AuthContext
import { useState,useEffect } from 'react';
import axios from 'axios';
import './BikeCarousel'
import BikeCarousel from './BikeCarousel';
import './BikeDetails.css'

const BikeDetails = ({id}) => {
  // Access the context
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState('imageblack');
  const [selectedAngle, setSelectedAngle] = useState('imageblack'); // Default angle
  const [bikeDetails, setBikeDetails] = useState(null);


  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedAngle(`image${color}`);
  };

  const handleAngleChange = (angle) => {
    setSelectedAngle(angle);
  };

  const handleMouseOut = () => {
    // Reset selectedAngle to the default value when the mouse leaves the color buttons container
    setSelectedAngle("imageblack");
  };
  
  // Function to handle the "Purchase Bike" button click
  const handlePurchaseClick = () => {
    // Check if the user is authenticated using the context state
    if (isAuthenticated) {
      // User is authenticated, you can proceed with the bike purchase logic
      const colorPrefix = selectedColor.startsWith("image") ? "" : "image";
      
      navigate('/payment', {
        state: {
          price: parseInt(bikeDetails.price.replace(/,/g, '')),
          color: selectedColor,
          brand: bikeDetails.brand,
          model: bikeDetails.model,
          pic: bikeDetails[colorPrefix + selectedColor],
        },
      });
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

  
  useEffect(() => {
    // Update the bikeDetails state when it changes
    setBikeDetails(bikeDetails);
  }, [bikeDetails]);
  
  return (
    <div>
      <div className="bike-details-container">
        {bikeDetails && (
          <div className="bike-details">
            <div className="color-options">
                <button
                  key="imageblack"
                  onClick={() => handleColorChange("black")}
                  className={`color-button ${selectedColor === "black" ? "active" : ""}`}
                  style={{ backgroundColor: "black", height: "35px" }}
                ></button>
                <button
                  key="imageblue"
                  onClick={() => handleColorChange("blue")}
                  className={`color-button ${selectedColor === "blue" ? "active" : ""}`}
                  style={{ backgroundColor: "blue", height: "35px" }}
                ></button>
                <button
                  key="imagered"
                  onClick={() => handleColorChange("red")}
                  className={`color-button ${selectedColor === "red" ? "active" : ""}`}
                  style={{ backgroundColor: "red", height: "35px" }}
                ></button>
              </div>

            




            <div className="bike-options">
              {/* Bike image */}

            <div className="bike-image-container">
              {bikeDetails && (
                <img
                  src={bikeDetails[selectedAngle]}
                  alt="Bike"
                />
              )}
            </div>

              {/* Purchase section */}
              
                
              <div className="angle-options" onMouseOut={handleMouseOut}>
                <div
                  key="image1"
                  onMouseEnter={() => handleAngleChange('image1')}
                  className={`angle-box ${selectedAngle === 'image1' ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${bikeDetails.image1})` }}
                ></div>
                <div
                  key="image2"
                  onMouseEnter={() => handleAngleChange('image2')}
                  className={`angle-box ${selectedAngle === 'image2' ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${bikeDetails.image2})` }}
                ></div>
                <div
                  key="image3"
                  onMouseEnter={() => handleAngleChange('image3')}
                  className={`angle-box ${selectedAngle === 'image3' ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${bikeDetails.image3})` }}
                ></div>
              </div>
            </div>

            <div className="bike-details-table">
            <div>
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
            <div className="purchase-section">
                <h4>
                  {bikeDetails.brand} {bikeDetails.model}
                </h4>
                <h4>Price: ₹ {bikeDetails.price}</h4>
                <button onClick={handlePurchaseClick} style={{ marginBottom: '40px' }}>
                  Purchase Bike
              </button>
            </div>
          </div>
          </div>
        )}
      </div>
      <div>
        <BikeCarousel />
      </div>
    </div>
  );
};


export default BikeDetails;