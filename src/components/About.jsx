import { motion } from 'framer-motion';
import { Users, Briefcase, BarChart3, Share2, Star, Globe } from 'lucide-react';
import './About.css';

function About() {
  return (
    <section className="about-section bg-gradient-to-b from-black to-gray-900 py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* Row 1 – For Event Managers */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="about-row flex flex-col md:flex-row items-center gap-10"
        >
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              For Event Managers
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              EventPulse empowers verified event managers to build credibility, manage events efficiently, and promote them on social media. Our platform ensures authenticity, visibility, and growth for every event manager.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Briefcase />, title: "Manage Events", text: "Create and track all your events from one dashboard." },
                { icon: <BarChart3 />, title: "Analytics", text: "Get real-time insights and performance stats for your events." },
                { icon: <Share2 />, title: "Social Promotion", text: "Promote your events directly on popular social media platforms." },
                { icon: <Star />, title: "Verified Profile", text: "Gain trust with verified manager status and reviews." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="feature-card bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/20 text-white shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-2 text-cyan-400">{item.icon}<h3 className="font-semibold">{item.title}</h3></div>
                  <p className="text-gray-300 text-sm">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center"
          >
            <img src="/EventManager.png" alt="Event Manager Dashboard" className="about-image" />
          </motion.div>
        </motion.div>

        {/* Row 2 – For Users */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="about-row flex flex-col md:flex-row items-center gap-10"
        >
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center"
          >
            <img src="/User.png" alt="User Dashboard" className="about-image" />
          </motion.div>

          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
              For Users
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you’re attending an event or looking to hire a manager, EventPulse gives users a personalized dashboard to explore trending events, connect with professionals, and share their experiences effortlessly.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Users />, title: "Discover Events", text: "Find trending, local, or upcoming events easily." },
                { icon: <Globe />, title: "Social Integration", text: "Share your favorite events on social platforms instantly." },
                { icon: <Star />, title: "Ratings & Reviews", text: "View feedback and rate event managers post-event." },
                { icon: <Briefcase />, title: "Hire Managers", text: "Connect with verified managers for your next event." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="feature-card bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/20 text-white shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-2 text-purple-400">{item.icon}<h3 className="font-semibold">{item.title}</h3></div>
                  <p className="text-gray-300 text-sm">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
