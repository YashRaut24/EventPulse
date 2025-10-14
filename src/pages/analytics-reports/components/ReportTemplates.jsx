import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ReportTemplates = ({ onSelectTemplate }) => {
  const templates = [
    {
      id: 1,
      name: 'Weekly Performance Summary',
      description: 'Comprehensive weekly overview of all social media metrics',
      category: 'Performance',
      metrics: ['Engagement', 'Reach', 'Impressions', 'Growth'],
      platforms: ['All Platforms'],
      preview: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: 'Event Campaign Analysis',
      description: 'Detailed analysis of event-specific social media campaigns',
      category: 'Campaign',
      metrics: ['Event Mentions', 'Hashtag Performance', 'Sentiment'],
      platforms: ['Twitter', 'Instagram', 'Facebook'],
      preview: '/api/placeholder/300/200'
    },
    {
      id: 3,
      name: 'Competitor Benchmarking',
      description: 'Compare your performance against industry competitors',
      category: 'Competitive',
      metrics: ['Market Share', 'Engagement Rate', 'Growth Rate'],
      platforms: ['All Platforms'],
      preview: '/api/placeholder/300/200'
    },
    {
      id: 4,
      name: 'ROI & Conversion Report',
      description: 'Track return on investment and conversion metrics',
      category: 'Business',
      metrics: ['Conversions', 'ROI', 'Cost per Acquisition'],
      platforms: ['All Platforms'],
      preview: '/api/placeholder/300/200'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Report Templates</h2>
        <p className="text-gray-300">Choose from pre-built templates to get started quickly</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-300 cursor-pointer"
            onClick={() => onSelectTemplate && onSelectTemplate(template)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{template.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{template.description}</p>
                <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-medium">
                  {template.category}
                </span>
              </div>
              <Icon name="FileText" size={24} className="text-gray-400" />
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Included Metrics:</h4>
                <div className="flex flex-wrap gap-1">
                  {template.metrics.map((metric, idx) => (
                    <span key={idx} className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Platforms:</h4>
                <div className="flex flex-wrap gap-1">
                  {template.platforms.map((platform, idx) => (
                    <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTemplate && onSelectTemplate(template);
                }}
              >
                Use This Template
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReportTemplates;