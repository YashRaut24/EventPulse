import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Float, Text, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

function LoadingCube() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.7;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Box ref={meshRef} args={[1, 1, 1]}>
        <meshStandardMaterial
          color="#06b6d4"
          metalness={0.8}
          roughness={0.2}
          emissive="#1e40af"
          emissiveIntensity={0.3}
        />
      </Box>
    </Float>
  );
}

function LoadingSpheres() {
  const spheres = [];
  for (let i = 0; i < 5; i++) {
    spheres.push(
      <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 3,
            Math.sin((i / 5) * Math.PI * 2) * 3,
            0
          ]}
          args={[0.3, 16, 16]}
        >
          <meshStandardMaterial
            color={`hsl(${(i * 72) % 360}, 70%, 60%)`}
            metalness={0.6}
            roughness={0.3}
          />
        </Sphere>
      </Float>
    );
  }
  return <>{spheres}</>;
}

const Loading3D = ({ isVisible, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => onComplete && onComplete(), 500);
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        >
          {/* 3D Scene */}
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
              <Environment preset="night" />
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />
              
              <LoadingCube />
              <LoadingSpheres />
              
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
            </Canvas>
          </div>

          {/* Loading Content */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="mb-8"
            >
              <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                EventPulse
              </h1>
              <p className="text-xl text-gray-300">
                Loading amazing experiences...
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "300px", opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mx-auto bg-white/10 rounded-full h-2 overflow-hidden backdrop-blur-sm"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Progress Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-gray-400 mt-4"
            >
              {Math.round(progress)}%
            </motion.p>

            {/* Loading Messages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-8"
            >
              <motion.p
                key={Math.floor(progress / 25)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-cyan-400"
              >
                {progress < 25 && "Initializing 3D environment..."}
                {progress >= 25 && progress < 50 && "Loading components..."}
                {progress >= 50 && progress < 75 && "Setting up animations..."}
                {progress >= 75 && progress < 100 && "Almost ready..."}
                {progress >= 100 && "Welcome to EventPulse!"}
              </motion.p>
            </motion.div>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 200 - 100, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading3D;