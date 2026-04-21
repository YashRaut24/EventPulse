import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import AuthHeader from './components/AuthHeader';
import AuthFooter from './components/AuthFooter';

const Login = () => {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Clear any existing error when component mounts
    setError('');
  }, []);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn({ email: formData.email, password: formData.password });
      
      if (result.success || result.user) {
        // Handle rememberMe
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        // Redirect to dashboard or intended page
        const redirectTo = location?.state?.from?.pathname || '/event-dashboard';
        window.location.href = redirectTo;
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Network error. Please check your connection and try again.');
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

        {/* Demo Credentials Note */}
        <div className="mt-6 text-center">
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-2">
              Works with any email/password (uses fallback/demo user)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;