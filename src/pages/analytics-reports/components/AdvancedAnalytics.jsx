import React, { useState } from 'react';
import { LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AdvancedAnalytics = () => {
  const [selectedAnalysis, setSelectedAnalysis] = useState('predictive');

  const analysisOptions = [
    { value: 'predictive', label: 'Predictive Modeling' },
    { value: 'segmentation', label: 'Audience Segmentation' },
    { value: 'viral', label: 'Viral Content Analysis' },
    { value: 'statistical', label: 'Statistical Significance' }
  ];

  // Mock predictive data
  const predictiveData = [
    { date: '2025-09-23', actual: 5200, predicted: 5100, confidence: 0.85 },
    { date: '2025-09-24', actual: null, predicted: 5400, confidence: 0.82 },
    { date: '2025-09-25', actual: null, predicted: 5800, confidence: 0.78 },
    { date: '2025-09-26', actual: null, predicted: 6200, confidence: 0.75 },
    { date: '2025-09-27', actual: null, predicted: 6800, confidence: 0.71 },
    { date: '2025-09-28', actual: null, predicted: 7200, confidence: 0.68 },
    { date: '2025-09-29', actual: null, predicted: 7600, confidence: 0.65 }
  ];

  // Mock segmentation data
  const segmentationData = [
    { segment: 'Tech Enthusiasts', size: 2500, engagement: 8.2, conversion: 4.1 },
    { segment: 'Business Professionals', size: 1800, engagement: 6.5, conversion: 5.8 },
    { segment: 'Students', size: 3200, engagement: 9.1, conversion: 2.3 },
    { segment: 'Entrepreneurs', size: 1200, engagement: 7.8, conversion: 6.2 },
    { segment: 'Researchers', size: 800, engagement: 5.9, conversion: 3.7 }
  ];

  // Mock viral content data
  const viralContent = [
    {
      id: 1,
      content: 'Behind-the-scenes video of event setup',
      platform: 'Instagram',
      reach: 45600,
      engagement: 12.8,
      shares: 892,
      viralScore: 94,
      peakTime: '2025-09-20 14:30'
    },
    {
      id: 2,
      content: 'Live Q&A session with keynote speaker',
      platform: 'LinkedIn',
      reach: 28400,
      engagement: 15.2,
      shares: 567,
      viralScore: 87,
      peakTime: '2025-09-19 10:15'
    },
    {
      id: 3,
      content: 'Event highlights reel with music',
      platform: 'TikTok',
      reach: 67800,
      engagement: 18.5,
      shares: 1234,
      viralScore: 96,
      peakTime: '2025-09-21 19:45'
    }
  ];

  const insights = [
    {
      type: 'prediction',
      title: 'Engagement Forecast',
      description: 'Expected 23% increase in engagement over the next 7 days based on current trends',
      confidence: 'High',
      icon: 'TrendingUp',
      color: 'text-success'
    },
    {
      type: 'audience',
      title: 'Audience Growth Pattern',
      description: 'Students segment shows highest engagement but lowest conversion rates',
      confidence: 'Medium',
      icon: 'Users',
      color: 'text-primary'
    },
    {
      type: 'content',
      title: 'Viral Content Indicator',
      description: 'Video content performs 340% better than static posts during peak hours',
      confidence: 'High',
      icon: 'Zap',
      color: 'text-accent'
    },
    {
      type: 'timing',
      title: 'Optimal Posting Time',
      description: 'Peak engagement occurs between 2-4 PM and 7-9 PM on weekdays',
      confidence: 'High',
      icon: 'Clock',
      color: 'text-warning'
    }
  ];

  const renderAnalysisContent = () => {
    switch (selectedAnalysis) {
      case 'predictive':
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Engagement Prediction Model</h4>
              <p className="text-sm text-muted-foreground">
                Using machine learning algorithms to forecast engagement trends based on historical data, 
                seasonal patterns, and current campaign performance.
              </p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={predictiveData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name="Actual"
                    connectNulls={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Predicted"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'segmentation':
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Audience Segmentation Analysis</h4>
              <p className="text-sm text-muted-foreground">
                Behavioral clustering of your audience based on engagement patterns, demographics, 
                and interaction preferences.
              </p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={segmentationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="engagement" name="Engagement Rate" stroke="#6B7280" />
                  <YAxis dataKey="conversion" name="Conversion Rate" stroke="#6B7280" />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px'
                    }}
                    formatter={(value, name) => [value + '%', name]}
                  />
                  <Scatter dataKey="size" fill="#3B82F6" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {segmentationData?.map((segment, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <h5 className="font-medium text-foreground mb-2">{segment?.segment}</h5>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-medium">{segment?.size?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Engagement:</span>
                      <span className="font-medium">{segment?.engagement}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Conversion:</span>
                      <span className="font-medium">{segment?.conversion}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'viral':
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Viral Content Analysis</h4>
              <p className="text-sm text-muted-foreground">
                Identification and analysis of content that achieved viral status, including 
                performance metrics and viral coefficient calculations.
              </p>
            </div>
            <div className="space-y-4">
              {viralContent?.map((content) => (
                <div key={content?.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground mb-1">{content?.content}</h5>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{content?.platform}</span>
                        <span>Peak: {content?.peakTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        content?.viralScore >= 95 ? 'bg-success' : 
                        content?.viralScore >= 90 ? 'bg-accent' : 'bg-primary'
                      }`}>
                        {content?.viralScore}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground block">Reach</span>
                      <span className="font-semibold">{content?.reach?.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Engagement</span>
                      <span className="font-semibold">{content?.engagement}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Shares</span>
                      <span className="font-semibold">{content?.shares?.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Viral Score</span>
                      <span className="font-semibold">{content?.viralScore}/100</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'statistical':
        return (
          <div className="space-y-6">
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Statistical Significance Testing</h4>
              <p className="text-sm text-muted-foreground">
                A/B testing results and statistical analysis to determine the significance 
                of performance differences across campaigns and content types.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-border rounded-lg p-4">
                <h5 className="font-medium text-foreground mb-3">Campaign A vs B Test</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Sample Size</span>
                    <span className="font-medium">10,000 users</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Confidence Level</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">P-value</span>
                    <span className="font-medium">0.023</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Result</span>
                    <span className="font-medium text-success">Significant</span>
                  </div>
                </div>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h5 className="font-medium text-foreground mb-3">Content Type Analysis</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Video vs Image</span>
                    <span className="font-medium text-success">+34% engagement</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Long vs Short Form</span>
                    <span className="font-medium text-warning">+12% engagement</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">With vs Without CTA</span>
                    <span className="font-medium text-success">+28% conversion</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Peak vs Off-peak</span>
                    <span className="font-medium text-success">+45% reach</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights?.map((insight, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 ${
                insight?.color === 'text-success' ? 'bg-success/10' :
                insight?.color === 'text-primary' ? 'bg-primary/10' :
                insight?.color === 'text-accent' ? 'bg-accent/10' : 'bg-warning/10'
              } rounded-lg flex items-center justify-center`}>
                <Icon name={insight?.icon} size={20} className={insight?.color} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-foreground">{insight?.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    insight?.confidence === 'High' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                  }`}>
                    {insight?.confidence}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{insight?.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Advanced Analysis */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Advanced Analytics</h3>
            <p className="text-sm text-muted-foreground">Deep dive into predictive and statistical analysis</p>
          </div>
          <Select
            options={analysisOptions}
            value={selectedAnalysis}
            onChange={setSelectedAnalysis}
            placeholder="Select analysis type"
            className="w-full lg:w-48 mt-4 lg:mt-0"
          />
        </div>

        {renderAnalysisContent()}

        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-border">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Analysis
          </Button>
          <Button variant="outline" iconName="Settings" iconPosition="left">
            Configure Model
          </Button>
          <Button variant="outline" iconName="RefreshCw" iconPosition="left">
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;