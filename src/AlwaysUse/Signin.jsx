import React, { useState, useRef } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Float, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

// 3D Sphere Component
function LoginIcon3D() {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[0.8, 32, 32]}>
        <meshStandardMaterial
          color="#06b6d4"
          metalness={0.8}
          roughness={0.2}
          emissive="#1e40af"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
}

const Signin = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signupMode, setSignupMode] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (signupMode) {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match!");
          setIsLoading(false);
          return;
        }
        
        const result = await signUp(formData);
        if (result.success) {
          alert("Account created successfully!");
          if (onClose) onClose();
          navigate('/event-dashboard');
        } else {
          setError(result.error || 'Sign up failed');
        }
      } else {
        const result = await signIn({ email: formData.email, password: formData.password });
        if (result.success) {
          alert(`Welcome back, ${result.user.firstName}!`);
          if (onClose) onClose();
          navigate('/event-dashboard');
        } else {
          setError('Invalid email or password');
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black/80 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden">
      <div className="relative h-32 bg-gradient-to-r from-cyan-500 to-purple-500">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 3] }}>
            <Environment preset="night" />
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1} />
            <LoginIcon3D />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
          </Canvas>
        </div>
        <div className="relative z-10 p-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white mb-2"
          >
            {signupMode ? "Create Account" : "Welcome Back"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/80"
          >
            {signupMode ? "Join EventPulse today" : "Sign in to continue"}
          </motion.p>
        </div>
      </div>

      <form className="p-6 space-y-6" onSubmit={handleSubmit}>
        {signupMode && (
          <div className="space-y-2">
            <label className="text-white font-medium flex items-center space-x-2">
              <User className="w-4 h-4" /> <span>Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your Name"
              className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400"
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-white font-medium flex items-center space-x-2">
            <Mail className="w-4 h-4" /> <span>Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email"
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-white font-medium flex items-center space-x-2">
            <Lock className="w-4 h-4" /> <span>Password</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your Password"
              className="w-full p-4 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {signupMode && (
          <div className="space-y-2">
            <label className="text-white font-medium flex items-center space-x-2">
              <Lock className="w-4 h-4" /> <span>Confirm Password</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your Password"
                className="w-full p-4 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}

          <button
          type="submit"
          disabled={isLoading}
          className="w-full p-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-semibold"
        >
          {isLoading ? "Processing..." : signupMode ? "Sign Up" : "Sign In"}
        </button>

        {error && (
          <div className="text-red-400 text-sm text-center mb-4">
            {error}
          </div>
        )}

        <p className="text-center text-gray-300">
          {signupMode ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => {
              setSignupMode(!signupMode);
              setError('');
              setFormData({ name: "", email: "", password: "", confirmPassword: "" });
            }}
            className="text-cyan-400 cursor-pointer font-semibold hover:underline"
          >
            {signupMode ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signin;
