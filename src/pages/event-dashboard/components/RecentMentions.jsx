import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentMentions = ({ mentions, title = "Recent Mentions" }) => {
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'text-success bg-success/10';
      case 'negative':
        return 'text-error bg-error/10';
      case 'neutral':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'ThumbsUp';
      case 'negative':
        return 'ThumbsDown';
      case 'neutral':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'Facebook': 'Facebook',
      'Twitter': 'Twitter',
      'Instagram': 'Instagram',
      'LinkedIn': 'Linkedin',
      'YouTube': 'Youtube',
      'TikTok': 'Music'
    };
    return icons?.[platform] || 'Globe';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const handleReply = (mentionId) => {
    console.log('Reply to mention:', mentionId);
  };

  const handleShare = (mentionId) => {
    console.log('Share mention:', mentionId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
          View All
        </Button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {mentions?.map((mention) => (
          <div key={mention?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-standard">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Icon name={getPlatformIcon(mention?.platform)} size={16} className="text-muted-foreground" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{mention?.author}</span>
                    <span className="text-xs text-muted-foreground">@{mention?.username}</span>
                    <div className={`px-2 py-1 rounded-full flex items-center space-x-1 ${getSentimentColor(mention?.sentiment)}`}>
                      <Icon name={getSentimentIcon(mention?.sentiment)} size={12} />
                      <span className="text-xs font-medium capitalize">{mention?.sentiment}</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatTimeAgo(mention?.timestamp)}</span>
                </div>
                
                <p className="text-sm text-foreground mb-3 line-clamp-3">{mention?.content}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={12} />
                      <span>{mention?.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={12} />
                      <span>{mention?.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Repeat" size={12} />
                      <span>{mention?.shares}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="xs" 
                      iconName="MessageCircle"
                      onClick={() => handleReply(mention?.id)}
                    >
                      Reply
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="xs" 
                      iconName="Share"
                      onClick={() => handleShare(mention?.id)}
                    >
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMentions;