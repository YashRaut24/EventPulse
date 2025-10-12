import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationHeader = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="text-center space-y-6">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Icon name="Zap" size={24} color="white" />
          </div>
          <span className="text-2xl font-bold text-foreground">EventPulse</span>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Create Your Account</h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Join thousands of event organizers who trust EventPulse for their social media analytics
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="TrendingUp" size={16} className="text-success" />
          <span>Real-time Analytics</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Users" size={16} className="text-success" />
          <span>Audience Insights</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Target" size={16} className="text-success" />
          <span>Campaign Optimization</span>
        </div>
      </div>

      {/* Login Link */}
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span className="text-muted-foreground">Already have an account?</span>
        <Button
          variant="link"
          onClick={handleLoginRedirect}
          className="p-0 h-auto font-medium"
        >
          Sign in here
        </Button>
      </div>
    </div>
  );
};

export default RegistrationHeader;