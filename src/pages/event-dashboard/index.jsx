import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import MetricCard from './components/MetricCard';
import EngagementChart from './components/EngagementChart';
import PlatformPerformance from './components/PlatformPerformance';
import RecentMentions from './components/RecentMentions';
import TrendingHashtags from './components/TrendingHashtags';
import QuickActions from './components/QuickActions';
import EventSelector from './components/EventSelector';
import DateRangePicker from './components/DateRangePicker';

const EventDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState('event-1');
  const [dateRange, setDateRange] = useState({
    startDate: '2024-09-16',
    endDate: '2024-09-23',
    label: 'Last 7 days'
  });

  // Mock data
  const events = [
    {
      id: 'event-1',
      name: 'Tech Conference 2024',
      date: 'Oct 15-17, 2024',
      venue: 'Convention Center',
      status: 'Active'
    },
    {
      id: 'event-2',
      name: 'Digital Marketing Summit',
      date: 'Nov 5-6, 2024',
      venue: 'Grand Hotel',
      status: 'Upcoming'
    },
    {
      id: 'event-3',
      name: 'Innovation Workshop',
      date: 'Sep 20-21, 2024',
      venue: 'Tech Hub',
      status: 'Completed'
    }
  ];

  const metricsData = [
    {
      title: 'Total Engagement',
      value: '24.8K',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Heart',
      color: 'primary'
    },
    {
      title: 'Sentiment Score',
      value: '8.4/10',
      change: '+0.3',
      changeType: 'positive',
      icon: 'Smile',
      color: 'success'
    },
    {
      title: 'Total Reach',
      value: '156.2K',
      change: '+8.7%',
      changeType: 'positive',
      icon: 'Users',
      color: 'secondary'
    },
    {
      title: 'Active Campaigns',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: 'Megaphone',
      color: 'warning'
    }
  ];

  const engagementData = [
    { date: '09/16', engagement: 1200, reach: 8500 },
    { date: '09/17', engagement: 1850, reach: 12300 },
    { date: '09/18', engagement: 2100, reach: 15600 },
    { date: '09/19', engagement: 1950, reach: 14200 },
    { date: '09/20', engagement: 2400, reach: 18900 },
    { date: '09/21', engagement: 2800, reach: 21500 },
    { date: '09/22', engagement: 3200, reach: 24800 },
    { date: '09/23', engagement: 2950, reach: 22100 }
  ];

  const platformData = [
    { platform: 'Facebook', engagement: 8500 },
    { platform: 'Twitter', engagement: 6200 },
    { platform: 'Instagram', engagement: 7800 },
    { platform: 'LinkedIn', engagement: 4300 },
    { platform: 'YouTube', engagement: 3200 }
  ];

  const mentionsData = [
    {
      id: 1,
      author: 'Sarah Johnson',
      username: 'sarahj_tech',
      platform: 'Twitter',
      content: `Just registered for Tech Conference 2024! Can't wait to see the latest innovations in AI and machine learning. The speaker lineup looks incredible! #TechConf2024 #Innovation`,sentiment: 'positive',
      timestamp: new Date(Date.now() - 1800000),
      likes: 45,
      comments: 12,
      shares: 8
    },
    {
      id: 2,
      author: 'Mike Chen',username: 'mikechen_dev',
      platform: 'LinkedIn',
      content: `Looking forward to networking at Tech Conference 2024. Hope to connect with fellow developers and learn about emerging technologies. Anyone else attending?`,
      sentiment: 'positive',
      timestamp: new Date(Date.now() - 3600000),
      likes: 23,
      comments: 7,
      shares: 5
    },
    {
      id: 3,
      author: 'Tech Enthusiast',username: 'techlover2024',
      platform: 'Instagram',
      content: `The venue for Tech Conference 2024 looks amazing! Can't wait to share my experience. Expecting great insights from industry leaders.`,
      sentiment: 'positive',
      timestamp: new Date(Date.now() - 7200000),
      likes: 67,
      comments: 15,
      shares: 12
    },
    {
      id: 4,
      author: 'Alex Rodriguez',
      username: 'alexr_business',
      platform: 'Facebook',
      content: `Mixed feelings about the ticket prices for Tech Conference 2024. The content looks great but it's quite expensive for startups like ours.`,
      sentiment: 'neutral',
      timestamp: new Date(Date.now() - 10800000),
      likes: 18,
      comments: 9,
      shares: 3
    }
  ];

  const hashtagsData = [
    {
      id: 1,
      tag: 'TechConf2024',
      mentions: 15420,
      trend: 25,
      relatedEvents: ['Tech Conference 2024', 'Innovation Summit']
    },
    {
      id: 2,
      tag: 'Innovation',
      mentions: 8930,
      trend: 12,
      relatedEvents: ['Tech Conference 2024']
    },
    {
      id: 3,
      tag: 'AI',
      mentions: 7650,
      trend: -5,
      relatedEvents: ['Tech Conference 2024', 'AI Workshop']
    },
    {
      id: 4,
      tag: 'MachineLearning',
      mentions: 6420,
      trend: 8,
      relatedEvents: ['Tech Conference 2024']
    },
    {
      id: 5,
      tag: 'Networking',
      mentions: 4280,
      trend: 15,
      relatedEvents: ['Tech Conference 2024', 'Business Meetup']
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleEventChange = (eventId) => {
    setSelectedEvent(eventId);
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => setIsLoading(false), 600);
  };

  const handleCreateCampaign = () => {
    alert('Redirecting to campaign creation...');
    // Navigate to campaign creation page
    setTimeout(() => {
      window.location.href = '/social-media-monitoring';
    }, 1000);
  };

  const handleGenerateReport = () => {
    alert('Generating comprehensive analytics report...');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Report generated successfully! Redirecting to analytics...');
      window.location.href = '/analytics-reports';
    }, 2000);
  };

  const handleConfigureAlerts = () => {
    alert('Opening alert configuration panel...');
    setTimeout(() => {
      window.location.href = '/account-settings';
    }, 1000);
  };

  const handleViewAnalytics = () => {
    window.location.href = '/analytics-reports';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <LoadingOverlay isLoading={true} type="skeleton" className="p-6" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto p-6">
          <Breadcrumbs />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Event Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your event's social media performance and engagement metrics in real-time
            </p>
          </div>

          {/* Controls Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <EventSelector
                events={events}
                selectedEvent={selectedEvent}
                onEventChange={handleEventChange}
              />
            </div>
            <DateRangePicker onDateRangeChange={handleDateRangeChange} />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <EngagementChart data={engagementData} />
            <PlatformPerformance data={platformData} />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <RecentMentions mentions={mentionsData} />
            </div>
            <TrendingHashtags hashtags={hashtagsData} />
          </div>

          {/* Quick Actions */}
          <QuickActions
            onCreateCampaign={handleCreateCampaign}
            onGenerateReport={handleGenerateReport}
            onConfigureAlerts={handleConfigureAlerts}
            onViewAnalytics={handleViewAnalytics}
          />
        </div>
      </main>
    </div>
  );
};

export default EventDashboard;