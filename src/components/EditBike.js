import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './EditBike.css';

function EditBike() {
  const { isAuthenticated, roles } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [bike, setBike] = useState({
    brand: '',
    model: '',
    price: '', // You mentioned that price is of type String in your schema
    mileage: 0, // Assuming mileage is a number
    weight: 0, // Assuming weight is a number
    EngineCapacity: '', // You mentioned that EngineCapacity is of type String
    FuelTankCapacity: '', // You mentioned that FuelTankCapacity is of type String
    SeatHeight: 0, // Assuming seatHeight is a number
  });

  useEffect(() => {
    if (isAuthenticated && roles.includes('Admin')) {
      axios
        .get(`http://localhost:4000/api/bikes/${id}`)
        .then((response) => {
          setBike(response.data);
        })
        .catch((error) => {
          console.error('Error fetching bike details:', error);
          // Handle errors, e.g., show an error message or redirect
        });
    } else {
      // Handle unauthorized access, e.g., show a message or redirect
      navigate('/');
    }
  }, [id, isAuthenticated, navigate, roles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBike({ ...bike, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:4000/api/bikes/${id}`, bike)
      .then((response) => {
        console.log('Bike details updated:', response.data);
        navigate(`/bikes/${id}`);
        alert("Bike details have been successfully updated !");
      })
      .catch((error) => {
        console.error('Error updating bike details:', error);
        // Handle errors, e.g., show an error message
      });
  };

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div className="edit-bike-container">
      <h2>Edit Bike Details</h2>
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
            type="text" // Change the input type if necessary
            id="price"
            name="price"
            value={bike.price}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="mileage">Mileage</label>
          <input
            type="number" // Assuming mileage is a number
            id="mileage"
            name="mileage"
            value={bike.mileage}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="weight">Weight</label>
          <input
            type="number" // Assuming weight is a number
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
            type="number" // Assuming seatHeight is a number
            id="SeatHeight"
            name="SeatHeight"
            value={bike.SeatHeight}
            onChange={handleInputChange}
          />
        </div>
        
        <button type="submit">Save Changes</button>
        <button className='btn btn-danger' onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default EditBike;
