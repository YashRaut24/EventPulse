import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import SocialMediaFeed from './components/SocialMediaFeed';
import FilterControls from './components/FilterControls';
import AnalyticsPanel from './components/AnalyticsPanel';
import AlertsNotifications from './components/AlertsNotifications';
import RealTimeIndicator from './components/RealTimeIndicator';

const SocialMediaMonitoring = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState(() => {
    const viewParam = searchParams.get('view');
    return viewParam && ['feed', 'analytics', 'alerts'].includes(viewParam) ? viewParam : 'feed';
  }); // 'feed', 'analytics', 'alerts'
  const [filters, setFilters] = useState({
    platforms: 'all',
    sentiment: 'all',
    timeRange: '24h',
    engagement: 'all',
    keywords: ['TechConf2024', 'AI', 'Innovation'],
    influencersOnly: false,
    hasMedia: false,
    verifiedOnly: false
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update active view when URL parameters change
    const viewParam = searchParams.get('view');
    if (viewParam && ['feed', 'analytics', 'alerts'].includes(viewParam)) {
      setActiveView(viewParam);
    }
  }, [searchParams]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const viewOptions = [
    { id: 'feed', label: 'Live Feed', icon: 'Activity', count: 1247 },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3', count: null },
    { id: 'alerts', label: 'Alerts', icon: 'Bell', count: 3 }
  ];

  const renderMainContent = () => {
    switch (activeView) {
      case 'analytics':
        return <AnalyticsPanel />;
      case 'alerts':
        return <AlertsNotifications />;
      default:
        return (
          <div className="space-y-6">
            <FilterControls 
              filters={filters} 
              onFiltersChange={handleFiltersChange} 
            />
            <SocialMediaFeed 
              filters={filters} 
              onUpdateFilters={handleFiltersChange} 
            />
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <LoadingOverlay 
          isLoading={true} 
          message="Loading social media monitoring dashboard..." 
          type="skeleton"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumbs />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Social Media Monitoring
              </h1>
              <p className="text-muted-foreground">
                Real-time tracking and analysis of your event's social media presence
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                iconName="Download"
                onClick={() => {
                  alert('Exporting social media data...');
                  setTimeout(() => {
                    alert('Data exported successfully!');
                  }, 1500);
                }}
              >
                Export Data
              </Button>
            </div>
          </div>

          {/* Real-time Connection Indicator */}
          <RealTimeIndicator />

          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar Navigation */}
            <div className={`${sidebarCollapsed ? 'col-span-1' : 'col-span-3'} transition-all duration-300`}>
              <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  {!sidebarCollapsed && (
                    <h3 className="font-semibold text-foreground">Views</h3>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"}
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  />
                </div>
                
                <nav className="space-y-2">
                  {viewOptions?.map((option) => (
                    <button
                      key={option?.id}
                      onClick={() => setActiveView(option?.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-standard ${
                        activeView === option?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={option?.icon} size={20} />
                        {!sidebarCollapsed && (
                          <span className="font-medium">{option?.label}</span>
                        )}
                      </div>
                      {!sidebarCollapsed && option?.count && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          activeView === option?.id
                            ? 'bg-primary-foreground/20 text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {option?.count}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>

                {/* Quick Stats */}
                {!sidebarCollapsed && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-foreground mb-3">Quick Stats</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Today's Mentions</span>
                        <span className="text-sm font-semibold text-foreground">1,247</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Sentiment Score</span>
                        <span className="text-sm font-semibold text-green-600">+0.65</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Engagement Rate</span>
                        <span className="text-sm font-semibold text-foreground">8.9%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Reach</span>
                        <span className="text-sm font-semibold text-foreground">45.2k</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Platform Status */}
                {!sidebarCollapsed && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-foreground mb-3">Platform Status</h4>
                    <div className="space-y-2">
                      {[
                        { name: 'Twitter', status: 'active', color: 'bg-green-500' },
                        { name: 'LinkedIn', status: 'active', color: 'bg-green-500' },
                        { name: 'Instagram', status: 'active', color: 'bg-green-500' },
                        { name: 'Facebook', status: 'limited', color: 'bg-yellow-500' }
                      ]?.map((platform) => (
                        <div key={platform?.name} className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{platform?.name}</span>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${platform?.color}`}></div>
                            <span className="text-xs text-muted-foreground capitalize">
                              {platform?.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content Area */}
            <div className={`${sidebarCollapsed ? 'col-span-11' : 'col-span-9'} transition-all duration-300`}>
              {renderMainContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaMonitoring;