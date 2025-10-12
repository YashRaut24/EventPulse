import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ReportBuilder from './components/ReportBuilder';
import ReportTemplates from './components/ReportTemplates';
import InteractiveDashboard from './components/InteractiveDashboard';
import ReportExport from './components/ReportExport';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import HistoricalComparison from './components/HistoricalComparison';

const AnalyticsReports = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' },
    { id: 'builder', label: 'Report Builder', icon: 'Settings' },
    { id: 'templates', label: 'Templates', icon: 'FileText' },
    { id: 'advanced', label: 'Advanced Analytics', icon: 'TrendingUp' },
    { id: 'historical', label: 'Historical', icon: 'Calendar' },
    { id: 'export', label: 'Export & Share', icon: 'Download' }
  ];

  const quickStats = [
    {
      title: 'Total Reports Generated',
      value: '247',
      change: '+18 this month',
      icon: 'FileText',
      color: 'text-primary'
    },
    {
      title: 'Active Scheduled Reports',
      value: '12',
      change: '3 due today',
      icon: 'Clock',
      color: 'text-accent'
    },
    {
      title: 'Data Points Analyzed',
      value: '1.2M',
      change: '+340K this week',
      icon: 'Database',
      color: 'text-success'
    },
    {
      title: 'Export Downloads',
      value: '89',
      change: '+23 this week',
      icon: 'Download',
      color: 'text-secondary'
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Weekly Performance Summary',
      type: 'Automated',
      created: '2025-09-23 09:15',
      status: 'completed',
      downloads: 12,
      format: 'PDF'
    },
    {
      id: 2,
      name: 'Competitor Analysis Q3',
      type: 'Custom',
      created: '2025-09-22 14:30',
      status: 'completed',
      downloads: 8,
      format: 'Excel'
    },
    {
      id: 3,
      name: 'ROI Assessment - Fall Campaign',
      type: 'Template',
      created: '2025-09-21 11:45',
      status: 'processing',
      downloads: 0,
      format: 'PowerPoint'
    },
    {
      id: 4,
      name: 'Audience Insights Deep Dive',
      type: 'Custom',
      created: '2025-09-20 16:20',
      status: 'completed',
      downloads: 15,
      format: 'PDF'
    }
  ];

  const handleGenerateReport = (reportConfig) => {
    setIsLoading(true);
    // Simulate report generation
    setTimeout(() => {
      setGeneratedReport(reportConfig);
      setIsLoading(false);
      setActiveTab('dashboard');
    }, 2000);
  };

  const handleSelectTemplate = (template) => {
    setActiveTab('builder');
    // Pre-populate builder with template data
    console.log('Selected template:', template);
  };

  const handleExportReport = (exportConfig) => {
    setIsLoading(true);
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false);
      console.log('Exporting report:', exportConfig);
    }, 1500);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <InteractiveDashboard reportData={generatedReport} />;
      case 'builder':
        return <ReportBuilder onGenerateReport={handleGenerateReport} />;
      case 'templates':
        return <ReportTemplates onSelectTemplate={handleSelectTemplate} />;
      case 'advanced':
        return <AdvancedAnalytics />;
      case 'historical':
        return <HistoricalComparison />;
      case 'export':
        return <ReportExport reportData={generatedReport} onExport={handleExportReport} />;
      default:
        return <InteractiveDashboard reportData={generatedReport} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumbs />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Reports</h1>
              <p className="text-muted-foreground">
                Comprehensive social media performance analysis with customizable reporting
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={() => window.location?.reload()}
              >
                Refresh Data
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => setActiveTab('builder')}
              >
                New Report
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickStats?.map((stat, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 ${
                    stat?.color === 'text-primary' ? 'bg-primary/10' :
                    stat?.color === 'text-accent' ? 'bg-accent/10' :
                    stat?.color === 'text-success' ? 'bg-success/10' : 'bg-secondary/10'
                  } rounded-lg flex items-center justify-center`}>
                    <Icon name={stat?.icon} size={16} className={stat?.color} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
                <div className="text-sm text-muted-foreground">{stat?.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat?.change}</div>
              </div>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-standard ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <LoadingOverlay isLoading={isLoading} message="Processing your request...">
            <div className="min-h-[400px]">
              {renderTabContent()}
            </div>
          </LoadingOverlay>

          {/* Recent Reports Section */}
          {activeTab === 'dashboard' && (
            <div className="mt-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Recent Reports</h3>
                    <p className="text-sm text-muted-foreground">Your latest generated reports</p>
                  </div>
                  <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
                    View All
                  </Button>
                </div>

                <div className="space-y-3">
                  {recentReports?.map((report) => (
                    <div key={report?.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-standard">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <Icon name="FileText" size={20} className="text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{report?.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{report?.type}</span>
                            <span>{report?.created}</span>
                            <span>{report?.format}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            report?.status === 'completed' 
                              ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
                          }`}>
                            {report?.status}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {report?.downloads} downloads
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" iconName="Download">
                            Download
                          </Button>
                          <Button variant="ghost" size="sm" iconName="Share">
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AnalyticsReports;