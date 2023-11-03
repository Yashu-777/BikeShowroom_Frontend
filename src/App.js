import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import BikeList from './components/BikeList';
import BikeDetailsPage from './components/BikeDetailsPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import Payment from './components/Payment';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

function App() {
  return (
    <Router>
      <>
        <AuthProvider> {/* Wrap your routes with AuthProvider */}
          <NavBar />
          <Routes>
            <Route path="/" element={<BikeList />} />
            <Route path="/bikes/:id" element={<BikeDetailsPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </>
    </Router>
  );
}

export default App;
