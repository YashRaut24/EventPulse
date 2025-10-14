import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, color }) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-cyan-500/10 text-cyan-500';
      case 'success':
        return 'bg-green-500/10 text-green-500';
      case 'secondary':
        return 'bg-purple-500/10 text-purple-500';
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getChangeColor = (changeType) => {
    return changeType === 'positive' ? 'text-green-500' : 'text-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
        <div className={`text-sm font-medium ${getChangeColor(changeType)}`}>
          {change}
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <p className="text-gray-300 text-sm">{title}</p>
      </div>
    </motion.div>
  );
};

export default MetricCard;