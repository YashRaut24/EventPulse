import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Float, Stars, Environment, Text, Box } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { User, BarChart3, Settings, Award, Calendar, TrendingUp } from 'lucide-react';

import Profile from "./Profile";
import Analytics from "./Analytics";

// 3D Avatar Component
function Avatar3D() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 32, 32]} scale={1.5}>
        <meshStandardMaterial
          color="#06b6d4"
          metalness={0.8}
          roughness={0.2}
          emissive="#1e40af"
          emissiveIntensity={0.2}
        />
      </Sphere>
      
      {/* Orbiting elements */}
      <Float speed={3} rotationIntensity={2}>
        <Box position={[2, 0, 0]} args={[0.2, 0.2, 0.2]}>
          <meshStandardMaterial color="#8b5cf6" />
        </Box>
      </Float>
      
      <Float speed={2.5} rotationIntensity={1.5}>
        <Box position={[-2, 0, 0]} args={[0.15, 0.15, 0.15]}>
          <meshStandardMaterial color="#f59e0b" />
        </Box>
      </Float>
    </Float>
  );
}

// 3D Tab Button Component
const Tab3D = ({ icon: Icon, label, isActive, onClick, delay }) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -50, rotateY: -90 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.6, delay, type: "spring" }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 10px 30px rgba(6, 182, 212, 0.3)"
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
          : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="w-5 h-5" />
      </motion.div>
      <span className="font-medium">{label}</span>
      
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl -z-10"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
};

// Enhanced 3D Profile with sidebar navigation and Dashboard view
export default function LinkedInProfile({ profile }) {
  const [activeTab, setActiveTab] = useState('profile');
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'dashboard', label: 'Analytics', icon: BarChart3 },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];


  // Mock engagement data
  const engagementByDay = [
    { day: 'Mon', views: 120, likes: 24, comments: 8 },
    { day: 'Tue', views: 98, likes: 18, comments: 5 },
    { day: 'Wed', views: 150, likes: 30, comments: 12 },
    { day: 'Thu', views: 170, likes: 40, comments: 18 },
    { day: 'Fri', views: 220, likes: 55, comments: 25 },
    { day: 'Sat', views: 90, likes: 12, comments: 3 },
    { day: 'Sun', views: 60, likes: 8, comments: 2 },
  ];

  const engagementBySource = [
    { name: 'Direct', value: 400 },
    { name: 'Search', value: 300 },
    { name: 'Referral', value: 300 },
    { name: 'Social', value: 200 },
  ];

  const postPerformance = [
    { post: 'Project Demo', impressions: 800, clicks: 120 },
    { post: 'Article: DSA Tips', impressions: 600, clicks: 80 },
    { post: 'Open Source', impressions: 450, clicks: 50 },
  ];

  const COLORS = ['#4F46E5', '#06B6D4', '#F59E0B', '#EF4444'];


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex pt-20">
      {/* 3D Sidebar */}
      <motion.nav 
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="w-72 bg-black/40 backdrop-blur-lg border-r border-white/20 p-6 space-y-4"
      >
        {/* 3D Avatar Section */}
        <div className="h-48 mb-6">
          <Canvas camera={{ position: [0, 0, 4] }}>
            <Environment preset="night" />
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1} />
            <Avatar3D />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
          </Canvas>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-bold text-white mb-2">John Doe</h2>
          <p className="text-gray-300">Event Organizer</p>
        </motion.div>
        
        {/* 3D Navigation Tabs */}
        <div className="space-y-3">
          {tabs.map((tab, index) => (
            <Tab3D
              key={tab.id}
              icon={tab.icon}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm"
        >
          <h3 className="text-white font-semibold mb-3">Quick Stats</h3>
          <div className="space-y-2">
            {[
              { label: 'Events Created', value: '24' },
              { label: 'Total Attendees', value: '1.2K' },
              { label: 'Success Rate', value: '98%' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex justify-between text-sm"
              >
                <span className="text-gray-300">{stat.label}</span>
                <span className="text-cyan-400 font-semibold">{stat.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Enhanced Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -50, rotateX: 15 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="h-full"
          >
            {activeTab === 'profile' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <Profile profile={profile} />
              </div>
            )}
            
            {activeTab === 'dashboard' && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <Analytics
                  engagementByDay={engagementByDay}
                  postPerformance={postPerformance}
                  engagementBySource={engagementBySource}
                  COLORS={COLORS}
                />
              </div>
            )}
            
            {activeTab === 'achievements' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: 'Event Master', description: 'Organized 25+ events', color: 'from-yellow-400 to-orange-500' },
                    { title: 'Network Builder', description: '500+ connections', color: 'from-blue-400 to-purple-500' },
                    { title: 'Top Rated', description: '5-star average rating', color: 'from-green-400 to-cyan-500' }
                  ].map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      className={`bg-gradient-to-br ${achievement.color} p-6 rounded-xl text-white`}
                    >
                      <Award className="w-12 h-12 mb-4" />
                      <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                      <p>{achievement.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'calendar' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Upcoming Events</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Tech Conference 2024', date: 'March 15, 2024', attendees: 250 },
                    { title: 'Wedding Reception', date: 'March 22, 2024', attendees: 120 },
                    { title: 'Corporate Retreat', date: 'April 5, 2024', attendees: 80 }
                  ].map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all"
                    >
                      <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                      <p className="text-gray-300">{event.date}</p>
                      <p className="text-cyan-400">{event.attendees} attendees</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Settings</h2>
                <div className="space-y-6">
                  {[
                    'Profile Settings',
                    'Notification Preferences', 
                    'Privacy Controls',
                    'Account Security'
                  ].map((setting, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer"
                    >
                      <h3 className="text-xl font-semibold text-white">{setting}</h3>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
}
