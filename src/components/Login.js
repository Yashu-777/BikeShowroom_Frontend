import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { toggleAuth, toggleTempuser, isAuthenticated } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/users/login', {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);

        toggleAuth();
        toggleTempuser(username);
        navigate('/payment');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toggleAuth(); // Update the state to reflect the logout
    toggleTempuser('');
    navigate('/');
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card my-4">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              {isAuthenticated ? (
                <div>
                  <p>You are already logged in. Click the button below to log out.</p>
                  <button
                    className="btn btn-primary"
                    onClick={handleLogout()}
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLogin}>
                  <div className="form-group mb-3">
                    <label>Username:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Log In
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
