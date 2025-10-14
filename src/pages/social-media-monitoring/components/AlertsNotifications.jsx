import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AlertsNotifications = () => {
  const [alerts] = useState([
    {
      id: 1,
      type: 'spike',
      title: 'Mention Spike Detected',
      message: 'Unusual increase in mentions detected for #TechConf2024',
      timestamp: '5 minutes ago',
      severity: 'high',
      platform: 'Twitter'
    },
    {
      id: 2,
      type: 'sentiment',
      title: 'Negative Sentiment Alert',
      message: 'Negative sentiment trending for event pricing discussions',
      timestamp: '15 minutes ago',
      severity: 'medium',
      platform: 'Facebook'
    },
    {
      id: 3,
      type: 'influencer',
      title: 'Influencer Mention',
      message: 'Tech influencer @techguru mentioned your event',
      timestamp: '1 hour ago',
      severity: 'low',
      platform: 'Instagram'
    }
  ]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Alerts & Notifications</h2>
          <p className="text-gray-300">Monitor important events and trends</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
        >
          Create Alert
        </motion.button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-black/40 backdrop-blur-lg border rounded-2xl p-6 ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Icon name="Bell" size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{alert.title}</h3>
                  <p className="text-gray-300 mb-2">{alert.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{alert.timestamp}</span>
                    <span>•</span>
                    <span>{alert.platform}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Icon name="Eye" size={16} className="text-gray-400" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Icon name="X" size={16} className="text-gray-400" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AlertsNotifications;