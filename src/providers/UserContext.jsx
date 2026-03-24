import React, { createContext, useState, useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import authService from '../services/authService';

const UserContext = createContext();

const initialUser = { isLoggedIn: false, role: null };

export const UserProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const updateUser = (userData) => {
    setUser(userData);
    if (userData.isLoggedIn) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  const logout = () => {
    authService.logout();
    queryClient.clear();
    updateUser(initialUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);