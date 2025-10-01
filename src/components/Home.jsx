import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Signin from '../AlwaysUse/Signin';
import AddWork from '../AlwaysUse/AddWork';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import StatsSection from './StatsSection';
import Footer from './Footer';

var count = 0;

function Home() {
  var [Login, setLogin] = useState(false);
  var [LoginData, setLoginData] = useState({ Name: "", Email: "", Password: "" });
  var [Work, setWork] = useState(false);
  var [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (Login) count++;
  }, [Login]);

  return (
    <>
      {/* Hero Section with 3D Animation */}
      <HeroSection setShowAuthModal={setShowAuthModal} />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Interactive Dashboard Section
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto flex gap-6 px-4">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-1/5 mt-6 space-y-4"
          >
            <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-xl border border-white/20">
              <h2 className="font-bold text-lg text-white mb-2">Quick Access</h2>
              <p className="text-gray-300 text-sm">Your profile and settings</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-xl border border-white/20">
              <h2 className="font-bold text-lg text-white mb-2">Discover</h2>
              <p className="text-gray-300 text-sm">Trending events & updates</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 mt-6 space-y-4"
          >
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
              <h2 className="font-bold text-lg mb-4 text-white">Create Your Event</h2>
              <textarea
                className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="What amazing event are you planning?"
                rows="3"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl mt-4 font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                onClick={() => {
                  setLogin(true);
                  if (!Work) setWork(true);
                }}
              >
                Start Planning
              </motion.button>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
              <h2 className="font-bold text-lg mb-4 text-white">Event Feed</h2>
              <p className="text-gray-300">Your latest events and network updates will appear here.</p>
              <div className="mt-4 space-y-3">
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: item * 0.1 }}
                    className="bg-white/5 p-4 rounded-xl border border-white/10"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
                      <div>
                        <p className="text-white font-medium">Event Update #{item}</p>
                        <p className="text-gray-400 text-sm">2 hours ago</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-1/4 mt-6 space-y-4"
          >
            <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-xl border border-white/20">
              <h2 className="font-bold text-lg text-white mb-2">Suggestions</h2>
              <p className="text-gray-300 text-sm">Connect with event organizers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-xl border border-white/20">
              <h2 className="font-bold text-lg text-white mb-2">Trending</h2>
              <p className="text-gray-300 text-sm">Popular events & topics</p>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Footer */}
      <Footer />

      {/* Auth Modal from Get Started */}
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
            <Signin setLoginData={setLoginData} setWork={setWork} />
          </motion.div>
        </motion.div>
      )}

      {/* Sign In Modal */}
      {(Login && count === 0) && (
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
            onClick={() => setLogin(false)}
          >
            ✕
          </motion.button>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <Signin setLoginData={setLoginData} setWork={setWork} />
          </motion.div>
        </motion.div>
      )}

      {/* Add Work Modal */}
      {(Work && count !== 0) && (
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
            onClick={() => setWork(false)}
          >
            ✕
          </motion.button>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <AddWork setWork={setWork} />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default Home;
