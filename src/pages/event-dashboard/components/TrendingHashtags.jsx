import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TrendingHashtags = ({ hashtags }) => {
  const getTrendIcon = (trend) => {
    if (trend > 0) return { icon: 'TrendingUp', color: 'text-green-400' };
    if (trend < 0) return { icon: 'TrendingDown', color: 'text-red-400' };
    return { icon: 'Minus', color: 'text-gray-400' };
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Trending Hashtags</h3>
          <p className="text-gray-300 text-sm">Popular hashtags for your event</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
        >
          Explore
        </motion.button>
      </div>

      <div className="space-y-3">
        {hashtags.map((hashtag, index) => {
          const trendData = getTrendIcon(hashtag.trend);
          
          return (
            <motion.div
              key={hashtag.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(139, 92, 246, 0.05)' }}
              className="p-4 border border-white/5 rounded-xl hover:border-purple-400/20 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">#{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">#{hashtag.tag}</h4>
                    <p className="text-gray-400 text-sm">{formatNumber(hashtag.mentions)} mentions</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center space-x-1 ${trendData.color}`}>
                    <Icon name={trendData.icon} size={16} />
                    <span className="text-sm font-medium">
                      {hashtag.trend > 0 ? '+' : ''}{hashtag.trend}%
                    </span>
                  </div>
                </div>
              </div>
              
              {hashtag.relatedEvents && hashtag.relatedEvents.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/5">
                  <p className="text-gray-400 text-xs mb-2">Related Events:</p>
                  <div className="flex flex-wrap gap-1">
                    {hashtag.relatedEvents.map((event, eventIndex) => (
                      <span
                        key={eventIndex}
                        className="px-2 py-1 bg-white/5 text-gray-300 text-xs rounded-full"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 p-3 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:border-white/20 transition-colors"
      >
        View All Hashtags
      </motion.button>
    </motion.div>
  );
};

export default TrendingHashtags;