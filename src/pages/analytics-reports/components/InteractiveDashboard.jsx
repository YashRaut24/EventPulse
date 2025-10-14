import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const InteractiveDashboard = ({ reportData }) => {
  const performanceData = [
    { month: 'Jan', engagement: 4000, reach: 24000, conversions: 240 },
    { month: 'Feb', engagement: 3000, reach: 13980, conversions: 221 },
    { month: 'Mar', engagement: 2000, reach: 9800, conversions: 229 },
    { month: 'Apr', engagement: 2780, reach: 39080, conversions: 200 },
    { month: 'May', engagement: 1890, reach: 48000, conversions: 218 },
    { month: 'Jun', engagement: 2390, reach: 38000, conversions: 250 }
  ];

  const platformData = [
    { name: 'Twitter', value: 35, color: '#1DA1F2' },
    { name: 'Instagram', value: 28, color: '#E4405F' },
    { name: 'Facebook', value: 22, color: '#1877F2' },
    { name: 'LinkedIn', value: 15, color: '#0A66C2' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Interactive Dashboard</h2>
        <p className="text-gray-300">Real-time analytics and performance metrics</p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Engagement', value: '156.2K', change: '+12.5%', icon: 'Heart' },
          { title: 'Reach', value: '2.4M', change: '+8.7%', icon: 'Users' },
          { title: 'Conversions', value: '1,247', change: '+15.3%', icon: 'TrendingUp' },
          { title: 'ROI', value: '340%', change: '+22.1%', icon: 'DollarSign' }
        ].map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm">{kpi.title}</h3>
              <span className="text-green-400 text-sm">{kpi.change}</span>
            </div>
            <div className="text-2xl font-bold text-white">{kpi.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Performance Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Line type="monotone" dataKey="engagement" stroke="#06B6D4" strokeWidth={2} />
                <Line type="monotone" dataKey="reach" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Platform Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Platform Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            'New report generated: Weekly Performance Summary',
            'Alert triggered: Engagement spike detected on Twitter',
            'Campaign launched: Summer Event Promotion',
            'Data export completed: Q2 Analytics Report'
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span className="text-gray-300">{activity}</span>
              <span className="text-gray-500 text-sm ml-auto">{index + 1}h ago</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveDashboard;