import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SocialMediaFeed = ({ filters, onUpdateFilters }) => {
  const [posts] = useState([
    {
      id: 1,
      platform: 'Twitter',
      author: 'Sarah Johnson',
      username: 'sarahj_tech',
      content: 'Just registered for Tech Conference 2024! Can\'t wait to see the latest innovations in AI and machine learning. #TechConf2024 #Innovation',
      timestamp: '2 hours ago',
      engagement: { likes: 45, comments: 12, shares: 8 },
      sentiment: 'positive'
    },
    {
      id: 2,
      platform: 'LinkedIn',
      author: 'Mike Chen',
      username: 'mikechen_dev',
      content: 'Looking forward to networking at Tech Conference 2024. Hope to connect with fellow developers and learn about emerging technologies.',
      timestamp: '4 hours ago',
      engagement: { likes: 23, comments: 7, shares: 5 },
      sentiment: 'positive'
    },
    {
      id: 3,
      platform: 'Instagram',
      author: 'Tech Enthusiast',
      username: 'techlover2024',
      content: 'The venue for Tech Conference 2024 looks amazing! Can\'t wait to share my experience.',
      timestamp: '6 hours ago',
      engagement: { likes: 67, comments: 15, shares: 12 },
      sentiment: 'positive'
    }
  ]);

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400 bg-green-500/20';
      case 'negative': return 'text-red-400 bg-red-500/20';
      default: return 'text-yellow-400 bg-yellow-500/20';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Live Social Media Feed</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm">Live</span>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                <Icon name="User" size={20} className="text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">{post.author}</span>
                    <span className="text-gray-400">@{post.username}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400 text-sm">{post.timestamp}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getSentimentColor(post.sentiment)}`}>
                      {post.sentiment}
                    </span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                      {post.platform}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4">{post.content}</p>
                
                <div className="flex items-center space-x-6 text-gray-400">
                  <button className="flex items-center space-x-2 hover:text-red-400 transition-colors">
                    <Icon name="Heart" size={16} />
                    <span>{post.engagement.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                    <Icon name="MessageCircle" size={16} />
                    <span>{post.engagement.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-green-400 transition-colors">
                    <Icon name="Share2" size={16} />
                    <span>{post.engagement.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaFeed;