import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessMessage = ({ email, onResendEmail }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Account Created Successfully!</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          We've sent a verification email to <span className="font-medium text-foreground">{email}</span>. 
          Please check your inbox and click the verification link to activate your account.
        </p>
      </div>

      {/* Next Steps */}
      <div className="bg-muted/50 border border-border rounded-lg p-6 max-w-md mx-auto">
        <h3 className="font-semibold text-foreground mb-3 flex items-center justify-center">
          <Icon name="List" size={16} className="mr-2" />
          Next Steps
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground text-left">
          <div className="flex items-start space-x-2">
            <span className="font-medium text-primary">1.</span>
            <span>Check your email inbox (and spam folder)</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-medium text-primary">2.</span>
            <span>Click the verification link in the email</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-medium text-primary">3.</span>
            <span>Sign in to access your EventPulse dashboard</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          onClick={handleLoginRedirect}
          iconName="LogIn"
          iconPosition="left"
          fullWidth
        >
          Go to Sign In
        </Button>
        
        <Button
          variant="outline"
          onClick={onResendEmail}
          iconName="Mail"
          iconPosition="left"
          fullWidth
        >
          Resend Verification Email
        </Button>
      </div>

      {/* Help Text */}
      <div className="text-xs text-muted-foreground">
        <p>Didn't receive the email? Check your spam folder or contact our support team.</p>
      </div>
    </div>
  );
};

export default SuccessMessage;