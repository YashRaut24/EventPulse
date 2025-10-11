import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Networks from './components/Networks';
import Home from './components/Home';
import Me from './components/Me';
import ModernNav from './components/ModernNav';
import ParticleSystem from './components/ParticleSystem';
import Loading3D from './components/Loading3D';
import Signin from './AlwaysUse/Signin';
import HomePage from "./components/HomePage";

function App() {
  const [Form, setForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* 3D Loading Screen */}
      <Loading3D 
        isVisible={isLoading} 
        onComplete={() => setIsLoading(false)} 
      />
      
      <BrowserRouter>
        <div className="min-h-screen bg-black relative">
          {/* 3D Particle Background */}
          <ParticleSystem />
          
          {/* Modern Navigation */}
          <ModernNav setShowAuthModal={setShowAuthModal} />

          {/* Content area */}
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/components/Networks" element={<Networks />} />
              <Route path='/components/Me' element={<Me />}/>
            </Routes>
          </div>
          
          {/* Global Auth Modal */}
          {showAuthModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-10 right-10 cursor-pointer bg-red-500 hover:bg-red-600 rounded-full p-3 text-white transition-colors"
                onClick={() => setShowAuthModal(false)}
              >
                ✕
              </motion.button>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 15 }}
              >
                <Signin />
              </motion.div>
            </motion.div>
          )}
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
