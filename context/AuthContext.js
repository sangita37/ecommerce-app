import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setAccessToken(token);
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (username, password) => {
    if (username && password) {
      await AsyncStorage.setItem('token', 'dummy-token');
      setAccessToken('dummy-token');
    }
  };

  const signup = async (email, password) => {
    if (email && password) {
      await AsyncStorage.setItem('token', 'dummy-token');
      setAccessToken('dummy-token');
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
