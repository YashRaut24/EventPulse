import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const RecentMentions = ({ mentions }) => {
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-400 bg-green-500/20';
      case 'negative':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-yellow-400 bg-yellow-500/20';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return 'Twitter';
      case 'facebook':
        return 'Facebook';
      case 'instagram':
        return 'Instagram';
      case 'linkedin':
        return 'Linkedin';
      default:
        return 'MessageSquare';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return `${minutes}m ago`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Recent Mentions</h3>
          <p className="text-gray-300 text-sm">Latest social media mentions</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
        >
          View All
        </motion.button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {mentions.map((mention) => (
          <motion.div
            key={mention.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(6, 182, 212, 0.05)' }}
            className="p-4 border border-white/5 rounded-xl hover:border-cyan-400/20 transition-all duration-300"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={getPlatformIcon(mention.platform)} size={20} className="text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">{mention.author}</span>
                    <span className="text-gray-400 text-sm">@{mention.username}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(mention.sentiment)}`}>
                      {mention.sentiment}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">{formatTimestamp(mention.timestamp)}</span>
                </div>
                
                <p className="text-gray-300 text-sm mb-3 line-clamp-3">{mention.content}</p>
                
                <div className="flex items-center space-x-4 text-gray-400 text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={14} />
                    <span>{mention.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MessageCircle" size={14} />
                    <span>{mention.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Share2" size={14} />
                    <span>{mention.shares}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentMentions;