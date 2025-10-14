import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Text, Float, Stars, Environment, Sparkles, Cloud } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import Networks from "./Networks";

function AnimatedSphere() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    meshRef.current.scale.setScalar(hovered ? 2.2 : 2);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere 
        ref={meshRef} 
        args={[1, 100, 200]} 
        scale={2}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={hovered ? "#06b6d4" : "#4f46e5"}
          attach="material"
          distort={hovered ? 0.5 : 0.3}
          speed={hovered ? 2.5 : 1.5}
          roughness={0}
          metalness={0.8}
        />
      </Sphere>
      <Sparkles count={50} scale={4} size={2} speed={0.4} />
    </Float>
  );
}

function FloatingCube({ position, color = "#06b6d4" }) {
  const meshRef = useRef();
  const [clicked, setClicked] = useState(false);
  
  useFrame((state) => {
    meshRef.current.rotation.x += clicked ? 0.05 : 0.01;
    meshRef.current.rotation.y += clicked ? 0.05 : 0.01;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    meshRef.current.scale.setScalar(clicked ? 1.5 : 1);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh 
        ref={meshRef} 
        position={position}
        onClick={() => setClicked(!clicked)}
        onPointerOver={(e) => (e.object.scale.setScalar(1.2))}
        onPointerOut={(e) => (e.object.scale.setScalar(1))}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial 
          color={clicked ? "#8b5cf6" : color} 
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

const HeroSection = ({ setShowAuthModal }) => {
  return (
    <div className="relative h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Environment preset="night" />
          <Stars radius={300} depth={60} count={1000} factor={7} saturation={0} fade speed={1} />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />
          
          <AnimatedSphere />
          <FloatingCube position={[-3, 1, 0]} color="#06b6d4" />
          <FloatingCube position={[3, -1, 0]} color="#8b5cf6" />
          <FloatingCube position={[0, 2, -2]} color="#f59e0b" />
          <FloatingCube position={[-2, -2, 1]} color="#ef4444" />
          <FloatingCube position={[2, 2, -1]} color="#10b981" />
          
          {/* Floating Rings */}
          <Float speed={0.5} rotationIntensity={2} floatIntensity={1}>
            <mesh position={[4, 0, -3]} rotation={[0, 0, Math.PI / 4]}>
              <torusGeometry args={[1, 0.1, 16, 100]} />
              <meshStandardMaterial color="#06b6d4" metalness={0.8} roughness={0.2} />
            </mesh>
          </Float>
          
          <Float speed={0.3} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[-4, 1, -2]} rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[0.8, 0.08, 16, 100]} />
              <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
            </mesh>
          </Float>
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center text-white max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          >
            EventPulse
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl mb-8 text-gray-300"
          >
            Transform Your Events Into Extraordinary Experiences
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          > 
            <button 
              onClick={() => setShowAuthModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get Started
            </button>
            <button className="px-8 py-4 border-2 border-white rounded-full text-white font-semibold hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-300">
              Learn More
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
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
    </div>
  );
};

export default HeroSection;