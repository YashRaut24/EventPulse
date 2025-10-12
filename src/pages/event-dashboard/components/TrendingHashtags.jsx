import React from 'react';
import Icon from '../../../components/AppIcon';

const TrendingHashtags = ({ hashtags, title = "Trending Hashtags" }) => {
  const getTrendIcon = (trend) => {
    if (trend > 0) return { icon: 'TrendingUp', color: 'text-success' };
    if (trend < 0) return { icon: 'TrendingDown', color: 'text-error' };
    return { icon: 'Minus', color: 'text-muted-foreground' };
  };

  const formatTrend = (trend) => {
    if (trend === 0) return '0%';
    return `${trend > 0 ? '+' : ''}${trend}%`;
  };

  const getPopularityWidth = (mentions, maxMentions) => {
    return Math.max((mentions / maxMentions) * 100, 10);
  };

  const maxMentions = Math.max(...hashtags?.map(h => h?.mentions));

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Icon name="Hash" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {hashtags?.map((hashtag, index) => {
          const trendInfo = getTrendIcon(hashtag?.trend);
          const popularityWidth = getPopularityWidth(hashtag?.mentions, maxMentions);
          
          return (
            <div key={hashtag?.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-medium text-muted-foreground w-6">#{index + 1}</span>
                  <span className="text-sm font-medium text-primary cursor-pointer hover:underline">
                    #{hashtag?.tag}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">
                    {hashtag?.mentions?.toLocaleString()} mentions
                  </span>
                  <div className={`flex items-center space-x-1 ${trendInfo?.color}`}>
                    <Icon name={trendInfo?.icon} size={12} />
                    <span className="text-xs font-medium">{formatTrend(hashtag?.trend)}</span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${popularityWidth}%` }}
                />
              </div>
              {hashtag?.relatedEvents && hashtag?.relatedEvents?.length > 0 && (
                <div className="flex items-center space-x-2 mt-2">
                  <Icon name="Calendar" size={12} className="text-muted-foreground" />
                  <div className="flex flex-wrap gap-1">
                    {hashtag?.relatedEvents?.slice(0, 2)?.map((event, eventIndex) => (
                      <span key={eventIndex} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                        {event}
                      </span>
                    ))}
                    {hashtag?.relatedEvents?.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{hashtag?.relatedEvents?.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingHashtags;