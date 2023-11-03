import React, { createContext, useState, useContext } from 'react';

// Create a context to hold the authentication state and related functions
const AuthContext = createContext();

// Create an AuthProvider component to wrap your app and provide the context value
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tempuser,setTempuser] = useState('');
  // Function to toggle authentication status
  const toggleAuth = () => {
    setIsAuthenticated((prevAuth) => !prevAuth);
  };

  const toggleTempuser = (tempname) => {
    setTempuser(tempname);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, toggleAuth, tempuser, toggleTempuser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext value in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
