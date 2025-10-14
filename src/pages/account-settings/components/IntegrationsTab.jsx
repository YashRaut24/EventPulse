import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const IntegrationsTab = () => {
  const integrations = [
    { name: 'Twitter', connected: true, icon: 'Twitter', color: 'text-blue-400' },
    { name: 'Facebook', connected: true, icon: 'Facebook', color: 'text-blue-600' },
    { name: 'Instagram', connected: false, icon: 'Instagram', color: 'text-pink-400' },
    { name: 'LinkedIn', connected: true, icon: 'Linkedin', color: 'text-blue-500' },
    { name: 'YouTube', connected: false, icon: 'Youtube', color: 'text-red-500' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Social Media Integrations</h3>
        <p className="text-gray-300">Connect your social media accounts for monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <div key={integration.name} className="bg-black/20 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name={integration.icon} size={24} className={integration.color} />
                <span className="text-white font-medium">{integration.name}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  integration.connected 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-cyan-500/20 text-cyan-400'
                }`}
              >
                {integration.connected ? 'Connected' : 'Connect'}
              </motion.button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationsTab;