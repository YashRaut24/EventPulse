import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onCreateCampaign, onGenerateReport, onConfigureAlerts, onViewAnalytics }) => {
  const actions = [
    {
      id: 'create-campaign',
      label: 'Create Campaign',
      description: 'Launch new social media campaign',
      icon: 'Plus',
      variant: 'default',
      onClick: onCreateCampaign
    },
    {
      id: 'generate-report',
      label: 'Generate Report',
      description: 'Export analytics data',
      icon: 'FileText',
      variant: 'outline',
      onClick: onGenerateReport
    },
    {
      id: 'configure-alerts',
      label: 'Configure Alerts',
      description: 'Set up notifications',
      icon: 'Bell',
      variant: 'outline',
      onClick: onConfigureAlerts
    },
    {
      id: 'view-analytics',
      label: 'View Analytics',
      description: 'Detailed performance insights',
      icon: 'BarChart3',
      variant: 'secondary',
      onClick: onViewAnalytics
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <div key={action?.id} className="group">
            <Button
              variant={action?.variant}
              fullWidth
              iconName={action?.icon}
              iconPosition="left"
              onClick={action?.onClick}
              className="h-auto p-4 flex-col items-start text-left"
            >
              <div className="w-full">
                <div className="font-medium text-sm mb-1">{action?.label}</div>
                <div className="text-xs opacity-75">{action?.description}</div>
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;