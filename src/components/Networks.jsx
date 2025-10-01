import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Text, Float, Stars, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Heart, Share2, UserPlus } from 'lucide-react';
import * as THREE from 'three';

// 3D Network Node Component
function NetworkNode({ position, color, size = 0.3, connections = [] }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.scale.setScalar(hovered ? size * 1.5 : clicked ? size * 1.2 : size);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <Sphere
        ref={meshRef}
        position={position}
        args={[1, 32, 32]}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? "#06b6d4" : color}
          metalness={0.8}
          roughness={0.2}
          emissive={hovered ? "#1e40af" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </Sphere>
    </Float>
  );
}

// 3D Connection Lines
function ConnectionLine({ start, end }) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  
  return (
    <Line
      points={points}
      color="#06b6d4"
      lineWidth={2}
      transparent
      opacity={0.6}
    />
  );
}

// 3D Network Visualization
function NetworkVisualization() {
  const nodes = [
    { position: [0, 0, 0], color: "#8b5cf6", size: 0.5 },
    { position: [2, 1, -1], color: "#06b6d4", size: 0.3 },
    { position: [-2, -1, 1], color: "#10b981", size: 0.3 },
    { position: [1, -2, 0], color: "#f59e0b", size: 0.3 },
    { position: [-1, 2, -2], color: "#ef4444", size: 0.3 },
    { position: [3, 0, 1], color: "#8b5cf6", size: 0.25 },
    { position: [-3, 1, 0], color: "#06b6d4", size: 0.25 },
  ];

  const connections = [
    [[0, 0, 0], [2, 1, -1]],
    [[0, 0, 0], [-2, -1, 1]],
    [[0, 0, 0], [1, -2, 0]],
    [[0, 0, 0], [-1, 2, -2]],
    [[2, 1, -1], [3, 0, 1]],
    [[-2, -1, 1], [-3, 1, 0]],
  ];

  return (
    <>
      <Environment preset="night" />
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />
      
      {/* Render connections */}
      {connections.map((connection, index) => (
        <ConnectionLine key={index} start={connection[0]} end={connection[1]} />
      ))}
      
      {/* Render nodes */}
      {nodes.map((node, index) => (
        <NetworkNode
          key={index}
          position={node.position}
          color={node.color}
          size={node.size}
        />
      ))}
      
      {/* Central text */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <Text
          position={[0, -3, 0]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Your Network
        </Text>
      </Float>
      
      <OrbitControls enableZoom={true} enablePan={true} autoRotate autoRotateSpeed={1} />
    </>
  );
}

// Network Card Component
const NetworkCard = ({ user, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -90 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay, type: "spring" }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)"
      }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all duration-500"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <motion.div
          whileHover={{ rotateY: 180, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Users className="w-8 h-8 text-white" />
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-white">{user.name}</h3>
          <p className="text-gray-300">{user.role}</p>
        </div>
      </div>
      
      <p className="text-gray-300 mb-4">{user.description}</p>
      
      <div className="flex space-x-2">
        {[MessageCircle, Heart, Share2, UserPlus].map((Icon, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2, rotateZ: 10 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/10 rounded-lg hover:bg-cyan-400/20 transition-colors"
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

function Networks() {
  const networkUsers = [
    {
      name: "Alice Johnson",
      role: "Event Coordinator",
      description: "Specializes in corporate events and team building activities."
    },
    {
      name: "Bob Smith",
      role: "Wedding Planner",
      description: "Creates magical wedding experiences with attention to detail."
    },
    {
      name: "Carol Davis",
      role: "Conference Organizer",
      description: "Expert in large-scale conferences and professional gatherings."
    },
    {
      name: "David Wilson",
      role: "Party Planner",
      description: "Brings fun and creativity to birthday parties and celebrations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20">
      {/* 3D Network Visualization */}
      <section className="h-screen relative">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <NetworkVisualization />
        </Canvas>
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Your Network
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Connect with event professionals and build meaningful relationships
            </p>
          </motion.div>
        </div>
      </section>

      {/* Network Cards */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center text-white mb-12"
          >
            Connect with <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Professionals</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {networkUsers.map((user, index) => (
              <NetworkCard key={index} user={user} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Stats */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "500+", label: "Connections", icon: Users },
              { number: "1.2K", label: "Messages", icon: MessageCircle },
              { number: "95%", label: "Response Rate", icon: Heart }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 10,
                  boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)"
                }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  whileHover={{ rotateY: 360 }}
                  transition={{ duration: 1 }}
                  className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-2">{stat.number}</h3>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Networks;