import React from "react";
import { createContext, useState, useEffect } from "react";
import propTypes from "prop-types"

// Create a context
export const UserContext = createContext();

// User Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to log in user
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // Update context state
  };

  // Function to log out user
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null); // Clear context state
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children:propTypes.node.isRequired,
}

export default UserProvider;