import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { getSwishStats } from '../services/api.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useSwishStats = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSwishStats must be used within an AuthProvider');
  }
  return {
    swishStats: context.swishStats,
    isFetching: context.isFetchingSwishStats,
    error: context.swishStatsError,
    refetch: context.refetchSwishStats
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  // Swish Stats states
  const [swishStats, setSwishStats] = useState(null);
  const [isFetchingSwishStats, setIsFetchingSwishStats] = useState(false);
  const [swishStatsError, setSwishStatsError] = useState(null);
  const hasFetchedSwishStats = useRef(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('eventpulse_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Auto-fetch Swish stats after login/register
  useEffect(() => {
    if (user && !swishStats && !isFetchingSwishStats && !hasFetchedSwishStats.current) {
      const fetchSwishStats = async () => {
        setIsFetchingSwishStats(true);
        setSwishStatsError(null);
        try {
          const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email;
          const stats = await getSwishStats({ email: user.email, name });
          setSwishStats(stats);
          hasFetchedSwishStats.current = true;
        } catch (error) {
          console.error('Failed to fetch Swish stats:', error);
          setSwishStatsError(error.message);
        } finally {
          setIsFetchingSwishStats(false);
        }
      };

      fetchSwishStats();
    }
  }, [user, swishStats, isFetchingSwishStats]);

  const signUp = async (userData) => {
    try {
      // Try API first, fallback to localStorage
      try {
        const apiService = (await import('../services/api.js')).default;
        const result = await apiService.signUp(userData);
        
        localStorage.setItem('eventpulse_user', JSON.stringify(result.user));
        setUser(result.user);
        setIsAuthenticated(true);
        
        return result;
      } catch (apiError) {
        // Fallback to localStorage
        const newUser = {
          id: Date.now().toString(),
          firstName: userData.name.split(' ')[0] || userData.name,
          lastName: userData.name.split(' ')[1] || '',
          email: userData.email,
          password: userData.password,
          company: '',
          jobTitle: '',
          phone: '',
          website: '',
          bio: '',
          profileImage: 'https://via.placeholder.com/150x150?text=User',
          createdAt: new Date().toISOString(),
          plan: 'Free'
        };

        localStorage.setItem('eventpulse_user', JSON.stringify(newUser));
        setUser(newUser);
        setIsAuthenticated(true);
        
        return { success: true, user: newUser };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signIn = async (credentials) => {
    try {
      // Try API first, fallback to localStorage
      try {
        const apiService = (await import('../services/api.js')).default;
        const result = await apiService.signIn(credentials);
        
        // Store JWT token for API requests
        if (result.token) {
          localStorage.setItem('token', result.token);
        }
        
        localStorage.setItem('eventpulse_user', JSON.stringify(result.user));
        setUser(result.user);
        setIsAuthenticated(true);
        
        return result;
      } catch (apiError) {
        // Fallback to localStorage
        const savedUser = localStorage.getItem('eventpulse_user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          if (userData.email === credentials.email && userData.password === credentials.password) {
            setUser(userData);
            setIsAuthenticated(true);
            return { success: true, user: userData };
          }
        }
        
        const demoUser = {
          id: Date.now().toString(),
          firstName: `${user.name}`,
          lastName: 'Sir',
          email: credentials.email,
          password: credentials.password,
          company: 'EventPulse Inc.',
          jobTitle: 'Event Manager',
          phone: '+1 (555) 123-4567',
          website: 'https://eventpulse.com',
          bio: 'Experienced event manager passionate about creating memorable experiences.',
          profileImage: 'https://via.placeholder.com/150x150?text=Demo+User',
          createdAt: new Date().toISOString(),
          plan: 'Pro'
        };

        localStorage.setItem('eventpulse_user', JSON.stringify(demoUser));
        setUser(demoUser);
        setIsAuthenticated(true);
        
        return { success: true, user: demoUser };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signOut = () => {
    localStorage.removeItem('eventpulse_user');
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = async (updatedData) => {
    try {
      // Try API first, fallback to localStorage
      try {
        const apiService = (await import('../services/api.js')).default;
        await apiService.updateUser(user.id, updatedData);
      } catch (apiError) {
        console.log('API update failed, using localStorage');
      }
      
      // Always update localStorage
      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem('eventpulse_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  const refetchSwishStats = useCallback(async () => {
    if (!user) return;
    hasFetchedSwishStats.current = false;
    setSwishStats(null);
    setSwishStatsError(null);
    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email;
    const stats = await getSwishStats({ email: user.email, name });
    setSwishStats(stats);
    hasFetchedSwishStats.current = true;
    return stats;
  }, [user]);

  const value = {
    user,
    isAuthenticated,
    loading,
    signUp,
    signIn,
    signOut,
    updateUser,
    // Swish Stats
    swishStats,
    isFetchingSwishStats,
    swishStatsError,
    refetchSwishStats
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};