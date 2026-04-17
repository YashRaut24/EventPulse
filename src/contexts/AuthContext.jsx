import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // On mount: validate stored token via /auth/me
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('eventpulse_token');
      if (!token) { setLoading(false); return; }
      try {
        const result = await apiService.getMe();
        setUser(result.user);
        setIsAuthenticated(true);
      } catch {
        // Token invalid/expired — clear it
        localStorage.removeItem('eventpulse_token');
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const _setAuth = (token, userData) => {
    localStorage.setItem('eventpulse_token', token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const signUp = async (userData) => {
    const result = await apiService.signUp({
      name: userData.fullName || userData.name,
      email: userData.email,
      password: userData.password,
      company: userData.company,
    });
    _setAuth(result.token, result.user);
    return result;
  };

  const signIn = async (credentials) => {
    const result = await apiService.signIn(credentials);
    _setAuth(result.token, result.user);
    return result;
  };

  // Called from /auth/callback route after Google OAuth redirect
  const signInWithToken = async (token) => {
    localStorage.setItem('eventpulse_token', token);
    try {
      const result = await apiService.getMe();
      setUser(result.user);
      setIsAuthenticated(true);
      return { success: true, user: result.user };
    } catch {
      localStorage.removeItem('eventpulse_token');
      return { success: false, error: 'Invalid token' };
    }
  };

  const signOut = () => {
    localStorage.removeItem('eventpulse_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = async (updatedData) => {
    const result = await apiService.updateUser(user.id || user._id, updatedData);
    const updated = { ...user, ...result.user };
    setUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, signUp, signIn, signInWithToken, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
