import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SocialMediaFeed = ({ filters, onUpdateFilters }) => {
  const [feedItems, setFeedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock social media feed data
  const mockFeedData = [
    {
      id: 1,
      platform: 'twitter',
      author: 'Sarah Johnson',
      username: '@sarahjohnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: `Just registered for the TechConf 2024! Can't wait to see the latest innovations in AI and machine learning. The speaker lineup looks incredible! #TechConf2024 #AI #Innovation`,timestamp: new Date(Date.now() - 300000),sentiment: 'positive',
      sentimentScore: 0.85,
      engagement: {
        likes: 24,
        shares: 8,
        comments: 5
      },
      isInfluencer: true,
      followerCount: 15000,
      hashtags: ['#TechConf2024', '#AI', '#Innovation'],
      mentions: ['@TechConf2024']
    },
    {
      id: 2,
      platform: 'linkedin',author: 'Michael Chen',username: 'michael-chen-tech',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: `Disappointed with the TechConf 2024 venue change. The new location is much harder to reach and parking seems limited. Hope the content makes up for the inconvenience.`,
      timestamp: new Date(Date.now() - 450000),
      sentiment: 'negative',
      sentimentScore: -0.65,
      engagement: {
        likes: 12,
        shares: 3,
        comments: 8
      },
      isInfluencer: false,
      followerCount: 2500,
      hashtags: ['#TechConf2024'],
      mentions: ['@TechConf2024']
    },
    {
      id: 3,
      platform: 'instagram',author: 'Emma Rodriguez',username: '@emmatech',avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',content: `Behind the scenes at TechConf 2024 setup! The stage looks amazing and the tech demos are going to be mind-blowing. See you all tomorrow! 🚀`,timestamp: new Date(Date.now() - 600000),sentiment: 'positive',
      sentimentScore: 0.92,
      engagement: {
        likes: 156,
        shares: 23,
        comments: 31
      },
      isInfluencer: true,
      followerCount: 45000,
      hashtags: ['#TechConf2024', '#BehindTheScenes'],
      mentions: ['@TechConf2024'],
      hasImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      platform: 'twitter',author: 'David Park',username: '@davidpark_dev',avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: `The TechConf 2024 mobile app is pretty decent. Easy navigation and good schedule integration. Could use better offline support though. Overall solid effort! 👍`,
      timestamp: new Date(Date.now() - 900000),
      sentiment: 'neutral',
      sentimentScore: 0.15,
      engagement: {
        likes: 18,
        shares: 4,
        comments: 7
      },
      isInfluencer: false,
      followerCount: 8500,
      hashtags: ['#TechConf2024', '#MobileApp'],
      mentions: ['@TechConf2024']
    },
    {
      id: 5,
      platform: 'facebook',author: 'Lisa Thompson',username: 'lisa.thompson.tech',avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      content: `Excited to be speaking at TechConf 2024! My session on "Future of Cloud Computing" is scheduled for 2 PM tomorrow. Looking forward to engaging discussions with fellow tech enthusiasts!`,
      timestamp: new Date(Date.now() - 1200000),
      sentiment: 'positive',
      sentimentScore: 0.78,
      engagement: {
        likes: 89,
        shares: 15,
        comments: 22
      },
      isInfluencer: true,
      followerCount: 32000,
      hashtags: ['#TechConf2024', '#CloudComputing', '#Speaking'],
      mentions: ['@TechConf2024']
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setFeedItems(mockFeedData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getPlatformIcon = (platform) => {
    const icons = {
      twitter: 'Twitter',
      linkedin: 'Linkedin',
      instagram: 'Instagram',
      facebook: 'Facebook'
    };
    return icons?.[platform] || 'MessageSquare';
  };

  const getPlatformColor = (platform) => {
    const colors = {
      twitter: 'text-blue-500',
      linkedin: 'text-blue-700',
      instagram: 'text-pink-500',
      facebook: 'text-blue-600'
    };
    return colors?.[platform] || 'text-gray-500';
  };

  const getSentimentColor = (sentiment) => {
    const colors = {
      positive: 'text-green-600 bg-green-50',
      negative: 'text-red-600 bg-red-50',
      neutral: 'text-yellow-600 bg-yellow-50'
    };
    return colors?.[sentiment] || 'text-gray-600 bg-gray-50';
  };

  const getSentimentIcon = (sentiment) => {
    const icons = {
      positive: 'ThumbsUp',
      negative: 'ThumbsDown',
      neutral: 'Minus'
    };
    return icons?.[sentiment] || 'Minus';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return timestamp?.toLocaleDateString();
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'k';
    }
    return num?.toString();
  };

  const handleQuickResponse = (itemId, action) => {
    console.log(`Quick response: ${action} for item ${itemId}`);
    // Handle quick response actions
  };

  const handleSentimentOverride = (itemId, newSentiment) => {
    setFeedItems(prev => prev?.map(item => 
      item?.id === itemId 
        ? { ...item, sentiment: newSentiment, sentimentOverridden: true }
        : item
    ));
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)]?.map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-muted rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="h-4 bg-muted rounded w-32"></div>
                  <div className="h-4 bg-muted rounded w-20"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-6 bg-muted rounded w-16"></div>
                  <div className="h-6 bg-muted rounded w-16"></div>
                  <div className="h-6 bg-muted rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedItems?.map((item) => (
        <div key={item?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-soft transition-standard">
          <div className="flex items-start space-x-4">
            {/* Avatar */}
            <div className="relative">
              <Image
                src={item?.avatar}
                alt={item?.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              {item?.isInfluencer && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="Star" size={12} color="white" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-foreground">{item?.author}</h4>
                  <span className="text-muted-foreground text-sm">@{item?.username}</span>
                  <Icon 
                    name={getPlatformIcon(item?.platform)} 
                    size={16} 
                    className={getPlatformColor(item?.platform)} 
                  />
                  {item?.isInfluencer && (
                    <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                      {formatNumber(item?.followerCount)} followers
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(item?.sentiment)}`}>
                    <Icon name={getSentimentIcon(item?.sentiment)} size={12} />
                    <span className="capitalize">{item?.sentiment}</span>
                    <span>({Math.abs(item?.sentimentScore)?.toFixed(2)})</span>
                  </div>
                  <span className="text-muted-foreground text-sm">{formatTimestamp(item?.timestamp)}</span>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-foreground leading-relaxed">{item?.content}</p>
                {item?.hasImage && (
                  <div className="mt-3">
                    <Image
                      src={item?.imageUrl}
                      alt="Post image"
                      className="w-full max-w-md h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Hashtags and Mentions */}
              {(item?.hashtags?.length > 0 || item?.mentions?.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {item?.hashtags?.map((hashtag, index) => (
                    <span key={index} className="text-primary text-sm hover:underline cursor-pointer">
                      {hashtag}
                    </span>
                  ))}
                  {item?.mentions?.map((mention, index) => (
                    <span key={index} className="text-secondary text-sm hover:underline cursor-pointer">
                      {mention}
                    </span>
                  ))}
                </div>
              )}

              {/* Engagement Metrics */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="Heart" size={16} />
                    <span className="text-sm">{formatNumber(item?.engagement?.likes)}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="Share" size={16} />
                    <span className="text-sm">{formatNumber(item?.engagement?.shares)}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="MessageCircle" size={16} />
                    <span className="text-sm">{formatNumber(item?.engagement?.comments)}</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Reply"
                    onClick={() => handleQuickResponse(item?.id, 'reply')}
                  >
                    Reply
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Flag"
                    onClick={() => handleQuickResponse(item?.id, 'flag')}
                  >
                    Flag
                  </Button>
                  
                  {/* Sentiment Override */}
                  <div className="relative group">
                    <Button variant="ghost" size="sm" iconName="Edit3">
                      Override
                    </Button>
                    <div className="absolute right-0 top-full mt-1 bg-popover border border-border rounded-lg shadow-modal p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-standard z-10">
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleSentimentOverride(item?.id, 'positive')}
                          className="p-1 rounded hover:bg-green-50 text-green-600"
                        >
                          <Icon name="ThumbsUp" size={14} />
                        </button>
                        <button
                          onClick={() => handleSentimentOverride(item?.id, 'neutral')}
                          className="p-1 rounded hover:bg-yellow-50 text-yellow-600"
                        >
                          <Icon name="Minus" size={14} />
                        </button>
                        <button
                          onClick={() => handleSentimentOverride(item?.id, 'negative')}
                          className="p-1 rounded hover:bg-red-50 text-red-600"
                        >
                          <Icon name="ThumbsDown" size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Load More */}
      <div className="text-center py-6">
        <Button variant="outline" iconName="RefreshCw">
          Load More Posts
        </Button>
      </div>
    </div>
  );
};

export default SocialMediaFeed;