import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

const ModernNav = ({ setShowAuthModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Connect', path: '/components/Networks' },
    { name: 'Profile', path: '/components/Me' }
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
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ 
                rotate: 360,
                scale: 1.2,
                boxShadow: "0 0 20px rgba(6, 182, 212, 0.6)"
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
              
              {/* Glowing effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg opacity-0"
                whileHover={{ opacity: 0.3 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 10px rgba(6, 182, 212, 0.5)"
              }}
              transition={{ duration: 0.3 }}
            >
              EventPulse
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  y: -5,
                  rotateX: 10,
                  scale: 1.1
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Link
                  to={item.path}
                  className="text-white hover:text-cyan-400 transition-all duration-300 relative group px-4 py-2 rounded-lg"
                >
                  <motion.span
                    whileHover={{ 
                      textShadow: "0 0 10px rgba(6, 182, 212, 0.8)"
                    }}
                  >
                    {item.name}
                  </motion.span>
                  
                  {/* 3D underline effect */}
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ 
                      width: "100%",
                      boxShadow: "0 2px 10px rgba(6, 182, 212, 0.6)"
                    }}
                  />
                  
                  {/* Floating particles on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                        animate={{
                          y: [0, -15, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                        style={{
                          left: `${20 + i * 30}%`,
                          top: "50%"
                        }}
                      />
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={() => setShowAuthModal && setShowAuthModal(true)}
            whileHover={{ 
              scale: 1.08,
              rotateY: 5,
              boxShadow: "0 10px 30px rgba(6, 182, 212, 0.4)"
            }}
            whileTap={{ scale: 0.95, rotateY: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="hidden md:block px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg relative overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.span
              className="relative z-10"
              whileHover={{ z: 10 }}
            >
              Get Started
            </motion.span>
            
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 bg-white opacity-0 rounded-full"
              whileTap={{ 
                scale: [0, 2],
                opacity: [0.3, 0]
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>

          {/* Mobile Menu Button */}
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
            <div className="container mx-auto px-6 py-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="py-3"
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white hover:text-cyan-400 transition-colors duration-300 text-lg"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-semibold"
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default ModernNav;