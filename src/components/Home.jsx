import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, MessageSquare, TrendingUp, Award, Mail, Phone } from 'lucide-react';
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
 const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    console.log({ rating, feedback, category, email, phone });
    alert('Thank you for your feedback! We appreciate your input.');
    setRating(0);
    setFeedback('');
    setCategory('');
    setEmail('');
    setPhone('');
  };
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

  <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto flex gap-6 px-4">
        {/* Left Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-1/5 mt-6 space-y-4"
        >
          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-xl border border-white/20">
            <MessageSquare className="w-6 h-6 text-cyan-400 mb-2" />
            <h2 className="font-bold text-lg text-white mb-2">Your Voice</h2>
            <p className="text-gray-300 text-sm">Help us improve EventPulse</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-xl border border-white/20">
            <Award className="w-6 h-6 text-purple-400 mb-2" />
            <h2 className="font-bold text-lg text-white mb-2">Community</h2>
            <p className="text-gray-300 text-sm">Join our feedback champions</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-xl border border-white/20">
            <Mail className="w-6 h-6 text-cyan-400 mb-2" />
            <h2 className="font-bold text-lg text-white mb-2">Stay Connected</h2>
            <p className="text-gray-300 text-sm mb-3">We value your feedback and may reach out for follow-up</p>
          </div>
        </motion.div>

        {/* Main Feedback Form */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 mt-6 space-y-4"
        >
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
            <h2 className="font-bold text-2xl mb-2 text-white">Share Your Feedback</h2>
            <p className="text-gray-300 mb-6">Help us make EventPulse even better for you</p>
            
            {/* Rating Section */}
            <div className="mb-6">
              <label className="text-white font-semibold mb-3 block">How would you rate your experience?</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-10 h-10 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-400'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label className="text-white font-semibold mb-3 block">Your Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/20 rounded-xl p-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Phone Input */}
            <div className="mb-6">
              <label className="text-white font-semibold mb-3 block">Your Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  className="w-full bg-white/5 border border-white/20 rounded-xl p-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Category Selection */}
            <div className="mb-6">
              <label className="text-white font-semibold mb-3 block">What aspect are you reviewing?</label>
              <div className="flex flex-wrap gap-2">
                {['Event Organization', 'Analytics', 'Social Media', 'Promotion', 'User Interface', 'Event Host Query'].map((cat) => (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      category === cat
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                        : 'bg-white/5 text-gray-300 border border-white/20'
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Feedback Text Area */}
            <div className="mb-6">
              <label className="text-white font-semibold mb-3 block">Tell us more about your experience</label>
              <textarea
                className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="Share your thoughts, suggestions, or report any issues..."
                rows="5"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Feedback
            </motion.button>
          </div>

          {/* Recent Feedback Section */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
            <h2 className="font-bold text-lg mb-4 text-white">Recent Community Feedback</h2>
            <p className="text-gray-300 mb-4">See what others are saying about EventPulse</p>
            <div className="space-y-3">
              {[
                { name: 'Sarah M.', rating: 5, comment: 'Amazing analytics dashboard!', time: '1 hour ago' },
                { name: 'John D.', rating: 4, comment: 'Great for event promotion', time: '3 hours ago' },
                { name: 'Emily R.', rating: 5, comment: 'Best event management tool', time: '5 hours ago' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 p-4 rounded-xl border border-white/10"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {item.name[0]}
                      </div>
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <div className="flex gap-1 my-1">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-300 text-sm">{item.comment}</p>
                      </div>
                    </div>
                    <span className="text-gray-400 text-xs">{item.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-1/4 mt-6 space-y-4"
        >
          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-xl border border-white/20">
            <TrendingUp className="w-6 h-6 text-cyan-400 mb-2" />
            <h2 className="font-bold text-lg text-white mb-2">Trending Topics</h2>
            <p className="text-gray-300 text-sm mb-3">Most discussed features</p>
            <div className="space-y-2">
              <div className="text-cyan-400 text-sm">#Analytics</div>
              <div className="text-purple-400 text-sm">#EventPromotion</div>
              <div className="text-pink-400 text-sm">#UserInterface</div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-xl border border-white/20">
            <h2 className="font-bold text-lg text-white mb-2">Quick Stats</h2>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>• 1,234 Reviews</p>
              <p>• 4.8 Average Rating</p>
              <p>• 95% Satisfied Users</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
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
