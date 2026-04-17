import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SocialMediaFeed = ({ filters, onUpdateFilters }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Determine platforms to fetch based on filters
        let platformsToFetch = [];
        if (filters.platforms === 'all') {
          platformsToFetch = ['Twitter', 'Facebook', 'Instagram', 'LinkedIn'];
        } else {
          platformsToFetch = [filters.platforms.charAt(0).toUpperCase() + filters.platforms.slice(1)];
        }

        const response = await fetch(`/api/posts?platforms=${platformsToFetch.join(',')}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again.');
        // Fallback to empty array
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filters.platforms]);

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