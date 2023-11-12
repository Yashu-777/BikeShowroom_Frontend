import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function NavBar() {
 /*  const navbarTop = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
  }; */

  const navbarContainer = {
    marginBottom: '60px',
  };

  const {isAuthenticated, tempuser, roles, toggleAuth, toggleTempuser} = useAuth();
  
  const handleLogout = () => {
    localStorage.clear();
    toggleAuth(); // Update the state to reflect the logout
    toggleTempuser('');
    navigate('/');
  }

  const isAdmin = roles.includes('Admin');
  const navigate = useNavigate();

  return (
    <div style={navbarContainer}>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark" >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div>
              <Link to="/" className="navbar-brand">
                Bike Showroom
              </Link>
              <Link to="/" className="btn btn-outline-light my-2 my-sm-0 mx-2">
                Home
              </Link>
            </div>
            <div>
              {isAuthenticated ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {isAdmin ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div>
                        <p className="text-light my-2 my-sm-0">Hello {tempuser}</p>
                      </div>
                      <div>
                        <Link to="/add-bike" type="button" className="btn btn-danger mx-2">
                          Add Bike
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <p className="text-light mx-2 my-2 my-sm-0">Hello {tempuser}</p>
                  )}
                  <button className="btn btn-outline-light my-2 my-sm-0" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/signup" className="btn btn-outline-light my-2 my-sm-0">
                  Signup / Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
