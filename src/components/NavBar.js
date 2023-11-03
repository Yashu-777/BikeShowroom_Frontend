import React from 'react';
import { Link } from 'react-router-dom';

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

  const { isAuthenticated,tempuser } = useAuth();
  
  return (
    <div style={navbarContainer}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={navbarTop}>
        <div className="container">
          <Link to="/" className="navbar-brand">
            Bike Showroom
          </Link>
          {isAuthenticated ? (
            <p className="text-light my-2 my-sm-0">Hello {tempuser}</p>



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
