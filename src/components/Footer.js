import React from 'react';

function Footer() {
  const footerStyle = {
    /* position: 'fixed',
    bottom: 0, */
    width: '100%',
    backgroundColor: '#343a40',
    color: 'white',
    textAlign: 'center',
    padding: '10px',
  };

  const footerContainer = {
    marginTop:'50px'
  }

  return (
    <div style = {footerContainer}>
    <footer className='fixed-bottom' style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} RadiantRides</p>
    </footer>
    </div>
  );
}

export default Footer;