import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReportBuilder = ({ onGenerateReport }) => {
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [visualizationType, setVisualizationType] = useState('chart');
  const [reportName, setReportName] = useState('');

  const metricOptions = [
    { value: 'engagement_rate', label: 'Engagement Rate', description: 'Likes, comments, shares per post' },
    { value: 'reach', label: 'Reach', description: 'Total unique users reached' },
    { value: 'impressions', label: 'Impressions', description: 'Total times content was displayed' },
    { value: 'sentiment_score', label: 'Sentiment Score', description: 'Overall sentiment analysis' },
    { value: 'follower_growth', label: 'Follower Growth', description: 'New followers gained' },
    { value: 'click_through_rate', label: 'Click-through Rate', description: 'Clicks per impression' },
    { value: 'conversion_rate', label: 'Conversion Rate', description: 'Actions completed per click' },
    { value: 'share_of_voice', label: 'Share of Voice', description: 'Brand mentions vs competitors' }
  ];

  const visualizationOptions = [
    { value: 'chart', label: 'Interactive Charts' },
    { value: 'table', label: 'Data Tables' },
    { value: 'infographic', label: 'Infographics' },
    { value: 'dashboard', label: 'Dashboard View' }
  ];

  const handleMetricChange = (metric, checked) => {
    if (checked) {
      setSelectedMetrics([...selectedMetrics, metric]);
    } else {
      setSelectedMetrics(selectedMetrics?.filter(m => m !== metric));
    }
  };

  const handleGenerateReport = () => {
    const reportConfig = {
      name: reportName,
      metrics: selectedMetrics,
      dateRange,
      visualizationType,
      timestamp: new Date()?.toISOString()
    };
    onGenerateReport(reportConfig);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="BarChart3" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Report Builder</h3>
          <p className="text-sm text-muted-foreground">Create custom analytics reports</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Report Name */}
        <Input
          label="Report Name"
          type="text"
          placeholder="Enter report name"
          value={reportName}
          onChange={(e) => setReportName(e?.target?.value)}
          required
        />

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={dateRange?.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e?.target?.value })}
            required
          />
          <Input
            label="End Date"
            type="date"
            value={dateRange?.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e?.target?.value })}
            required
          />
        </div>

        {/* Metrics Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Select Metrics
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {metricOptions?.map((metric) => (
              <Checkbox
                key={metric?.value}
                label={metric?.label}
                description={metric?.description}
                checked={selectedMetrics?.includes(metric?.value)}
                onChange={(e) => handleMetricChange(metric?.value, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Visualization Type */}
        <Select
          label="Visualization Type"
          options={visualizationOptions}
          value={visualizationType}
          onChange={setVisualizationType}
          placeholder="Select visualization type"
        />

        {/* Generate Button */}
        <div className="flex justify-end pt-4">
          <Button
            variant="default"
            onClick={handleGenerateReport}
            disabled={!reportName || selectedMetrics?.length === 0 || !dateRange?.start || !dateRange?.end}
            iconName="Play"
            iconPosition="left"
          >
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;