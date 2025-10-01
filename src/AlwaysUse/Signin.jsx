import React, { useState, useRef } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Float, Environment, Text } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock, Sparkles } from 'lucide-react';
import styled from "styled-components";

// 3D Login Icon Component
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

const Form = ({ setLoginData, setWork }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        setIsLoading(false);
        return;
      }
      console.log("Sign Up Data:", formData);
      setLoginData(formData);
      alert("Signed Up successfully!");
    } else {
      console.log("Sign In Data:", formData);
      setLoginData(formData);
      alert("Signed In successfully!");
    }
    
    setIsLoading(false);
    if (setWork) setWork(true);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black/80 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden">
      {/* 3D Header */}
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
            {isSignup ? "Create Account" : "Welcome Back"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/80"
          >
            {isSignup ? "Join EventPulse today" : "Sign in to continue"}
          </motion.p>
        </div>
      </div>

      <form className="p-6 space-y-6" onSubmit={handleSubmit}>

        <AnimatePresence>
          {isSignup && (
            <motion.div
              initial={{ opacity: 0, height: 0, rotateX: -90 }}
              animate={{ opacity: 1, height: 'auto', rotateX: 0 }}
              exit={{ opacity: 0, height: 0, rotateX: -90 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="space-y-2"
            >
              <label className="text-white font-medium flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Full Name</span>
              </label>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <input
                  type="text"
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="Enter your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 pointer-events-none"
                  whileFocus={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <label className="text-white font-medium flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </label>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <input
              type="email"
              className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              placeholder="Enter your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <label className="text-white font-medium flex items-center space-x-2">
            <Lock className="w-4 h-4" />
            <span>Password</span>
          </label>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-4 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              placeholder="Enter your Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </motion.button>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isSignup && (
            <motion.div
              initial={{ opacity: 0, height: 0, rotateX: -90 }}
              animate={{ opacity: 1, height: 'auto', rotateX: 0 }}
              exit={{ opacity: 0, height: 0, rotateX: -90 }}
              transition={{ duration: 0.5, type: "spring", delay: 0.1 }}
              className="space-y-2"
            >
              <label className="text-white font-medium flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Confirm Password</span>
              </label>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full p-4 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="Confirm your Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isSignup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between"
          >
            <motion.label
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 text-gray-300 cursor-pointer"
            >
              <input type="checkbox" className="rounded" />
              <span>Remember me</span>
            </motion.label>
            <motion.span
              whileHover={{ scale: 1.05, color: "#06b6d4" }}
              className="text-cyan-400 cursor-pointer hover:underline"
            >
              Forgot password?
            </motion.span>
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(6, 182, 212, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
        >
          <AnimatePresence>
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center space-x-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                <span>Processing...</span>
              </motion.div>
            ) : (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {isSignup ? "Sign Up" : "Sign In"}
              </motion.span>
            )}
          </AnimatePresence>
          
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 bg-white opacity-0 rounded-xl"
            whileTap={{ 
              scale: [0, 2],
              opacity: [0.3, 0]
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-300"
        >
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <motion.span
            whileHover={{ scale: 1.05, color: "#06b6d4" }}
            onClick={() => setIsSignup(!isSignup)}
            className="text-cyan-400 cursor-pointer hover:underline font-semibold"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </motion.span>
        </motion.p>
      </form>
    </div>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  ::placeholder {
    font-family: inherit;
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 100%;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .flex-row > div > label {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }

  .button-submit:hover {
    background-color: #252727;
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }
`;

export default Form;
