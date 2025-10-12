import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const HistoricalComparison = () => {
  const [comparisonType, setComparisonType] = useState('year_over_year');
  const [selectedMetric, setSelectedMetric] = useState('engagement');

  const comparisonOptions = [
    { value: 'year_over_year', label: 'Year over Year' },
    { value: 'quarter_over_quarter', label: 'Quarter over Quarter' },
    { value: 'month_over_month', label: 'Month over Month' },
    { value: 'campaign_comparison', label: 'Campaign Comparison' }
  ];

  const metricOptions = [
    { value: 'engagement', label: 'Engagement Rate' },
    { value: 'reach', label: 'Reach' },
    { value: 'impressions', label: 'Impressions' },
    { value: 'conversions', label: 'Conversions' }
  ];

  // Mock historical data
  const yearOverYearData = [
    { period: 'Jan', current: 4200, previous: 3800, growth: 10.5 },
    { period: 'Feb', current: 3900, previous: 3600, growth: 8.3 },
    { period: 'Mar', current: 5100, previous: 4200, growth: 21.4 },
    { period: 'Apr', current: 4800, previous: 4100, growth: 17.1 },
    { period: 'May', current: 5600, previous: 4500, growth: 24.4 },
    { period: 'Jun', current: 6200, previous: 5100, growth: 21.6 },
    { period: 'Jul', current: 5800, previous: 4900, growth: 18.4 },
    { period: 'Aug', current: 6500, previous: 5300, growth: 22.6 },
    { period: 'Sep', current: 7100, previous: 5800, growth: 22.4 }
  ];

  const campaignComparisonData = [
    { campaign: 'Summer Launch', engagement: 8.2, reach: 45000, conversions: 1200, roi: 340 },
    { campaign: 'Fall Conference', engagement: 6.8, reach: 38000, conversions: 980, roi: 280 },
    { campaign: 'Holiday Special', engagement: 9.5, reach: 52000, conversions: 1450, roi: 420 },
    { campaign: 'New Year Event', engagement: 7.3, reach: 41000, conversions: 1100, roi: 310 },
    { campaign: 'Spring Workshop', engagement: 8.9, reach: 48000, conversions: 1350, roi: 380 }
  ];

  const trendAnalysis = [
    {
      metric: 'Engagement Rate',
      currentPeriod: '8.4%',
      previousPeriod: '6.9%',
      change: '+21.7%',
      trend: 'up',
      significance: 'high',
      description: 'Significant improvement in audience engagement across all platforms'
    },
    {
      metric: 'Reach',
      currentPeriod: '156.2K',
      previousPeriod: '142.8K',
      change: '+9.4%',
      trend: 'up',
      significance: 'medium',
      description: 'Steady growth in organic reach with improved content strategy'
    },
    {
      metric: 'Conversion Rate',
      currentPeriod: '3.2%',
      previousPeriod: '3.8%',
      change: '-15.8%',
      trend: 'down',
      significance: 'high',
      description: 'Decline in conversion rate requires optimization of call-to-action'
    },
    {
      metric: 'Cost per Acquisition',
      currentPeriod: '$24.50',
      previousPeriod: '$28.90',
      change: '-15.2%',
      trend: 'up',
      significance: 'medium',
      description: 'Improved efficiency in customer acquisition costs'
    }
  ];

  const renderComparisonChart = () => {
    if (comparisonType === 'campaign_comparison') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={campaignComparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="campaign" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px'
              }} 
            />
            <Legend />
            <Bar dataKey={selectedMetric} fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={yearOverYearData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="period" stroke="#6B7280" />
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
            dataKey="current" 
            stroke="#3B82F6" 
            strokeWidth={2}
            name="Current Period"
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="previous" 
            stroke="#6B7280" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Previous Period"
            dot={{ fill: '#6B7280', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="space-y-6">
      {/* Trend Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trendAnalysis?.map((trend, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground">{trend?.metric}</h4>
                <p className="text-xs text-muted-foreground mt-1">{trend?.description}</p>
              </div>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                trend?.significance === 'high' ?'bg-primary/10 text-primary' :'bg-warning/10 text-warning'
              }`}>
                <Icon name="TrendingUp" size={12} />
                <span>{trend?.significance}</span>
              </div>
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">{trend?.currentPeriod}</div>
                <div className="text-sm text-muted-foreground">vs {trend?.previousPeriod}</div>
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                trend?.trend === 'up' ? trend?.change?.startsWith('+') ? 'text-success' : 'text-destructive'
                  : trend?.change?.startsWith('-') ? 'text-success' : 'text-destructive'
              }`}>
                <Icon 
                  name={trend?.trend === 'up' ? 'ArrowUp' : 'ArrowDown'} 
                  size={14} 
                />
                <span>{trend?.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Historical Comparison Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Historical Comparison</h3>
            <p className="text-sm text-muted-foreground">Compare performance across different time periods</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
            <Select
              options={comparisonOptions}
              value={comparisonType}
              onChange={setComparisonType}
              placeholder="Comparison type"
              className="w-full sm:w-48"
            />
            <Select
              options={metricOptions}
              value={selectedMetric}
              onChange={setSelectedMetric}
              placeholder="Select metric"
              className="w-full sm:w-40"
            />
          </div>
        </div>

        <div className="h-80">
          {renderComparisonChart()}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-border">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Comparison
          </Button>
          <Button variant="outline" iconName="Calendar" iconPosition="left">
            Custom Date Range
          </Button>
          <Button variant="outline" iconName="Settings" iconPosition="left">
            Configure Metrics
          </Button>
        </div>
      </div>
      {/* Performance Insights */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Lightbulb" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Performance Insights</h3>
            <p className="text-sm text-muted-foreground">Key takeaways from historical analysis</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <h4 className="font-medium text-foreground">Best Performing Period</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              September 2025 showed the highest engagement rates with 22.4% growth year-over-year.
            </p>
            <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
              Seasonal Peak
            </span>
          </div>

          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <h4 className="font-medium text-foreground">Areas for Improvement</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Conversion rates have declined by 15.8% compared to the previous period, requiring attention.
            </p>
            <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded-full">
              Action Required
            </span>
          </div>

          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} className="text-primary" />
              <h4 className="font-medium text-foreground">Optimization Opportunity</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Cost per acquisition improved by 15.2%, indicating more efficient spending strategies.
            </p>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              Positive Trend
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalComparison;