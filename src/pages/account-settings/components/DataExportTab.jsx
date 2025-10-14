import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const DataExportTab = () => {
  const handleExport = (type) => {
    alert(`Exporting ${type} data...`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Data Export</h3>
        <p className="text-gray-300">Export your data for backup or migration purposes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { type: 'Profile Data', description: 'Your profile information and settings', icon: 'User' },
          { type: 'Event Data', description: 'All your events and related information', icon: 'Calendar' },
          { type: 'Analytics Data', description: 'Historical analytics and reports', icon: 'BarChart3' },
          { type: 'Social Media Data', description: 'Connected accounts and monitoring data', icon: 'Share2' }
        ].map((item) => (
          <div key={item.type} className="bg-black/20 border border-white/10 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name={item.icon} size={24} className="text-cyan-400" />
              <div>
                <h4 className="text-white font-medium">{item.type}</h4>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleExport(item.type)}
              className="w-full px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              Export
            </motion.button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataExportTab;