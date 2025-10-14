import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AnalyticsPanel = () => {
  const engagementData = [
    { time: '00:00', mentions: 12, engagement: 45 },
    { time: '04:00', mentions: 8, engagement: 32 },
    { time: '08:00', mentions: 25, engagement: 78 },
    { time: '12:00', mentions: 45, engagement: 120 },
    { time: '16:00', mentions: 38, engagement: 95 },
    { time: '20:00', mentions: 52, engagement: 145 }
  ];

  const platformData = [
    { platform: 'Twitter', mentions: 245, engagement: 1250 },
    { platform: 'Instagram', mentions: 189, engagement: 980 },
    { platform: 'Facebook', mentions: 156, engagement: 750 },
    { platform: 'LinkedIn', mentions: 98, engagement: 420 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Analytics Overview</h2>
        <p className="text-gray-300">Detailed insights into your social media performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Mentions', value: '1,247', change: '+12.5%', positive: true },
          { title: 'Engagement Rate', value: '8.9%', change: '+2.1%', positive: true },
          { title: 'Reach', value: '45.2K', change: '+18.7%', positive: true },
          { title: 'Sentiment Score', value: '0.65', change: '+0.12', positive: true }
        ].map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-gray-300 text-sm mb-2">{metric.title}</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-white">{metric.value}</span>
              <span className={`text-sm ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Mentions Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Line type="monotone" dataKey="mentions" stroke="#06B6D4" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Platform Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="platform" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Bar dataKey="mentions" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;