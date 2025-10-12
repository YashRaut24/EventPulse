import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsPanel = () => {
  const [activeTab, setActiveTab] = useState('sentiment');

  // Mock analytics data
  const sentimentData = [
    { name: 'Positive', value: 65, count: 1247, color: '#10B981' },
    { name: 'Neutral', value: 25, count: 478, color: '#F59E0B' },
    { name: 'Negative', value: 10, count: 192, color: '#EF4444' }
  ];

  const engagementTrends = [
    { time: '00:00', engagement: 45, mentions: 12 },
    { time: '04:00', engagement: 32, mentions: 8 },
    { time: '08:00', engagement: 78, mentions: 24 },
    { time: '12:00', engagement: 156, mentions: 45 },
    { time: '16:00', engagement: 234, mentions: 67 },
    { time: '20:00', engagement: 189, mentions: 52 },
    { time: '24:00', engagement: 98, mentions: 28 }
  ];

  const platformData = [
    { platform: 'Twitter', mentions: 456, engagement: 2340, color: '#1DA1F2' },
    { platform: 'LinkedIn', mentions: 234, engagement: 1890, color: '#0077B5' },
    { platform: 'Instagram', mentions: 189, engagement: 3450, color: '#E4405F' },
    { platform: 'Facebook', mentions: 123, engagement: 1560, color: '#1877F2' }
  ];

  const viralContent = [
    {
      id: 1,
      content: `Just registered for the TechConf 2024! Can't wait to see the latest innovations...`,author: 'Sarah Johnson',
      platform: 'twitter',engagement: 1247,viralScore: 8.9,growth: '+234%'
    },
    {
      id: 2,
      content: `Behind the scenes at TechConf 2024 setup! The stage looks amazing...`,
      author: 'Emma Rodriguez',
      platform: 'instagram',engagement: 2156,viralScore: 9.2,growth: '+456%'
    },
    {
      id: 3,
      content: `Excited to be speaking at TechConf 2024! My session on "Future of Cloud Computing"...`,
      author: 'Lisa Thompson',
      platform: 'facebook',engagement: 1834,viralScore: 8.7,growth: '+189%'
    }
  ];

  const hashtagPerformance = [
    { hashtag: '#TechConf2024', usage: 1247, reach: 45000, engagement: 8.9 },
    { hashtag: '#AI', usage: 892, reach: 32000, engagement: 7.8 },
    { hashtag: '#Innovation', usage: 567, reach: 28000, engagement: 6.9 },
    { hashtag: '#CloudComputing', usage: 445, reach: 19000, engagement: 7.2 },
    { hashtag: '#MachineLearning', usage: 334, reach: 15000, engagement: 6.5 }
  ];

  const tabs = [
    { id: 'sentiment', label: 'Sentiment', icon: 'BarChart3' },
    { id: 'engagement', label: 'Engagement', icon: 'TrendingUp' },
    { id: 'platforms', label: 'Platforms', icon: 'Share2' },
    { id: 'viral', label: 'Viral Content', icon: 'Zap' },
    { id: 'hashtags', label: 'Hashtags', icon: 'Hash' }
  ];

  const renderSentimentAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-foreground mb-4">Sentiment Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {sentimentData?.map((item) => (
              <div key={item?.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item?.color }}></div>
                <span className="text-sm text-foreground">{item?.name}: {item?.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Metrics */}
        <div className="space-y-4">
          {sentimentData?.map((item) => (
            <div key={item?.name} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">{item?.name} Sentiment</span>
                <span className="text-2xl font-bold" style={{ color: item?.color }}>
                  {item?.count}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ width: `${item?.value}%`, backgroundColor: item?.color }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>{item?.value}% of total</span>
                <span>+12% vs last week</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEngagementTrends = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">24-Hour Engagement Trends</h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={engagementTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="time" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="engagement" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="mentions" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-foreground">Engagement</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-foreground">Mentions</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlatformAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">Platform Performance</h4>
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="platform" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="mentions" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="engagement" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {platformData?.map((platform) => (
            <div key={platform?.platform} className="text-center">
              <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: platform?.color }}>
                <Icon name="Share2" size={20} color="white" />
              </div>
              <h5 className="font-medium text-foreground">{platform?.platform}</h5>
              <p className="text-sm text-muted-foreground">{platform?.mentions} mentions</p>
              <p className="text-sm text-muted-foreground">{platform?.engagement} engagement</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderViralContent = () => (
    <div className="space-y-4">
      {viralContent?.map((content) => (
        <div key={content?.id} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <Icon name="Zap" size={16} color="white" />
              </div>
              <div>
                <h5 className="font-semibold text-foreground">{content?.author}</h5>
                <p className="text-sm text-muted-foreground capitalize">{content?.platform}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-accent">{content?.viralScore}</div>
              <div className="text-xs text-muted-foreground">Viral Score</div>
            </div>
          </div>
          
          <p className="text-foreground mb-4 line-clamp-2">{content?.content}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Heart" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{content?.engagement?.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <Icon name="TrendingUp" size={16} />
                <span className="text-sm font-medium">{content?.growth}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" iconName="ExternalLink">
              View Post
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderHashtagAnalysis = () => (
    <div className="bg-card border border-border rounded-lg p-6">
      <h4 className="text-lg font-semibold text-foreground mb-4">Hashtag Performance</h4>
      <div className="space-y-4">
        {hashtagPerformance?.map((hashtag, index) => (
          <div key={hashtag?.hashtag} className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                {index + 1}
              </div>
              <div>
                <h5 className="font-semibold text-primary">{hashtag?.hashtag}</h5>
                <p className="text-sm text-muted-foreground">
                  {hashtag?.usage} uses • {hashtag?.reach?.toLocaleString()} reach
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-foreground">{hashtag?.engagement}</div>
              <div className="text-xs text-muted-foreground">Engagement Rate</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button variant="outline" iconName="Plus">
          Suggest New Hashtags
        </Button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sentiment':
        return renderSentimentAnalysis();
      case 'engagement':
        return renderEngagementTrends();
      case 'platforms':
        return renderPlatformAnalysis();
      case 'viral':
        return renderViralContent();
      case 'hashtags':
        return renderHashtagAnalysis();
      default:
        return renderSentimentAnalysis();
    }
  };

  return (
    <div className="bg-background">
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-standard ${
              activeTab === tab?.id
                ? 'bg-card text-foreground shadow-soft'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AnalyticsPanel;