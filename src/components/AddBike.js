import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditBike.css';
import {useAuth} from '../context/AuthContext';

function AddBike() {
  const navigate = useNavigate();
  const {isAuthenticated,roles} = useAuth();
  // Define the initial state for the new bike
  const initialBikeState = {
    brand: '',
    model: '',
    price: '',
    mileage: 0,
    weight: 0,
    EngineCapacity: '',
    FuelTankCapacity: '',
    SeatHeight: 0,
    imageblack: '',
    imageblue: '',
    imagered: '',
  };

  const [bike, setBike] = useState(initialBikeState);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBike({ ...bike, [name]: value });
  };

  // Function to handle the form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to add the new bike
    axios
      .post('http://localhost:4000/api/bikes', bike) // Adjust the API endpoint
      .then((response) => {
        console.log('Bike added:', response.data);
        alert("Added !!");
        // Redirect to the bike details page after a successful add
        navigate(`/bikes/${response.data._id}`);
      })
      .catch((error) => {
        console.error('Error adding bike:', error);
        // Handle errors, e.g., show an error message
      });
  };

  return (
    <div>
    {isAuthenticated && roles.includes("Admin") ? (
    <div className="edit-bike-container">
      <h2>Add New Bike</h2>
      <form className="edit-bike-form" onSubmit={handleFormSubmit}>
        <div className="form-row">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={bike.brand}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            name="model"
            value={bike.model}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={bike.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="mileage">Mileage</label>
          <input
            type="number"
            id="mileage"
            name="mileage"
            value={bike.mileage}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={bike.weight}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="EngineCapacity">Engine Capacity</label>
          <input
            type="text"
            id="EngineCapacity"
            name="EngineCapacity"
            value={bike.EngineCapacity}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="FuelTankCapacity">Fuel Tank Capacity</label>
          <input
            type="text"
            id="FuelTankCapacity"
            name="FuelTankCapacity"
            value={bike.FuelTankCapacity}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="SeatHeight">Seat Height</label>
          <input
            type="number"
            id="SeatHeight"
            name="SeatHeight"
            value={bike.SeatHeight}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="imageblack">Image (Black)</label>
          <input
            type="text"
            id="imageblack"
            name="imageblack"
            value={bike.imageblack}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="imageblue">Image (Blue)</label>
          <input
            type="text"
            id="imageblue"
            name="imageblue"
            value={bike.imageblue}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="imagered">Image (Red)</label>
          <input
            type="text"
            id="imagered"
            name="imagered"
            value={bike.imagered}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Bike</button>
      </form>
    </div>
    ) : (
        <p>No Admin access</p>
    )}
    </div>
  );
}

export default AddBike;
