import React, { useState, useEffect, useMemo } from 'react';
import api from '../../../services/api.js';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AnalyticsPanel = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [previousData, setPreviousData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  // Calculate percentage change
  const calculateChange = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (selectedPlatforms.length === 0) {
        console.log('ℹ️ No platforms selected, clearing analytics data');
        setAnalyticsData(null);
        setPreviousData(null);
        setError(null);
        setLoading(false);
        return;
      }

      console.log('📊 Fetching analytics for platforms:', selectedPlatforms);
      setLoading(true);
      setError(null);

      try {
        const data = await api.getAnalytics(selectedPlatforms);
        console.log('✅ Analytics API response:', data);
        
        if (selectedPlatforms.length === 1 && selectedPlatforms[0] === 'LinkedIn') {
          console.log('ℹ️ LinkedIn selected - using alternative logic');
          setAnalyticsData(null);
        } else {
          setPreviousData(analyticsData);
          setAnalyticsData(data);
          console.log("Analytics Data:", data);
        }
      } catch (err) {
        console.error('❌ Analytics API error:', err.message);
        setError('Failed to fetch analytics data. Please check backend server.');
        setAnalyticsData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();

    // Polling for live updates (only if platforms selected)
    const interval = setInterval(fetchAnalytics, 30000);

    return () => clearInterval(interval);
  }, [selectedPlatforms]);
  // Dynamic engagement data derived from analytics
  const engagementData = useMemo(() => {
    if (!analyticsData) return [];
    
    const baseEngagement = analyticsData.reach || 100;
    return [
      { time: '00:00', mentions: Math.floor(baseEngagement * 0.1), engagement: Math.floor(baseEngagement * 0.3) },
      { time: '04:00', mentions: Math.floor(baseEngagement * 0.15), engagement: Math.floor(baseEngagement * 0.4) },
      { time: '08:00', mentions: Math.floor(baseEngagement * 0.4), engagement: Math.floor(baseEngagement * 0.9) },
      { time: '12:00', mentions: Math.floor(baseEngagement * 0.6), engagement: Math.floor(baseEngagement * 1.2) },
      { time: '16:00', mentions: Math.floor(baseEngagement * 0.5), engagement: Math.floor(baseEngagement * 1.0) },
      { time: '20:00', mentions: Math.floor(baseEngagement * 0.7), engagement: Math.floor(baseEngagement * 1.5) }
    ];
  }, [analyticsData]);

  const platformData = useMemo(() => {
    if (!analyticsData?.platformBreakdown) return [];
    
    return Object.entries(analyticsData.platformBreakdown).map(([platform, metrics]) => ({
      platform,
      likes: metrics.likes || 0,
      comments: metrics.comments || 0,
      shares: metrics.shares || 0,
      reach: metrics.reach || 0
    }));
  }, [analyticsData]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Analytics Overview</h2>
        <p className="text-gray-300">Detailed insights into your social media performance</p>

        {/* Platform Selection */}
        <div className="mt-4 flex flex-wrap gap-2">
          {['Twitter', 'Instagram', 'Facebook', 'LinkedIn', 'Swish'].map(platform => (
            <label key={platform} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPlatforms.includes(platform)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedPlatforms([...selectedPlatforms, platform]);
                    console.log("Selected Platforms:", [...selectedPlatforms, platform]);
                  } else {
                    setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
                    console.log("Selected Platforms:", selectedPlatforms.filter(p => p !== platform));
                  }
                }}
                className="w-4 h-4 text-cyan-400 bg-black/60 border-white/20 rounded focus:ring-cyan-400"
              />
              <span className="text-gray-300 text-sm">{platform}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            title: 'Total Likes', 
            value: analyticsData?.likes ? analyticsData.likes.toLocaleString() : '0', 
            change: analyticsData?.likes ? `+${calculateChange(analyticsData.likes, previousData?.likes || analyticsData.likes * 0.8)}%` : '0%',
            positive: true 
          },
          { 
            title: 'Total Comments', 
            value: analyticsData?.comments ? analyticsData.comments.toLocaleString() : '0', 
            change: analyticsData?.comments ? `+${calculateChange(analyticsData.comments, previousData?.comments || analyticsData.comments * 0.8)}%` : '0%',
            positive: true 
          },
          { 
            title: 'Total Shares', 
            value: analyticsData?.totalShares ? analyticsData.totalShares.toLocaleString() : '0', 
            change: analyticsData?.totalShares ? `+${calculateChange(analyticsData.totalShares, previousData?.totalShares || analyticsData.totalShares * 0.8)}%` : '0%',
            positive: true 
          },
          { 
            title: 'Reach', 
            value: analyticsData?.reach ? analyticsData.reach.toLocaleString() : '0', 
            change: analyticsData?.reach ? `+${calculateChange(analyticsData.reach, previousData?.reach || analyticsData.reach * 0.8)}%` : '0%',
            positive: true 
          },
          { 
            title: 'Engagement Rate', 
            value: analyticsData?.engagementRate ? `${analyticsData.engagementRate.toFixed(1)}%` : '0%', 
            change: analyticsData?.engagementRate ? `+${calculateChange(analyticsData.engagementRate, previousData?.engagementRate || analyticsData.engagementRate * 0.8)}%` : '0%',
            positive: true 
          }
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

      {loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center"
        >
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
          <p className="text-gray-300 mt-2">Loading analytics data...</p>
        </motion.div>
      )}

      {error && !loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="bg-red-500/20 border border-red-500/50 rounded-2xl p-6"
        >
          <p className="text-red-300">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg text-sm"
          >
            Retry
          </button>
        </motion.div>
      )}

      {!loading && !error && selectedPlatforms.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center"
        >
          <p className="text-gray-300 text-lg">Select platforms above to view analytics</p>
        </motion.div>
      )}

      {!loading && !error && analyticsData && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { title: 'Likes', value: analyticsData.likes?.toLocaleString() || '0', color: 'from-pink-500', icon: '❤️' },
              { title: 'Comments', value: analyticsData.comments?.toLocaleString() || '0', color: 'from-blue-500', icon: '💬' },
              { title: 'Shares', value: analyticsData.totalShares?.toLocaleString() || '0', color: 'from-green-500', icon: '🔄' },
              { title: 'Reach', value: analyticsData.reach?.toLocaleString() || '0', color: 'from-purple-500', icon: '👁️' },
              { title: 'Engagement', value: analyticsData.engagementRate ? `${analyticsData.engagementRate.toFixed(1)}%` : '0%', color: 'from-orange-500', icon: '📈' }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
              >
                <div className={`text-2xl mb-2`}>{metric.icon}</div>
                <h3 className="text-gray-300 text-sm mb-1">{metric.title}</h3>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
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
              <h3 className="text-xl font-bold text-white mb-4">
                Engagement Over Time <span className="text-sm text-gray-400">(derived)</span>
              </h3>
              {engagementData.length > 0 ? (
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
                      <Line type="monotone" dataKey="engagement" stroke="#06B6D4" strokeWidth={3} dot={false} />
                      <Line type="monotone" dataKey="mentions" stroke="#8B5CF6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-400">No data available</div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Platform Breakdown</h3>
              {platformData.length > 0 ? (
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
                      <Bar dataKey="likes" fill="#EC4899" name="Likes" />
                      <Bar dataKey="shares" fill="#10B981" name="Shares" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-400">
                  {selectedPlatforms.length === 1 ? `${selectedPlatforms[0]} data loading...` : 'Select one platform for breakdown'}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsPanel;
