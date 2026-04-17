import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import SuccessMessage from './components/SuccessMessage';
import LoadingOverlay from '../../components/ui/LoadingOverlay';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleRegistration = async (formData) => {
    setIsLoading(true);
    setError('');
    try {
      await signUp(formData);
      setUserEmail(formData.email);
      setRegistrationComplete(true);
      setTimeout(() => navigate('/event-dashboard'), 2000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register - EventPulse | Social Media Analytics Platform</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <LoadingOverlay isLoading={isLoading} message="Creating your account...">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="max-w-2xl mx-auto">
                    {!registrationComplete ? (
                      <div className="space-y-8">
                        <RegistrationHeader />
                        <div className="bg-card border border-border rounded-xl p-8 shadow-soft">
                          {error && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-500">
                              {error}
                            </div>
                          )}
                          <RegistrationForm onSubmit={handleRegistration} isLoading={isLoading} />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-card border border-border rounded-xl p-8 shadow-soft">
                        <SuccessMessage email={userEmail} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="sticky top-8">
                    <TrustSignals />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LoadingOverlay>
      </div>
    </>
  );
};

export default Register;
