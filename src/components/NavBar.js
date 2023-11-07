import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const navbarTop = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
  };

  const navbarContainer = {
    marginBottom: '60px',
  };

  const {isAuthenticated,tempuser,toggleAuth,toggleTempuser} = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    toggleAuth(); // Update the state to reflect the logout
    toggleTempuser('');
    navigate('/');
  }

  return (
    <div style={navbarContainer}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={navbarTop}>
        <div className="container">
          <Link to="/" className="navbar-brand">
            Bike Showroom
          </Link>
          {isAuthenticated ? (
            <div>
              <p className="text-light my-2 my-sm-0">Hello {tempuser}</p>
              <button className="btn btn-link text-light" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/signup" className="btn btn-outline-light my-2 my-sm-0">
              Signup / Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
