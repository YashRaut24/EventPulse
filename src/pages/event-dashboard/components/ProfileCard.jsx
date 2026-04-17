
import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook, FaGlobe } from 'react-icons/fa';

const ProfileCard = ({ connectedPlatforms, onTogglePlatform, onFetchData }) => {
  const platforms = [
    { name: 'LinkedIn', icon: FaLinkedin, color: '#0077b5' },
    { name: 'Instagram', icon: FaInstagram, color: '#E1306C' },
    { name: 'Twitter', icon: FaTwitter, color: '#1DA1F2' },
    { name: 'Facebook', icon: FaFacebook, color: '#1877F2' },
    { name: 'Swish', icon: FaGlobe, color: '#6366F1' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
    >
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
          <img
            src="https://images.unsplash.com/photo-1769631417306-a1da09f42b20?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {platforms.map((platform) => {
            const isConnected = connectedPlatforms.includes(platform.name);
            const IconComponent = platform.icon;

            return (
              <motion.div
                key={platform.name}
                onClick={() => {
                  onTogglePlatform && onTogglePlatform(platform.name);
                  console.log("Selected Platforms:", connectedPlatforms);
                  if (onFetchData && ['Instagram', 'Facebook', 'Twitter', 'Swish'].includes(platform.name)) {
                    console.log("Analytics Data trigger for:", platform.name);
                    onFetchData(platform.name);
                  }
                }}
                className={`flex items-center justify-center gap-2 p-2 rounded cursor-pointer transition hover:bg-muted ${
                  isConnected ? 'opacity-100' : 'opacity-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent color={isConnected ? platform.color : 'grey'} />
                <span className="text-sm text-white">{platform.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
