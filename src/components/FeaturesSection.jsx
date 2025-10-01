import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, BarChart3, Zap } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15, z: -100 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
      whileHover={{ 
        scale: 1.08, 
        rotateY: 8,
        rotateX: 5,
        z: 50,
        boxShadow: "0 35px 60px -12px rgba(6, 182, 212, 0.4)",
        background: "rgba(255, 255, 255, 0.15)"
      }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-cyan-400/60 transition-all duration-500 cursor-pointer group"
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <motion.div 
        className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl mb-6 mx-auto relative overflow-hidden"
        whileHover={{ 
          rotateY: 180,
          background: "linear-gradient(135deg, #8b5cf6, #06b6d4)"
        }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </motion.div>
      
      <motion.h3 
        className="text-2xl font-bold text-white mb-4 text-center"
        whileHover={{ scale: 1.05, color: "#06b6d4" }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-gray-300 text-center leading-relaxed"
        whileHover={{ color: "#e5e7eb" }}
        transition={{ duration: 0.3 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Calendar,
      title: "Smart Planning",
      description: "AI-powered event planning that adapts to your needs and preferences for seamless organization."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Real-time collaboration tools that keep your team synchronized and productive."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights and analytics to track your event performance and ROI."
    },
    {
      icon: Zap,
      title: "Instant Updates",
      description: "Real-time notifications and updates to keep everyone informed and engaged."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Powerful <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to create, manage, and execute successful events with cutting-edge technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;