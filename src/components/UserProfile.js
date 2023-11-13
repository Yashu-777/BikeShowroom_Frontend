import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './UserProfile.css'



function UserProfile() {
  const { tempuser, isAuthenticated, toggleAuth, toggleTempuser } = useAuth();
  const [newUsername, setNewUsername] = useState('');

  const navigate=useNavigate();

  const updateUsername = async () => {
    try {
      const response = await axios.patch('http://localhost:4000/users/update', {
        username: tempuser, // send the current username
        newUsername: newUsername, // send the new username
      });

      if (response.status === 200) {
        alert('success');
        toggleTempuser(newUsername);
        toggleAuth();
        navigate('/login');
        // Optionally update localStorage or any other logic
      } 
    } catch (error) {
      alert("Username is not available");
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await axios.delete('http://localhost:4000/users/delete', {
        data: { username: tempuser }, // send the current username
      });
  
      if (response.status === 200) {
        localStorage.clear(); // Clear localStorage
        toggleAuth(); // Log out the user
        toggleTempuser('');
        navigate('/signup');
        // Optionally perform any other cleanup or redirection
      } else if (response.status === 400) {
        // Check the response data for the error message
        if (response.data && response.data.error) {
          alert(response.data.error);
        } else {
          console.warn('Unexpected 400 response:', response);
        }
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };
  

  const handleUpdateUsername = () => {
    if (newUsername.trim() !== '') {
      updateUsername();
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      deleteAccount();
    }
  };

  return (
      <div className="user-profile-container">
        
        {isAuthenticated ? (
            <div>
              <div className="profile-heading">User Profile</div>
              <div className="current-username">Current Username: {tempuser}</div>
              
                <div className="update-username-container">
                  <label htmlFor="new-username" className="new-username-label">
                    New Username:
                  </label>
                  <input
                    type="text"
                    id="new-username"
                    className="new-username-input"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                  <button className="update-username-button" onClick={handleUpdateUsername}>
                    Update Username
                  </button>
                  <button className="delete-account-button" onClick={handleDeleteAccount}>
                    Delete Account
                  </button>
                </div>
            </div>
          ) : (
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
              <p>User is not logged in</p>
              <Link to='/login' className="btn btn-primary">Log in</Link>
            </div>
            )
        } 
      </div>
  );
}

export default UserProfile;
