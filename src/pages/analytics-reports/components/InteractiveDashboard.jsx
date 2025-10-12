import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const InteractiveDashboard = ({ reportData }) => {
  const [selectedMetric, setSelectedMetric] = useState('engagement_rate');
  const [chartType, setChartType] = useState('line');
  const [timeframe, setTimeframe] = useState('7d');

  // Mock data for different metrics
  const mockData = {
    engagement_rate: [
      { date: '2025-09-16', value: 4.2, platform: 'Facebook' },
      { date: '2025-09-17', value: 3.8, platform: 'Facebook' },
      { date: '2025-09-18', value: 5.1, platform: 'Facebook' },
      { date: '2025-09-19', value: 4.7, platform: 'Facebook' },
      { date: '2025-09-20', value: 6.2, platform: 'Facebook' },
      { date: '2025-09-21', value: 5.9, platform: 'Facebook' },
      { date: '2025-09-22', value: 7.1, platform: 'Facebook' }
    ],
    reach: [
      { date: '2025-09-16', value: 12500, platform: 'Instagram' },
      { date: '2025-09-17', value: 13200, platform: 'Instagram' },
      { date: '2025-09-18', value: 15800, platform: 'Instagram' },
      { date: '2025-09-19', value: 14600, platform: 'Instagram' },
      { date: '2025-09-20', value: 18900, platform: 'Instagram' },
      { date: '2025-09-21', value: 17400, platform: 'Instagram' },
      { date: '2025-09-22', value: 21300, platform: 'Instagram' }
    ],
    sentiment_score: [
      { date: '2025-09-16', value: 0.72, platform: 'Twitter' },
      { date: '2025-09-17', value: 0.68, platform: 'Twitter' },
      { date: '2025-09-18', value: 0.81, platform: 'Twitter' },
      { date: '2025-09-19', value: 0.75, platform: 'Twitter' },
      { date: '2025-09-20', value: 0.89, platform: 'Twitter' },
      { date: '2025-09-21', value: 0.84, platform: 'Twitter' },
      { date: '2025-09-22', value: 0.92, platform: 'Twitter' }
    ]
  };

  const platformData = [
    { name: 'Facebook', value: 35, color: '#1877F2' },
    { name: 'Instagram', value: 28, color: '#E4405F' },
    { name: 'Twitter', value: 22, color: '#1DA1F2' },
    { name: 'LinkedIn', value: 15, color: '#0A66C2' }
  ];

  const kpiData = [
    {
      title: 'Total Engagement',
      value: '24.7K',
      change: '+12.5%',
      trend: 'up',
      icon: 'Heart',
      color: 'text-success'
    },
    {
      title: 'Reach',
      value: '156.2K',
      change: '+8.3%',
      trend: 'up',
      icon: 'Eye',
      color: 'text-primary'
    },
    {
      title: 'Sentiment Score',
      value: '0.84',
      change: '+0.12',
      trend: 'up',
      icon: 'Smile',
      color: 'text-accent'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-0.5%',
      trend: 'down',
      icon: 'Target',
      color: 'text-warning'
    }
  ];

  const metricOptions = [
    { value: 'engagement_rate', label: 'Engagement Rate' },
    { value: 'reach', label: 'Reach' },
    { value: 'sentiment_score', label: 'Sentiment Score' }
  ];

  const chartTypeOptions = [
    { value: 'line', label: 'Line Chart' },
    { value: 'bar', label: 'Bar Chart' },
    { value: 'pie', label: 'Pie Chart' }
  ];

  const timeframeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const renderChart = () => {
    const data = mockData?.[selectedMetric] || [];
    
    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
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
              dataKey="value" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
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
            <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={platformData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {platformData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData?.map((kpi, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 ${kpi?.color === 'text-success' ? 'bg-success/10' : 
                kpi?.color === 'text-primary' ? 'bg-primary/10' : 
                kpi?.color === 'text-accent' ? 'bg-accent/10' : 'bg-warning/10'} rounded-lg flex items-center justify-center`}>
                <Icon name={kpi?.icon} size={16} className={kpi?.color} />
              </div>
              <span className={`text-sm font-medium ${kpi?.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                {kpi?.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{kpi?.value}</div>
            <div className="text-sm text-muted-foreground">{kpi?.title}</div>
          </div>
        ))}
      </div>
      {/* Chart Controls */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Interactive Analytics</h3>
            <p className="text-sm text-muted-foreground">Drill down into your performance metrics</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
            <Select
              options={metricOptions}
              value={selectedMetric}
              onChange={setSelectedMetric}
              placeholder="Select metric"
              className="w-full sm:w-40"
            />
            <Select
              options={chartTypeOptions}
              value={chartType}
              onChange={setChartType}
              placeholder="Chart type"
              className="w-full sm:w-32"
            />
            <Select
              options={timeframeOptions}
              value={timeframe}
              onChange={setTimeframe}
              placeholder="Timeframe"
              className="w-full sm:w-36"
            />
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-80">
          {renderChart()}
        </div>

        {/* Chart Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-border">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Chart
          </Button>
          <Button variant="outline" iconName="Share" iconPosition="left">
            Share
          </Button>
          <Button variant="outline" iconName="Maximize2" iconPosition="left">
            Full Screen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDashboard;