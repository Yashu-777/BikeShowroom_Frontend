import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Use Routes here

import BikeList from './components/BikeList';
import BikeDetails from './components/BikeDetails';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <>
        <NavBar />
        <Routes> {/* Use Routes instead of Route */}
          <Route path="/" element={<BikeList />} />
          <Route path="/bikes/:id" element={<BikeDetails />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
        </Routes> {/* Close Routes */}
        <Footer />
      </>
    </Router>
  );
}

export default App;
