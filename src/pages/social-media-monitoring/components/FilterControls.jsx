import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ filters, onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const platforms = ['All', 'Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'YouTube'];
  const sentiments = ['All', 'Positive', 'Negative', 'Neutral'];
  const timeRanges = ['1h', '6h', '24h', '7d', '30d'];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Filters</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Platform Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
          <select
            value={filters.platforms}
            onChange={(e) => handleFilterChange('platforms', e.target.value)}
            className="w-full bg-black/60 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
          >
            {platforms.map(platform => (
              <option key={platform} value={platform.toLowerCase()}>
                {platform}
              </option>
            ))}
          </select>
        </div>

        {/* Sentiment Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Sentiment</label>
          <select
            value={filters.sentiment}
            onChange={(e) => handleFilterChange('sentiment', e.target.value)}
            className="w-full bg-black/60 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
          >
            {sentiments.map(sentiment => (
              <option key={sentiment} value={sentiment.toLowerCase()}>
                {sentiment}
              </option>
            ))}
          </select>
        </div>

        {/* Time Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Time Range</label>
          <select
            value={filters.timeRange}
            onChange={(e) => handleFilterChange('timeRange', e.target.value)}
            className="w-full bg-black/60 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
          >
            {timeRanges.map(range => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Keywords</label>
          <input
            type="text"
            placeholder="Add keywords..."
            className="w-full bg-black/60 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-white/10 pt-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.influencersOnly}
                onChange={(e) => handleFilterChange('influencersOnly', e.target.checked)}
                className="w-4 h-4 text-cyan-400 bg-black/60 border-white/20 rounded focus:ring-cyan-400"
              />
              <span className="text-gray-300">Influencers only</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.hasMedia}
                onChange={(e) => handleFilterChange('hasMedia', e.target.checked)}
                className="w-4 h-4 text-cyan-400 bg-black/60 border-white/20 rounded focus:ring-cyan-400"
              />
              <span className="text-gray-300">Has media</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.verifiedOnly}
                onChange={(e) => handleFilterChange('verifiedOnly', e.target.checked)}
                className="w-4 h-4 text-cyan-400 bg-black/60 border-white/20 rounded focus:ring-cyan-400"
              />
              <span className="text-gray-300">Verified accounts only</span>
            </label>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FilterControls;