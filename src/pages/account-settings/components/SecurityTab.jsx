import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SecurityTab = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handleChangePassword = () => {
    alert('Password change functionality would be implemented here');
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    alert(`Two-factor authentication ${!twoFactorEnabled ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Security Settings</h3>
        <p className="text-gray-300">Manage your account security and authentication</p>
      </div>

      {/* Password Section */}
      <div className="bg-black/20 border border-white/10 rounded-xl p-6">
        <h4 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Icon name="Lock" size={20} className="text-cyan-400" />
          <span>Password</span>
        </h4>
        <p className="text-gray-300 mb-4">Last changed: September 15, 2024</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleChangePassword}
          className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
        >
          Change Password
        </motion.button>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-black/20 border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-medium text-white flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-green-400" />
              <span>Two-Factor Authentication</span>
            </h4>
            <p className="text-gray-300 text-sm">Add an extra layer of security to your account</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggle2FA}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              twoFactorEnabled 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
            }`}
          >
            {twoFactorEnabled ? 'Enabled' : 'Disabled'}
          </motion.button>
        </div>
        {twoFactorEnabled && (
          <div className="text-sm text-gray-300">
            ✓ Authenticator app configured
          </div>
        )}
      </div>

      {/* Login Sessions */}
      <div className="bg-black/20 border border-white/10 rounded-xl p-6">
        <h4 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Icon name="Monitor" size={20} className="text-purple-400" />
          <span>Active Sessions</span>
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <div className="text-white font-medium">Current Session</div>
              <div className="text-gray-400 text-sm">Windows • Chrome • Mumbai, India</div>
            </div>
            <span className="text-green-400 text-sm">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;