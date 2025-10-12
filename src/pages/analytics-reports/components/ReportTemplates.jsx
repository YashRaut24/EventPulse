import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportTemplates = ({ onSelectTemplate }) => {
  const templates = [
    {
      id: 'event_performance',
      name: 'Event Performance',
      description: 'Comprehensive analysis of event engagement, reach, and conversion metrics',
      icon: 'Calendar',
      metrics: ['engagement_rate', 'reach', 'impressions', 'conversion_rate'],
      color: 'bg-blue-500'
    },
    {
      id: 'competitor_analysis',
      name: 'Competitor Analysis',
      description: 'Compare your performance against industry competitors and benchmarks',
      icon: 'TrendingUp',
      metrics: ['share_of_voice', 'engagement_rate', 'follower_growth'],
      color: 'bg-green-500'
    },
    {
      id: 'roi_assessment',
      name: 'ROI Assessment',
      description: 'Calculate return on investment for social media marketing campaigns',
      icon: 'DollarSign',
      metrics: ['conversion_rate', 'click_through_rate', 'reach', 'impressions'],
      color: 'bg-amber-500'
    },
    {
      id: 'sentiment_analysis',
      name: 'Sentiment Analysis',
      description: 'Track brand sentiment and audience perception across platforms',
      icon: 'Heart',
      metrics: ['sentiment_score', 'engagement_rate', 'reach'],
      color: 'bg-pink-500'
    },
    {
      id: 'audience_insights',
      name: 'Audience Insights',
      description: 'Deep dive into audience demographics, behavior, and preferences',
      icon: 'Users',
      metrics: ['follower_growth', 'engagement_rate', 'reach'],
      color: 'bg-purple-500'
    },
    {
      id: 'platform_comparison',
      name: 'Platform Comparison',
      description: 'Compare performance across different social media platforms',
      icon: 'BarChart2',
      metrics: ['engagement_rate', 'reach', 'impressions', 'click_through_rate'],
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Report Templates</h3>
          <p className="text-sm text-muted-foreground">Quick start with pre-built templates</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates?.map((template) => (
          <div
            key={template?.id}
            className="border border-border rounded-lg p-4 hover:shadow-soft transition-standard cursor-pointer group"
            onClick={() => onSelectTemplate(template)}
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className={`w-10 h-10 ${template?.color} rounded-lg flex items-center justify-center`}>
                <Icon name={template?.icon} size={20} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-standard">
                  {template?.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {template?.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {template?.metrics?.slice(0, 3)?.map((metric) => (
                <span
                  key={metric}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground"
                >
                  {metric?.replace('_', ' ')}
                </span>
              ))}
              {template?.metrics?.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                  +{template?.metrics?.length - 3} more
                </span>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="ArrowRight"
              iconPosition="right"
              onClick={(e) => {
                e?.stopPropagation();
                onSelectTemplate(template);
              }}
            >
              Use Template
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportTemplates;