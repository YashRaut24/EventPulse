import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Float, Text, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, Calendar, Users, MapPin, Clock } from 'lucide-react';
import styled from 'styled-components';

// 3D Upload Icon Component
function UploadIcon3D() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Box ref={meshRef} args={[1, 1, 1]} scale={0.8}>
        <meshStandardMaterial
          color="#06b6d4"
          metalness={0.8}
          roughness={0.2}
          emissive="#1e40af"
          emissiveIntensity={0.1}
        />
      </Box>
    </Float>
  );
}

const Form = ({ setWork }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    image: null
  });
  
  const steps = [
    { title: 'Event Details', icon: Calendar },
    { title: 'Date & Time', icon: Clock },
    { title: 'Location & Capacity', icon: MapPin },
    { title: 'Media Upload', icon: Image }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Event Created:', formData);
    setWork(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-black/80 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden">
      {/* Header with 3D Animation */}
      <div className="relative h-32 bg-gradient-to-r from-cyan-500 to-purple-500">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 3] }}>
            <Environment preset="night" />
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1} />
            <UploadIcon3D />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
          </Canvas>
        </div>
        <div className="relative z-10 p-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Create New Event
          </motion.h2>
          <p className="text-white/80">Step {currentStep + 1} of {steps.length}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4 bg-white/5">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center space-x-2 ${
                index <= currentStep ? 'text-cyan-400' : 'text-gray-500'
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotateZ: 10 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500'
                    : 'bg-gray-600'
                }`}
              >
                <step.icon className="w-4 h-4 text-white" />
              </motion.div>
              <span className="text-sm font-medium hidden md:block">{step.title}</span>
            </motion.div>
          ))}
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -50, rotateY: 15 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="space-y-6"
          >
            {/* Step 0: Event Details */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-white font-medium">Event Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all"
                    placeholder="Enter your event title"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-white font-medium">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all resize-none"
                    placeholder="Describe your event"
                  />
                </motion.div>
              </div>
            )}

            {/* Step 1: Date & Time */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-white font-medium">Event Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-white font-medium">Event Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all"
                  />
                </motion.div>
              </div>
            )}

            {/* Step 2: Location & Capacity */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-white font-medium">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all"
                    placeholder="Event location"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-white font-medium">Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all"
                    placeholder="Maximum attendees"
                  />
                </motion.div>
              </div>
            )}

            {/* Step 3: Media Upload */}
            {currentStep === 3 && (
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 2 }}
                className="border-2 border-dashed border-cyan-400/50 rounded-xl p-8 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotateZ: 5 }}
                  className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Upload className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">Upload Event Image</h3>
                <p className="text-gray-300 mb-4">Drag and drop or click to select</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleInputChange('image', e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all cursor-pointer"
                >
                  Choose File
                </label>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between p-6 bg-white/5">
        <motion.button
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            currentStep === 0
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Previous
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all"
        >
          {currentStep === steps.length - 1 ? 'Create Event' : 'Next'}
        </motion.button>
      </div>
    </div>
  );
}

const StyledWrapper = styled.div`
  /* Legacy styles for compatibility */
`;

export default Form;
