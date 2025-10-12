import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const AlertsNotifications = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'sentiment',
      title: 'Negative Sentiment Spike',
      description: 'Negative sentiment increased by 45% in the last 2 hours',
      timestamp: new Date(Date.now() - 7200000),
      severity: 'high',
      isRead: false,
      data: { change: '+45%', current: '15%', previous: '10%' }
    },
    {
      id: 2,
      type: 'engagement',
      title: 'High Engagement Detected',
      description: 'Post by @sarahjohnson reached 1000+ engagements',
      timestamp: new Date(Date.now() - 3600000),
      severity: 'medium',
      isRead: false,
      data: { engagement: '1,247', author: '@sarahjohnson' }
    },
    {
      id: 3,
      type: 'competitor',
      title: 'Competitor Activity',
      description: 'TechSummit2024 mentioned your event in their latest post',
      timestamp: new Date(Date.now() - 1800000),
      severity: 'low',
      isRead: true,
      data: { competitor: 'TechSummit2024', mentions: 3 }
    },
    {
      id: 4,
      type: 'influencer',
      title: 'Influencer Mention',
      description: 'Tech influencer with 50k followers mentioned your event',
      timestamp: new Date(Date.now() - 900000),
      severity: 'medium',
      isRead: false,
      data: { influencer: 'Emma Rodriguez', followers: '50k' }
    }
  ]);

  const [alertSettings, setAlertSettings] = useState({
    sentimentThreshold: -0.3,
    engagementThreshold: 500,
    influencerFollowerThreshold: 10000,
    emailNotifications: true,
    pushNotifications: true,
    slackIntegration: false
  });

  const [showSettings, setShowSettings] = useState(false);

  const alertTypeOptions = [
    { value: 'sentiment', label: 'Sentiment Changes' },
    { value: 'engagement', label: 'Engagement Spikes' },
    { value: 'competitor', label: 'Competitor Activity' },
    { value: 'influencer', label: 'Influencer Mentions' },
    { value: 'hashtag', label: 'Hashtag Trends' }
  ];

  const severityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

  const getAlertIcon = (type) => {
    const icons = {
      sentiment: 'TrendingDown',
      engagement: 'TrendingUp',
      competitor: 'Eye',
      influencer: 'Star',
      hashtag: 'Hash'
    };
    return icons?.[type] || 'Bell';
  };

  const getAlertColor = (severity) => {
    const colors = {
      high: 'text-red-600 bg-red-50 border-red-200',
      medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      low: 'text-blue-600 bg-blue-50 border-blue-200'
    };
    return colors?.[severity] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return timestamp?.toLocaleDateString();
    }
  };

  const handleMarkAsRead = (alertId) => {
    setAlerts(prev => prev?.map(alert => 
      alert?.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const handleDeleteAlert = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
  };

  const handleMarkAllAsRead = () => {
    setAlerts(prev => prev?.map(alert => ({ ...alert, isRead: true })));
  };

  const handleSettingChange = (key, value) => {
    setAlertSettings(prev => ({ ...prev, [key]: value }));
  };

  const unreadCount = alerts?.filter(alert => !alert?.isRead)?.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-foreground">Alerts & Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="CheckCheck"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark All Read
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            onClick={() => setShowSettings(!showSettings)}
          >
            Settings
          </Button>
        </div>
      </div>
      {/* Alert Settings */}
      {showSettings && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-foreground mb-4">Alert Settings</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thresholds */}
            <div className="space-y-4">
              <h5 className="font-medium text-foreground">Alert Thresholds</h5>
              
              <Input
                type="number"
                label="Sentiment Threshold"
                description="Alert when sentiment drops below this value"
                value={alertSettings?.sentimentThreshold}
                onChange={(e) => handleSettingChange('sentimentThreshold', parseFloat(e?.target?.value))}
                step="0.1"
                min="-1"
                max="1"
              />
              
              <Input
                type="number"
                label="Engagement Threshold"
                description="Alert when engagement exceeds this number"
                value={alertSettings?.engagementThreshold}
                onChange={(e) => handleSettingChange('engagementThreshold', parseInt(e?.target?.value))}
                min="0"
              />
              
              <Input
                type="number"
                label="Influencer Follower Threshold"
                description="Alert for influencers with more followers than this"
                value={alertSettings?.influencerFollowerThreshold}
                onChange={(e) => handleSettingChange('influencerFollowerThreshold', parseInt(e?.target?.value))}
                min="0"
              />
            </div>

            {/* Notification Preferences */}
            <div className="space-y-4">
              <h5 className="font-medium text-foreground">Notification Preferences</h5>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={alertSettings?.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e?.target?.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <label htmlFor="emailNotifications" className="text-sm text-foreground">
                    Email Notifications
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="pushNotifications"
                    checked={alertSettings?.pushNotifications}
                    onChange={(e) => handleSettingChange('pushNotifications', e?.target?.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <label htmlFor="pushNotifications" className="text-sm text-foreground">
                    Push Notifications
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="slackIntegration"
                    checked={alertSettings?.slackIntegration}
                    onChange={(e) => handleSettingChange('slackIntegration', e?.target?.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <label htmlFor="slackIntegration" className="text-sm text-foreground">
                    Slack Integration
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button variant="default">
              Save Settings
            </Button>
          </div>
        </div>
      )}
      {/* Alerts List */}
      <div className="space-y-3">
        {alerts?.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No Alerts</h4>
            <p className="text-muted-foreground">You're all caught up! New alerts will appear here.</p>
          </div>
        ) : (
          alerts?.map((alert) => (
            <div
              key={alert?.id}
              className={`border rounded-lg p-4 transition-standard ${
                alert?.isRead 
                  ? 'bg-card border-border' 
                  : `${getAlertColor(alert?.severity)} border-l-4`
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    alert?.isRead ? 'bg-muted' : getAlertColor(alert?.severity)?.split(' ')?.[1]
                  }`}>
                    <Icon 
                      name={getAlertIcon(alert?.type)} 
                      size={20} 
                      className={alert?.isRead ? 'text-muted-foreground' : getAlertColor(alert?.severity)?.split(' ')?.[0]}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-semibold ${alert?.isRead ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {alert?.title}
                      </h4>
                      {!alert?.isRead && (
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                      )}
                    </div>
                    <p className={`text-sm mb-2 ${alert?.isRead ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {alert?.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{formatTimestamp(alert?.timestamp)}</span>
                      <span className="capitalize">{alert?.severity} priority</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {!alert?.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Check"
                      onClick={() => handleMarkAsRead(alert?.id)}
                    >
                      Mark Read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => handleDeleteAlert(alert?.id)}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" iconName="Plus" className="justify-start">
            Create Custom Alert
          </Button>
          <Button variant="outline" iconName="Download" className="justify-start">
            Export Alert History
          </Button>
          <Button variant="outline" iconName="Zap" className="justify-start">
            Test Notifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertsNotifications;