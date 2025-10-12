import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = () => {
  return (
    <div className="text-center space-y-4">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Icon name="Zap" size={24} color="white" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-foreground">EventPulse</h1>
            <p className="text-sm text-muted-foreground">Analytics Platform</p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          Welcome Back
        </h2>
        <p className="text-muted-foreground">
          Sign in to access your social media analytics dashboard
        </p>
      </div>
    </div>
  );
};

export default AuthHeader;