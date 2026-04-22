import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.jsx';
import ModernNav from './components/ModernNav';
import ParticleSystem from './components/ParticleSystem';
import Loading3D from './components/Loading3D';
import Signin from './AlwaysUse/Signin';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/ui/Header.jsx';
import AccountSettings from './pages/account-settings/index.jsx';
import SocialMediaMonitoring from './pages/social-media-monitoring/index.jsx';
import Login from './pages/login/index.jsx';
import Register from './pages/register/index.jsx';
import EventDashboard from './pages/event-dashboard/index.jsx';
import AnalyticsReports from './pages/analytics-reports/index.jsx';

import GoogleAuthCallback from './pages/auth/GoogleAuthCallback.jsx';

import LinkedInConnect from './pages/linkedin-connect/index.jsx';
import CompanyAnalysis from './pages/company-analysis/index.jsx';

import NotFound from './pages/NotFound';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (authLoading) return <Loading3D isVisible={true} />;

  return (
    <>
      <Loading3D isVisible={isLoading} onComplete={() => setIsLoading(false)} />

      <BrowserRouter>
        <div className="min-h-screen bg-black relative">
          <ParticleSystem />
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/event-dashboard" /> : (
                  <>
                    <ModernNav setShowAuthModal={setShowAuthModal} isLoggedIn={isAuthenticated} />
                    <Home />
                  </>
                )
              }
            />
            <Route
              path="/components/About"
              element={
                <>
                  <ModernNav setShowAuthModal={setShowAuthModal} isLoggedIn={isAuthenticated} />
                  <About />
                </>
              }
            />
            <Route
              path="/components/Contact"
              element={
                <>
                  <ModernNav setShowAuthModal={setShowAuthModal} isLoggedIn={isAuthenticated} />
                  <Contact />
                </>
              }
            />

      {/* Protected routes */}
      <Route 
        path="/account-settings" 
        element={
          isAuthenticated ? (
            <>
              <Header />
              <AccountSettings />
            </>
          ) : <Navigate to="/" />
        } 
      />
      <Route 
        path="/social-media-monitoring" 
        element={
          isAuthenticated ? (
            <>
              <Header />
              <SocialMediaMonitoring />
            </>
          ) : <Navigate to="/" />
        } 
      />
      <Route 
        path="/analytics-reports" 
        element={
          isAuthenticated ? (
            <>
              <Header />
              <AnalyticsReports />
            </>
          ) : <Navigate to="/" />
        } 
      />
      <Route
        path="/event-dashboard"
        element={
          isAuthenticated ? (
            <>
              <Header />
              <EventDashboard />
            </>
          ) : <Navigate to="/" />
        }
      />
      <Route
        path="/linkedin-connect"
        element={
          isAuthenticated ? (
            <>
              <Header />
              <LinkedInConnect />
            </>
          ) : <Navigate to="/" />
        }
      />
      <Route
        path="/companyAnalysis"
        element={
          isAuthenticated ? (
            <>
              <Header />
              <CompanyAnalysis />
            </>
          ) : <Navigate to="/" />
        }
      />
      <Route
        path="/engagementAnalysis"
        element={
          isAuthenticated ? (
            <>
              <Header />
              <div className="min-h-screen bg-background">
                <main className="max-w-7xl mx-auto p-6 pt-16">
                  <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-8 shadow-md">
                    <h1 className="text-2xl font-bold text-foreground mb-4">Engagement Analysis</h1>
                    <p className="text-muted-foreground">Engagement analysis feature coming soon.</p>
                  </div>
                </main>
              </div>
            </>
          ) : <Navigate to="/" />
        }
      />


            {/* Auth pages */}
            <Route path="/login" element={isAuthenticated ? <Navigate to="/event-dashboard" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/event-dashboard" /> : <Register />} />
            <Route path="/auth/callback" element={<GoogleAuthCallback />} />

            {/* Protected routes */}
            <Route
              path="/account-settings"
              element={isAuthenticated ? <><Header /><AccountSettings /></> : <Navigate to="/login" />}
            />
            <Route
              path="/social-media-monitoring"
              element={isAuthenticated ? <><Header /><SocialMediaMonitoring /></> : <Navigate to="/login" />}
            />
            <Route
              path="/analytics-reports"
              element={isAuthenticated ? <><Header /><AnalyticsReports /></> : <Navigate to="/login" />}
            />
            <Route
              path="/event-dashboard"
              element={isAuthenticated ? <><Header /><EventDashboard /></> : <Navigate to="/login" />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Sign In Modal */}
          {showAuthModal && !isAuthenticated && (
            <motion.div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
              <motion.button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-10 right-10 bg-red-500 p-3 text-white rounded-full hover:bg-red-600"
              >
                ✕
              </motion.button>
              <Signin onClose={() => setShowAuthModal(false)} />
            </motion.div>
          )}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
