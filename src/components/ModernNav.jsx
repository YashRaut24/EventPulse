import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

const ModernNav = ({ setShowAuthModal, isLoggedIn }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = isLoggedIn
    ? [
        { name: 'Dashboard', path: '/account-settings' },
        { name: 'Analytics', path: '/analytics-reports' },
        { name: 'Social Media', path: '/social-media-monitoring' }
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/components/About' },
        { name: 'Contact', path: '/components/Contact' }
      ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-lg border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2, boxShadow: "0 0 20px rgba(6, 182, 212, 0.6)" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center relative overflow-hidden"
            >
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05, textShadow: "0 0 10px rgba(6, 182, 212, 0.5)" }}
              transition={{ duration: 0.3 }}
            >
              EventPulse
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -5, rotateX: 10, scale: 1.1 }}
              >
                <Link
                  to={item.path}
                  className="text-white hover:text-cyan-400 transition-all duration-300 relative group px-4 py-2 rounded-lg"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            {!isLoggedIn && (
              <>
                <motion.button
                  onClick={() => setShowAuthModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                >
                  Sign In
                </motion.button>
                <motion.button
                  onClick={() => setShowAuthModal(true)}
                  className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  Sign Up
                </motion.button>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-lg border-t border-white/10"
          >
            <div className="container mx-auto px-6 py-6 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-cyan-400 transition-colors duration-300 text-lg block"
                >
                  {item.name}
                </Link>
              ))}
              {!isLoggedIn && (
                <div className="flex flex-col space-y-3 mt-4">
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="w-full px-6 py-3 bg-white text-black rounded-full font-semibold"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default ModernNav;
