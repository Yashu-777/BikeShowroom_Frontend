// components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3">
      <p>&copy; {new Date().getFullYear()} Bike Showroom</p>
    </footer>
  );
}

export default Footer;
