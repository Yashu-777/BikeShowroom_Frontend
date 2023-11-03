import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from '../context/AuthContext';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {toggleAuth,toggleTempuser} = useAuth();

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:4000/users/register', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        console.log('Registration successful!');
        toggleTempuser(username);
        toggleAuth();
        // You can navigate to another page here
        navigate('/payment');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle registration errors and provide user feedback
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card my-4">
            <div className="card-body">
              <h2 className="card-title text-center">Sign Up</h2>
              <form>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: '50%' }} // Add custom style to control width
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    style={{ width: '50%'}} // Add custom style to control width
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    style={{ width: '50%' }} // Add custom style to control width
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSignup}
                    
                  >
                    Sign Up
                  </button>
                </div>
                <div className="mt-3 text-center">
                  <span>Already have an account? </span>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={handleLoginClick}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
