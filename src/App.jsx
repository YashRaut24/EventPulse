import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.jsx';
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import Networks from './components/Networks';
import Home from './components/Home';
import Me from './components/Me';
import ModernNav from './components/ModernNav';
import ParticleSystem from './components/ParticleSystem';
import Loading3D from './components/Loading3D';
import Signin from './AlwaysUse/Signin';
import About from "./components/About";
import Contact from "./components/Contact";
import AccountSettings from './pages/account-settings/index.jsx';
import SocialMediaMonitoring from './pages/social-media-monitoring/index.jsx';
import Login from './pages/login/index.jsx';
import EventDashboard from './pages/event-dashboard/index.jsx';
import Register from './pages/register/index.jsx';
import AnalyticsReports from './pages/analytics-reports/index.jsx';
import NotFound from './pages/NotFound';
import Header from "./components/ui/Header.jsx";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (authLoading) {
    return <Loading3D isVisible={true} />;
  }

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


      {/* Other routes */}
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
        <Signin 
          onClose={() => setShowAuthModal(false)}
        />
      </motion.div>
    )}
  </div>
</BrowserRouter>

    </>
  );
}

export default App;
