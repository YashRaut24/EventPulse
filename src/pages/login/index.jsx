import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import AuthHeader from './components/AuthHeader';
import AuthFooter from './components/AuthFooter';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();

  // Mock credentials for demonstration
  const mockCredentials = {
    email: 'admin@eventpulse.com',
    password: 'admin123'
  };

  useEffect(() => {
    // Clear any existing error when component mounts
    setError('');
  }, []);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validate credentials
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Store authentication state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData?.email);
        localStorage.setItem('rememberMe', formData?.rememberMe);

        // Redirect to dashboard or intended page
        const redirectTo = location?.state?.from || '/event-dashboard';
        window.location.href = redirectTo;
      } else {
        setError('Invalid email or password. Please use admin@eventpulse.com / admin123');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Login Card */}
        <div className="bg-card border border-border rounded-xl shadow-modal p-8 space-y-8">
          {/* Header */}
          <AuthHeader />

          {/* Login Form */}
          <LoginForm 
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error}
          />

          {/* Trust Signals */}
          <TrustSignals />

          {/* Footer */}
          <AuthFooter />
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-2">
              Demo Credentials for Testing:
            </p>
            <div className="space-y-1 text-xs font-mono">
              <div>Email: admin@eventpulse.com</div>
              <div>Password: admin123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;