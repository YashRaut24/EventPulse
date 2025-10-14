import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const NotificationsTab = () => {
  const [settings, setSettings] = useState({
    emailNotifications: {
      mentions: true,
      alerts: true,
      reports: false,
      campaigns: true
    },
    pushNotifications: {
      mentions: true,
      alerts: true,
      reports: false,
      campaigns: false
    },
    frequency: 'immediate',
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    }
  });

  const handleSave = () => {
    alert('Notification settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Notification Preferences</h3>
        <p className="text-gray-300">Manage how and when you receive notifications</p>
      </div>

      {/* Email Notifications */}
      <div className="bg-black/20 border border-white/10 rounded-xl p-6">
        <h4 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Icon name="Mail" size={20} className="text-cyan-400" />
          <span>Email Notifications</span>
        </h4>
        <div className="space-y-3">
          {Object.entries(settings.emailNotifications).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between">
              <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setSettings({
                  ...settings,
                  emailNotifications: {
                    ...settings.emailNotifications,
                    [key]: e.target.checked
                  }
                })}
                className="w-4 h-4 text-cyan-400 bg-black/60 border-white/20 rounded focus:ring-cyan-400"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-black/20 border border-white/10 rounded-xl p-6">
        <h4 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-purple-400" />
          <span>Push Notifications</span>
        </h4>
        <div className="space-y-3">
          {Object.entries(settings.pushNotifications).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between">
              <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setSettings({
                  ...settings,
                  pushNotifications: {
                    ...settings.pushNotifications,
                    [key]: e.target.checked
                  }
                })}
                className="w-4 h-4 text-cyan-400 bg-black/60 border-white/20 rounded focus:ring-cyan-400"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Frequency Settings */}
      <div className="bg-black/20 border border-white/10 rounded-xl p-6">
        <h4 className="text-lg font-medium text-white mb-4">Notification Frequency</h4>
        <div className="space-y-3">
          {['immediate', 'hourly', 'daily', 'weekly'].map((freq) => (
            <label key={freq} className="flex items-center space-x-2">
              <input
                type="radio"
                name="frequency"
                value={freq}
                checked={settings.frequency === freq}
                onChange={(e) => setSettings({...settings, frequency: e.target.value})}
                className="w-4 h-4 text-cyan-400 bg-black/60 border-white/20 focus:ring-cyan-400"
              />
              <span className="text-gray-300 capitalize">{freq}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
        >
          Save Changes
        </motion.button>
      </div>
    </div>
  );
};

export default NotificationsTab;