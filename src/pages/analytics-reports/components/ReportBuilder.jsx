import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ReportBuilder = ({ onGenerateReport }) => {
  const [reportConfig, setReportConfig] = useState({
    name: '',
    type: 'performance',
    dateRange: '30d',
    platforms: [],
    metrics: [],
    format: 'pdf'
  });

  const reportTypes = [
    { id: 'performance', name: 'Performance Report', description: 'Overall social media performance metrics' },
    { id: 'engagement', name: 'Engagement Analysis', description: 'Detailed engagement patterns and trends' },
    { id: 'competitor', name: 'Competitor Analysis', description: 'Compare performance with competitors' },
    { id: 'roi', name: 'ROI Assessment', description: 'Return on investment analysis' }
  ];

  const platforms = ['Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'YouTube'];
  const metrics = ['Engagement Rate', 'Reach', 'Impressions', 'Clicks', 'Conversions', 'Sentiment'];
  const formats = ['PDF', 'Excel', 'PowerPoint', 'CSV'];

  const handleGenerate = () => {
    if (onGenerateReport) {
      onGenerateReport(reportConfig);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Report Builder</h2>
        <p className="text-gray-300">Create custom analytics reports tailored to your needs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Configuration */}
        <div className="space-y-6">
          {/* Report Name */}
          <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Report Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Report Name</label>
                <input
                  type="text"
                  value={reportConfig.name}
                  onChange={(e) => setReportConfig({...reportConfig, name: e.target.value})}
                  placeholder="Enter report name..."
                  className="w-full bg-black/60 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date Range</label>
                <select
                  value={reportConfig.dateRange}
                  onChange={(e) => setReportConfig({...reportConfig, dateRange: e.target.value})}
                  className="w-full bg-black/60 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="3m">Last 3 months</option>
                  <option value="6m">Last 6 months</option>
                  <option value="1y">Last year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Report Type */}
          <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Report Type</h3>
            <div className="space-y-3">
              {reportTypes.map((type) => (
                <motion.label
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                    reportConfig.type === type.id 
                      ? 'border-cyan-400 bg-cyan-400/10' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="reportType"
                    value={type.id}
                    checked={reportConfig.type === type.id}
                    onChange={(e) => setReportConfig({...reportConfig, type: e.target.value})}
                    className="mt-1"
                  />
                  <div>
                    <div className="text-white font-medium">{type.name}</div>
                    <div className="text-gray-400 text-sm">{type.description}</div>
                  </div>
                </motion.label>
              ))}
            </div>
          </div>
        </div>

        {/* Platforms and Metrics */}
        <div className="space-y-6">
          {/* Platforms */}
          <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Platforms</h3>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map((platform) => (
                <label key={platform} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={reportConfig.platforms.includes(platform)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setReportConfig({
                          ...reportConfig,
                          platforms: [...reportConfig.platforms, platform]
                        });
                      } else {
                        setReportConfig({
                          ...reportConfig,
                          platforms: reportConfig.platforms.filter(p => p !== platform)
                        });
                      }
                    }}
                    className="w-4 h-4 text-cyan-400 bg-black/60 border-white/20 rounded focus:ring-cyan-400"
                  />
                  <span className="text-gray-300">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Metrics</h3>
            <div className="grid grid-cols-1 gap-3">
              {metrics.map((metric) => (
                <label key={metric} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={reportConfig.metrics.includes(metric)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setReportConfig({
                          ...reportConfig,
                          metrics: [...reportConfig.metrics, metric]
                        });
                      } else {
                        setReportConfig({
                          ...reportConfig,
                          metrics: reportConfig.metrics.filter(m => m !== metric)
                        });
                      }
                    }}
                    className="w-4 h-4 text-cyan-400 bg-black/60 border-white/20 rounded focus:ring-cyan-400"
                  />
                  <span className="text-gray-300">{metric}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Export Format */}
          <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Export Format</h3>
            <div className="grid grid-cols-2 gap-3">
              {formats.map((format) => (
                <label key={format} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="format"
                    value={format.toLowerCase()}
                    checked={reportConfig.format === format.toLowerCase()}
                    onChange={(e) => setReportConfig({...reportConfig, format: e.target.value})}
                  />
                  <span className="text-gray-300">{format}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerate}
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center space-x-2"
        >
          <Icon name="FileText" size={20} />
          <span>Generate Report</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ReportBuilder;