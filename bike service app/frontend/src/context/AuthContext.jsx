import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('motocare_user');
    const token = localStorage.getItem('motocare_token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    const { token, user: userData } = response.data;
    
    localStorage.setItem('motocare_token', token);
    localStorage.setItem('motocare_user', JSON.stringify(userData));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password, role = 'user') => {
    const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
    const { token, user: userData } = response.data;
    
    localStorage.setItem('motocare_token', token);
    localStorage.setItem('motocare_user', JSON.stringify(userData));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
    return userData;
  };

  const updateProfile = async (data) => {
    const response = await axios.patch('http://localhost:5000/api/auth/profile', data);
    const userData = response.data;
    localStorage.setItem('motocare_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('motocare_token');
    localStorage.removeItem('motocare_user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
