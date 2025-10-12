import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const DataExportTab = () => {
  const [exportOptions, setExportOptions] = useState({
    profileData: true,
    eventData: true,
    analyticsData: true,
    socialMediaData: false,
    campaignData: true,
    reportHistory: false
  });

  const [exportFormat, setExportFormat] = useState('json');
  const [dateRange, setDateRange] = useState('all');
  const [isExporting, setIsExporting] = useState(false);

  const [exportHistory] = useState([
    {
      id: 1,
      type: 'Full Account Export',
      format: 'JSON',
      size: '2.3 MB',
      date: 'September 20, 2025',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 2,
      type: 'Analytics Data',
      format: 'CSV',
      size: '1.8 MB',
      date: 'September 15, 2025',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 3,
      type: 'Event Data Export',
      format: 'JSON',
      size: '856 KB',
      date: 'September 10, 2025',
      status: 'expired',
      downloadUrl: null
    }
  ]);

  const formatOptions = [
    { value: 'json', label: 'JSON Format' },
    { value: 'csv', label: 'CSV Format' },
    { value: 'xlsx', label: 'Excel Format' },
    { value: 'pdf', label: 'PDF Report' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last_30_days', label: 'Last 30 Days' },
    { value: 'last_90_days', label: 'Last 90 Days' },
    { value: 'last_year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleExportOptionChange = (key, value) => {
    setExportOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleStartExport = async () => {
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsExporting(false);
  };

  const getSelectedDataSize = () => {
    const sizes = {
      profileData: 0.1,
      eventData: 1.2,
      analyticsData: 3.5,
      socialMediaData: 2.8,
      campaignData: 0.9,
      reportHistory: 1.5
    };
    
    return Object.entries(exportOptions)?.filter(([key, selected]) => selected)?.reduce((total, [key]) => total + sizes?.[key], 0)?.toFixed(1);
  };

  return (
    <div className="space-y-8">
      {/* Export Configuration */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Export Configuration</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Data Selection */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Select Data to Export</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Profile Data</p>
                  <p className="text-sm text-muted-foreground">Personal information and account settings</p>
                </div>
                <Checkbox
                  checked={exportOptions?.profileData}
                  onChange={(e) => handleExportOptionChange('profileData', e?.target?.checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Event Data</p>
                  <p className="text-sm text-muted-foreground">All created events and their configurations</p>
                </div>
                <Checkbox
                  checked={exportOptions?.eventData}
                  onChange={(e) => handleExportOptionChange('eventData', e?.target?.checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Analytics Data</p>
                  <p className="text-sm text-muted-foreground">Performance metrics and insights</p>
                </div>
                <Checkbox
                  checked={exportOptions?.analyticsData}
                  onChange={(e) => handleExportOptionChange('analyticsData', e?.target?.checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Social Media Data</p>
                  <p className="text-sm text-muted-foreground">Connected accounts and social metrics</p>
                </div>
                <Checkbox
                  checked={exportOptions?.socialMediaData}
                  onChange={(e) => handleExportOptionChange('socialMediaData', e?.target?.checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Campaign Data</p>
                  <p className="text-sm text-muted-foreground">Marketing campaigns and their results</p>
                </div>
                <Checkbox
                  checked={exportOptions?.campaignData}
                  onChange={(e) => handleExportOptionChange('campaignData', e?.target?.checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Report History</p>
                  <p className="text-sm text-muted-foreground">Previously generated reports and exports</p>
                </div>
                <Checkbox
                  checked={exportOptions?.reportHistory}
                  onChange={(e) => handleExportOptionChange('reportHistory', e?.target?.checked)}
                />
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Export Options</h4>
            <div className="space-y-6">
              <Select
                label="Export Format"
                description="Choose the format for your exported data"
                options={formatOptions}
                value={exportFormat}
                onChange={setExportFormat}
              />

              <Select
                label="Date Range"
                description="Select the time period for your data"
                options={dateRangeOptions}
                value={dateRange}
                onChange={setDateRange}
              />

              {dateRange === 'custom' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              )}

              {/* Export Summary */}
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h5 className="font-medium text-foreground mb-2">Export Summary</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Selected data types:</span>
                    <span className="text-foreground">
                      {Object.values(exportOptions)?.filter(Boolean)?.length} of {Object.keys(exportOptions)?.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated size:</span>
                    <span className="text-foreground">{getSelectedDataSize()} MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Format:</span>
                    <span className="text-foreground">{exportFormat?.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="default"
                loading={isExporting}
                iconName="Download"
                iconPosition="left"
                onClick={handleStartExport}
                fullWidth
                disabled={!Object.values(exportOptions)?.some(Boolean)}
              >
                {isExporting ? 'Preparing Export...' : 'Start Export'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Export History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Export History</h3>
          <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
        </div>
        
        <div className="space-y-4">
          {exportHistory?.map((export_item) => (
            <div key={export_item?.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{export_item?.type}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{export_item?.format}</span>
                    <span>•</span>
                    <span>{export_item?.size}</span>
                    <span>•</span>
                    <span>{export_item?.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  export_item?.status === 'completed' 
                    ? 'bg-success/10 text-success border border-success/20'
                    : export_item?.status === 'expired' ?'bg-error/10 text-error border border-error/20' :'bg-warning/10 text-warning border border-warning/20'
                }`}>
                  {export_item?.status}
                </span>
                {export_item?.downloadUrl && export_item?.status === 'completed' ? (
                  <Button variant="outline" size="sm" iconName="Download">
                    Download
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" disabled>
                    Expired
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-warning/10 rounded-lg border border-warning/20">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-warning mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Export Retention Policy</p>
              <p className="text-sm text-muted-foreground mt-1">
                Exported files are available for download for 30 days after generation. 
                After this period, files are automatically deleted for security reasons.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Data Portability Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Data Portability</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Secure Export Process</p>
              <p className="text-sm text-muted-foreground">
                All exports are encrypted and securely processed. Your data is never shared with third parties.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="Clock" size={20} className="text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Processing Time</p>
              <p className="text-sm text-muted-foreground">
                Large exports may take several minutes to process. You'll receive an email when your export is ready.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="FileText" size={20} className="text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Data Format</p>
              <p className="text-sm text-muted-foreground">
                Exported data follows industry-standard formats and includes documentation for easy import into other systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExportTab;