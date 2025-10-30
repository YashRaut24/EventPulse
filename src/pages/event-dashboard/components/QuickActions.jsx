import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onCreateCampaign, onGenerateReport, onConfigureAlerts, onViewAnalytics }) => {
  const handleCreateCampaign = () => {
    alert('Creating new social media campaign...');
    if (onCreateCampaign) onCreateCampaign();
  };

  const handleGenerateReport = () => {
    alert('Generating analytics report...');
    if (onGenerateReport) onGenerateReport();
  };

  const handleConfigureAlerts = () => {
    alert('Opening alert configuration...');
    if (onConfigureAlerts) onConfigureAlerts();
  };

  const handleViewAnalytics = () => {
    window.location.href = '/analytics-reports';
    if (onViewAnalytics) onViewAnalytics();
  };

  const actions = [
    {
      id: 'create-campaign',
      label: 'Create Campaign',
      description: 'Launch new social media campaign',
      icon: 'Plus',
      variant: 'default',
      onClick: handleCreateCampaign
    },
    {
      id: 'generate-report',
      label: 'Generate Report',
      description: 'Export analytics data',
      icon: 'FileText',
      variant: 'outline',
      onClick: handleGenerateReport
    },
    {
      id: 'configure-alerts',
      label: 'Configure Alerts',
      description: 'Set up notifications',
      icon: 'Bell',
      variant: 'outline',
      onClick: handleConfigureAlerts
    },
    {
      id: 'view-analytics',
      label: 'View Analytics',
      description: 'Detailed performance insights',
      icon: 'BarChart3',
      variant: 'secondary',
      onClick: handleViewAnalytics
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  ">
        {actions?.map((action) => (
          <div
          key={action?.id}
          onClick={action?.onClick}
          className="group transition-transform duration-300 ease-in-out hover:scale-105"
        >
  <Button
    variant={action?.variant}
    fullWidth
    iconName={action?.icon}
    iconPosition="left"
    className="h-auto p-4 flex-col items-start text-left bg-gradient-to-l from-sky-500 to"
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