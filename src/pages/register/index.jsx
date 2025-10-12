import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import SuccessMessage from './components/SuccessMessage';
import LoadingOverlay from '../../components/ui/LoadingOverlay';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleRegistration = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      setUserEmail(formData?.email);
      setRegistrationComplete(true);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    
    try {
      // Simulate resend email API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message or notification
      console.log('Verification email resent');
    } catch (error) {
      console.error('Failed to resend email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register - EventPulse | Social Media Analytics Platform</title>
        <meta name="description" content="Create your EventPulse account and start analyzing your event's social media performance with advanced analytics and insights." />
        <meta name="keywords" content="event analytics, social media monitoring, event marketing, registration" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <LoadingOverlay isLoading={isLoading} message="Creating your account...">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Registration Content */}
                <div className="lg:col-span-2">
                  <div className="max-w-2xl mx-auto">
                    {!registrationComplete ? (
                      <div className="space-y-8">
                        <RegistrationHeader />
                        
                        <div className="bg-card border border-border rounded-xl p-8 shadow-soft">
                          <RegistrationForm 
                            onSubmit={handleRegistration}
                            isLoading={isLoading}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-card border border-border rounded-xl p-8 shadow-soft">
                        <SuccessMessage 
                          email={userEmail}
                          onResendEmail={handleResendEmail}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Trust Signals Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8">
                    <TrustSignals />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LoadingOverlay>

        {/* Footer */}
        <footer className="border-t border-border bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} EventPulse. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-standard">
                  Terms of Service
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-standard">
                  Privacy Policy
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-standard">
                  Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Register;