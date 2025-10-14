import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ReportExport = ({ reportData, onExport }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    includeCharts: true,
    includeRawData: false,
    emailRecipients: '',
    schedule: 'none'
  });

  const formats = [
    { id: 'pdf', name: 'PDF Report', description: 'Professional formatted report', icon: 'FileText' },
    { id: 'excel', name: 'Excel Spreadsheet', description: 'Data with charts and tables', icon: 'FileSpreadsheet' },
    { id: 'powerpoint', name: 'PowerPoint', description: 'Presentation ready slides', icon: 'Presentation' },
    { id: 'csv', name: 'CSV Data', description: 'Raw data export', icon: 'Database' }
  ];

  const handleExport = () => {
    if (onExport) {
      onExport(exportConfig);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Export & Share</h2>
        <p className="text-gray-300">Export your reports and share with your team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Format Selection */}
        <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Export Format</h3>
          <div className="space-y-3">
            {formats.map((format) => (
              <motion.label
                key={format.id}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  exportConfig.format === format.id 
                    ? 'border-cyan-400 bg-cyan-400/10' 
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <input
                  type="radio"
                  name="format"
                  value={format.id}
                  checked={exportConfig.format === format.id}
                  onChange={(e) => setExportConfig({...exportConfig, format: e.target.value})}
                />
                <Icon name={format.icon} size={20} className="text-cyan-400" />
                <div>
                  <div className="text-white font-medium">{format.name}</div>
                  <div className="text-gray-400 text-sm">{format.description}</div>
                </div>
              </motion.label>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-6">
          <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Export Options</h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exportConfig.includeCharts}
                  onChange={(e) => setExportConfig({...exportConfig, includeCharts: e.target.checked})}
                  className="w-4 h-4 text-cyan-400 bg-black/60 border-white/20 rounded focus:ring-cyan-400"
                />
                <span className="text-gray-300">Include charts and visualizations</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exportConfig.includeRawData}
                  onChange={(e) => setExportConfig({...exportConfig, includeRawData: e.target.checked})}
                  className="w-4 h-4 text-cyan-400 bg-black/60 border-white/20 rounded focus:ring-cyan-400"
                />
                <span className="text-gray-300">Include raw data tables</span>
              </label>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Share via Email</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Recipients</label>
                <input
                  type="text"
                  value={exportConfig.emailRecipients}
                  onChange={(e) => setExportConfig({...exportConfig, emailRecipients: e.target.value})}
                  placeholder="Enter email addresses separated by commas"
                  className="w-full bg-black/60 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Schedule</label>
                <select
                  value={exportConfig.schedule}
                  onChange={(e) => setExportConfig({...exportConfig, schedule: e.target.value})}
                  className="w-full bg-black/60 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="none">Send once</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Actions */}
      <div className="flex justify-end space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 border border-white/20 text-white rounded-lg hover:border-white/40 transition-colors"
        >
          Preview
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExport}
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center space-x-2"
        >
          <Icon name="Download" size={20} />
          <span>Export Report</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ReportExport;