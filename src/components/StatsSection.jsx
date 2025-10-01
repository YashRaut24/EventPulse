import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const StatCard = ({ number, suffix, label, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="text-center p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="mb-4">
        <AnimatedCounter end={number} suffix={suffix} />
      </div>
      <p className="text-gray-300 text-lg font-medium">{label}</p>
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    { number: 10000, suffix: "+", label: "Events Created" },
    { number: 50000, suffix: "+", label: "Happy Users" },
    { number: 99, suffix: "%", label: "Success Rate" },
    { number: 24, suffix: "/7", label: "Support Available" }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-32 h-32 border-2 border-cyan-400/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 w-40 h-40 border-2 border-purple-400/20 rounded-full"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-50"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Trusted by <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Thousands</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join the growing community of event organizers who trust EventPulse for their success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;