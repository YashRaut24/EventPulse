import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const RealTimeIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-medium">Live Monitoring Active</span>
          </div>
          <div className="text-gray-300 text-sm">
            Last updated: just now
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-300">
          <div className="flex items-center space-x-1">
            <Icon name="Activity" size={16} />
            <span>1,247 mentions today</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={16} />
            <span>+12% vs yesterday</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RealTimeIndicator;