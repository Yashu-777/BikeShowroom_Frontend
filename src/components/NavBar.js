import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const navbarTop = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
  };

  const navbarContainer = {
    marginBottom: '60px'
  }

  return (
    <div style={navbarContainer}>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={navbarTop}>
      <div className="container">
        {/* Use the Link component instead of <a> tags */}
        <Link to="/" className="navbar-brand">
          Bike Showroom
        </Link>
        <button className="btn btn-outline-light my-2 my-sm-0">Login</button>
      </div>
    </nav>
    </div>
  );
}

export default NavBar;
