import UserContext from "./UserContext";
import React, { useEffect } from 'react';
import { authAPI } from '../services/apiService';

const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data if token exists
      authAPI.getMe()
        .then(userData => {
          setUser(userData);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch user:', err);
          localStorage.removeItem('token');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authAPI.login({ email, password });
      localStorage.setItem('token', data.token);
      setUser(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (name, email, password) => {
    try {
      const data = await authAPI.register({ name, email, password });
      localStorage.setItem('token', data.token);
      setUser(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const isAdmin = user?.isAdmin || false;

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, register, loading, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;