import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    sentimentAlerts: true,
    engagementThreshold: true,
    weeklyReports: true,
    monthlyReports: true,
    campaignUpdates: true,
    systemUpdates: false,
    marketingEmails: false
  });

  const [frequencies, setFrequencies] = useState({
    sentimentAlerts: 'immediate',
    engagementThreshold: 'hourly',
    weeklyReports: 'monday',
    monthlyReports: 'first'
  });

  const [thresholds, setThresholds] = useState({
    engagementDrop: '20',
    sentimentScore: '3.0',
    mentionSpike: '50'
  });

  const [isSaving, setIsSaving] = useState(false);

  const frequencyOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'hourly', label: 'Every Hour' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' }
  ];

  const weeklyOptions = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' }
  ];

  const monthlyOptions = [
    { value: 'first', label: '1st of the month' },
    { value: 'fifteenth', label: '15th of the month' },
    { value: 'last', label: 'Last day of the month' }
  ];

  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleFrequencyChange = (key, value) => {
    setFrequencies(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleThresholdChange = (key, value) => {
    setThresholds(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  return (
    <div className="space-y-8">
      {/* Notification Channels */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Notification Channels</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={20} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
            </div>
            <Checkbox
              checked={notifications?.emailNotifications}
              onChange={(e) => handleNotificationChange('emailNotifications', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Bell" size={20} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Browser push notifications</p>
              </div>
            </div>
            <Checkbox
              checked={notifications?.pushNotifications}
              onChange={(e) => handleNotificationChange('pushNotifications', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="MessageSquare" size={20} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">Critical alerts via SMS</p>
              </div>
            </div>
            <Checkbox
              checked={notifications?.smsNotifications}
              onChange={(e) => handleNotificationChange('smsNotifications', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Alert Preferences */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Alert Preferences</h3>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Sentiment Changes</p>
                <p className="text-sm text-muted-foreground">Get notified when sentiment drops below threshold</p>
              </div>
              <Checkbox
                checked={notifications?.sentimentAlerts}
                onChange={(e) => handleNotificationChange('sentimentAlerts', e?.target?.checked)}
              />
            </div>
            {notifications?.sentimentAlerts && (
              <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Frequency"
                  options={frequencyOptions}
                  value={frequencies?.sentimentAlerts}
                  onChange={(value) => handleFrequencyChange('sentimentAlerts', value)}
                />
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Sentiment Score Threshold
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={thresholds?.sentimentScore}
                    onChange={(e) => handleThresholdChange('sentimentScore', e?.target?.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Engagement Threshold Alerts</p>
                <p className="text-sm text-muted-foreground">Alert when engagement drops significantly</p>
              </div>
              <Checkbox
                checked={notifications?.engagementThreshold}
                onChange={(e) => handleNotificationChange('engagementThreshold', e?.target?.checked)}
              />
            </div>
            {notifications?.engagementThreshold && (
              <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Frequency"
                  options={frequencyOptions}
                  value={frequencies?.engagementThreshold}
                  onChange={(value) => handleFrequencyChange('engagementThreshold', value)}
                />
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Engagement Drop Threshold (%)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    value={thresholds?.engagementDrop}
                    onChange={(e) => handleThresholdChange('engagementDrop', e?.target?.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Report Delivery */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Report Delivery</h3>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Weekly Reports</p>
                <p className="text-sm text-muted-foreground">Comprehensive weekly analytics summary</p>
              </div>
              <Checkbox
                checked={notifications?.weeklyReports}
                onChange={(e) => handleNotificationChange('weeklyReports', e?.target?.checked)}
              />
            </div>
            {notifications?.weeklyReports && (
              <div className="ml-6">
                <Select
                  label="Delivery Day"
                  options={weeklyOptions}
                  value={frequencies?.weeklyReports}
                  onChange={(value) => handleFrequencyChange('weeklyReports', value)}
                  className="max-w-xs"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Monthly Reports</p>
                <p className="text-sm text-muted-foreground">Detailed monthly performance analysis</p>
              </div>
              <Checkbox
                checked={notifications?.monthlyReports}
                onChange={(e) => handleNotificationChange('monthlyReports', e?.target?.checked)}
              />
            </div>
            {notifications?.monthlyReports && (
              <div className="ml-6">
                <Select
                  label="Delivery Date"
                  options={monthlyOptions}
                  value={frequencies?.monthlyReports}
                  onChange={(value) => handleFrequencyChange('monthlyReports', value)}
                  className="max-w-xs"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Other Notifications */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Other Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Campaign Updates</p>
              <p className="text-sm text-muted-foreground">Updates about your active campaigns</p>
            </div>
            <Checkbox
              checked={notifications?.campaignUpdates}
              onChange={(e) => handleNotificationChange('campaignUpdates', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">System Updates</p>
              <p className="text-sm text-muted-foreground">Platform updates and maintenance notices</p>
            </div>
            <Checkbox
              checked={notifications?.systemUpdates}
              onChange={(e) => handleNotificationChange('systemUpdates', e?.target?.checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Marketing Emails</p>
              <p className="text-sm text-muted-foreground">Product updates and promotional content</p>
            </div>
            <Checkbox
              checked={notifications?.marketingEmails}
              onChange={(e) => handleNotificationChange('marketingEmails', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
          onClick={handleSave}
        >
          Save Notification Preferences
        </Button>
      </div>
    </div>
  );
};

export default NotificationsTab;