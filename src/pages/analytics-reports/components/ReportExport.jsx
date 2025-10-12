import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReportExport = ({ reportData, onExport }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRawData, setIncludeRawData] = useState(false);
  const [scheduledDelivery, setScheduledDelivery] = useState(false);
  const [deliveryFrequency, setDeliveryFrequency] = useState('weekly');
  const [recipientEmails, setRecipientEmails] = useState('');

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report', description: 'Professional formatted document' },
    { value: 'excel', label: 'Excel Spreadsheet', description: 'Data with charts and tables' },
    { value: 'csv', label: 'CSV Data', description: 'Raw data for analysis' },
    { value: 'powerpoint', label: 'PowerPoint', description: 'Presentation ready slides' }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const scheduledReports = [
    {
      id: 1,
      name: 'Weekly Performance Report',
      format: 'PDF',
      frequency: 'Weekly',
      nextDelivery: '2025-09-30',
      recipients: 3,
      status: 'active'
    },
    {
      id: 2,
      name: 'Monthly ROI Analysis',
      format: 'Excel',
      frequency: 'Monthly',
      nextDelivery: '2025-10-01',
      recipients: 5,
      status: 'active'
    },
    {
      id: 3,
      name: 'Competitor Benchmark',
      format: 'PowerPoint',
      frequency: 'Quarterly',
      nextDelivery: '2025-12-01',
      recipients: 2,
      status: 'paused'
    }
  ];

  const handleExport = () => {
    const exportConfig = {
      format: exportFormat,
      includeCharts,
      includeRawData,
      timestamp: new Date()?.toISOString()
    };
    onExport(exportConfig);
  };

  const handleScheduleDelivery = () => {
    const scheduleConfig = {
      frequency: deliveryFrequency,
      recipients: recipientEmails?.split(',')?.map(email => email?.trim()),
      format: exportFormat,
      includeCharts,
      includeRawData
    };
    console.log('Scheduling delivery:', scheduleConfig);
  };

  return (
    <div className="space-y-6">
      {/* Export Options */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Download" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Export Report</h3>
            <p className="text-sm text-muted-foreground">Download or share your analytics</p>
          </div>
        </div>

        <div className="space-y-4">
          <Select
            label="Export Format"
            options={formatOptions}
            value={exportFormat}
            onChange={setExportFormat}
            placeholder="Select format"
          />

          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Include Options
            </label>
            <div className="space-y-2">
              <Checkbox
                label="Include Charts & Visualizations"
                description="Add interactive charts and graphs to the report"
                checked={includeCharts}
                onChange={(e) => setIncludeCharts(e?.target?.checked)}
              />
              <Checkbox
                label="Include Raw Data"
                description="Append raw data tables for detailed analysis"
                checked={includeRawData}
                onChange={(e) => setIncludeRawData(e?.target?.checked)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="default"
              onClick={handleExport}
              iconName="Download"
              iconPosition="left"
            >
              Export Now
            </Button>
            <Button
              variant="outline"
              iconName="Share"
              iconPosition="left"
            >
              Share Link
            </Button>
          </div>
        </div>
      </div>
      {/* Scheduled Delivery */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Scheduled Delivery</h3>
            <p className="text-sm text-muted-foreground">Automate report distribution</p>
          </div>
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Enable Scheduled Delivery"
            description="Automatically send reports to stakeholders"
            checked={scheduledDelivery}
            onChange={(e) => setScheduledDelivery(e?.target?.checked)}
          />

          {scheduledDelivery && (
            <div className="space-y-4 pl-6 border-l-2 border-primary/20">
              <Select
                label="Delivery Frequency"
                options={frequencyOptions}
                value={deliveryFrequency}
                onChange={setDeliveryFrequency}
                placeholder="Select frequency"
              />

              <Input
                label="Recipient Emails"
                type="text"
                placeholder="email1@company.com, email2@company.com"
                description="Separate multiple emails with commas"
                value={recipientEmails}
                onChange={(e) => setRecipientEmails(e?.target?.value)}
              />

              <Button
                variant="secondary"
                onClick={handleScheduleDelivery}
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule Delivery
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Existing Scheduled Reports */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Scheduled Reports</h3>
            <p className="text-sm text-muted-foreground">Manage automated deliveries</p>
          </div>
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            New Schedule
          </Button>
        </div>

        <div className="space-y-3">
          {scheduledReports?.map((report) => (
            <div key={report?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-foreground">{report?.name}</h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    report?.status === 'active' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                  }`}>
                    {report?.status}
                  </span>
                </div>
                <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                  <span>{report?.format} • {report?.frequency}</span>
                  <span>Next: {report?.nextDelivery}</span>
                  <span>{report?.recipients} recipients</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Edit2">
                  Edit
                </Button>
                <Button variant="ghost" size="sm" iconName="Trash2">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportExport;