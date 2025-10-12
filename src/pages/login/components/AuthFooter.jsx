import React from 'react';

const AuthFooter = () => {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="space-y-4">
      {/* Registration Link */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            onClick={() => handleNavigation('/register')}
            className="text-primary hover:text-primary/80 font-medium transition-standard"
          >
            Create Account
          </button>
        </p>
      </div>
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Need Help?
          </span>
        </div>
      </div>
      {/* Support Links */}
      <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
        <button
          onClick={() => window.open('/support', '_blank')}
          className="hover:text-foreground transition-standard"
        >
          Support
        </button>
        <button
          onClick={() => window.open('/privacy', '_blank')}
          className="hover:text-foreground transition-standard"
        >
          Privacy Policy
        </button>
        <button
          onClick={() => window.open('/terms', '_blank')}
          className="hover:text-foreground transition-standard"
        >
          Terms of Service
        </button>
      </div>
      {/* Copyright */}
      <div className="text-center text-xs text-muted-foreground">
        © {new Date()?.getFullYear()} EventPulse. All rights reserved.
      </div>
    </div>
  );
};

export default AuthFooter;