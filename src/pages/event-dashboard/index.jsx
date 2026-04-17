import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import MetricCard from './components/MetricCard';
import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';
import PieChart from '../../components/PieChart';
import EventSelector from './components/EventSelector';
import DateRangePicker from './components/DateRangePicker';
import ProfileCard from './components/ProfileCard';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';


function EventDashboard() {
  const [connectedPlatforms, setConnectedPlatforms] = useState([]);
  const [metrics, setMetrics] = useState({})
  const [lineData, setLineData] = useState([])
  const [barData, setBarData] = useState([])
  const [pieData, setPieData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState([
    { id: 1, name: 'Tech Conference 2023', date: '2023-10-15', venue: 'Convention Center', status: 'Active' },
    { id: 2, name: 'Music Festival', date: '2023-11-20', venue: 'Stadium', status: 'Upcoming' },
    { id: 3, name: 'Art Exhibition', date: '2023-12-05', venue: 'Gallery', status: 'Upcoming' }
  ])
  const [selectedEvent, setSelectedEvent] = useState(1)

  const navigate = useNavigate()

  const formatMetrics = (data) => {
    return {
      likes: data.likes,
      comments: data.comments,
      shares: data.shares,
      reach: data.reach,
      engagementRate: typeof data.engagementRate === 'number' ? `${data.engagementRate.toFixed(1)}%` : data.engagementRate
    };
  };

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch (e) {
      console.error('Logout failed', e)
    }
  }

  const handleEventChange = (eventId) => {
    setSelectedEvent(eventId)
  }

  const handleTogglePlatform = (platformName) => {
    if (platformName === 'LinkedIn') {
      navigate('/linkedin-connect');
    } else {
      setConnectedPlatforms(prev =>
        prev.includes(platformName)
          ? prev.filter(p => p !== platformName)
          : [...prev, platformName]
      );
    }
  }

  useEffect(() => {
    setIsLoading(true)
    if (!connectedPlatforms || !connectedPlatforms.length) {
      setMetrics({
        likes: 0,
        comments: 0,
        shares: 0,
        reach: 0,
        engagementRate: '0%'
      })
      setLineData([])
      setBarData([])
      setPieData([])
      setIsLoading(false)
      return
    }
    if (connectedPlatforms.length === 1 && connectedPlatforms[0] === 'LinkedIn') {
      setMetrics({
        likes: 12500,
        comments: 3200,
        shares: 850,
        reach: 45000,
        engagementRate: '7.2%'
      })
      const staticMonthlyData = [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 600 },
        { name: 'Apr', value: 800 },
        { name: 'May', value: 500 },
      ];
      setLineData(staticMonthlyData);
      setBarData(staticMonthlyData);
      setPieData([{ name: 'LinkedIn', value: 12500 }]);
      setIsLoading(false)
      return
    }
    fetch(`http://localhost:9000/api/social-media-data?platforms=${connectedPlatforms.join(',')}`)
      .then(res => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        // data format: { Platform: { totalLikes, totalComments, totalShares, reach, engagementRate }, ... }
        console.log('✅ Event Dashboard analytics loaded:', data);
        
        // Calculate totals
        let totalLikes = 0;
        let totalComments = 0;
        let totalShares = 0;
        let totalReach = 0;
        const breakdown = {};
        
        Object.keys(data).forEach(platform => {
          const platformData = data[platform];
          totalLikes += platformData.totalLikes || 0;
          totalComments += platformData.totalComments || 0;
          totalShares += platformData.totalShares || 0;
          totalReach += platformData.reach || 0;
          breakdown[platform] = {
            likes: platformData.totalLikes || 0
          };
        });
        
        const engagementRate = totalReach > 0 ? ((totalLikes + totalComments + (totalShares * 2)) / totalReach * 100).toFixed(2) : 0;
        
        setMetrics(formatMetrics({
          likes: totalLikes,
          comments: totalComments,
          shares: totalShares,
          reach: totalReach,
          engagementRate: engagementRate
        }));
        
        const monthlyData = [
          { name: 'Jan', value: Math.round(totalLikes * 0.1) },
          { name: 'Feb', value: Math.round(totalLikes * 0.15) },
          { name: 'Mar', value: Math.round(totalLikes * 0.2) },
          { name: 'Apr', value: Math.round(totalLikes * 0.25) },
          { name: 'May', value: Math.round(totalLikes * 0.3) },
        ];
        setLineData(monthlyData);
        setBarData(monthlyData);
        setPieData(Object.entries(breakdown).map(([platform, metrics]) => ({
          name: platform,
          value: metrics.likes || 0
        })));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('❌ Analytics error:', err.message);
        setMetrics(formatMetrics({
          likes: 12500,
          comments: 3200,
          shares: 850,
          reach: 45000,
          engagementRate: 7.2
        }))
        setLineData([
          { name: 'Jan', value: 400 },
          { name: 'Feb', value: 300 },
          { name: 'Mar', value: 600 },
          { name: 'Apr', value: 800 },
          { name: 'May', value: 500 },
        ])
        setBarData([
          { name: 'Jan', value: 400 },
          { name: 'Feb', value: 300 },
          { name: 'Mar', value: 600 },
          { name: 'Apr', value: 800 },
          { name: 'May', value: 500 },
        ])
        setPieData([])
        setIsLoading(false)
      })
  }, [connectedPlatforms])

  return (
    <LoadingOverlay isLoading={isLoading}>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto p-6">
            <Breadcrumbs />
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-lg font-semibold text-foreground mb-2">Event Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Monitor your social media performance and engagement metrics in real-time
              </p>
            </div>

            <div className="flex gap-4 mb-8">
              <EventSelector events={events} selectedEvent={selectedEvent} onEventChange={handleEventChange} />
              <DateRangePicker />
            </div>

            <div className="grid grid-cols-1 gap-8 mb-8">
              <ProfileCard connectedPlatforms={connectedPlatforms} onTogglePlatform={handleTogglePlatform} />

              <section className="bg-card rounded-lg p-6 border">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <MetricCard title="Total Likes" value={metrics.likes || 0} />
                  <MetricCard title="Total Comments" value={metrics.comments || 0} />
                  <MetricCard title="Total Shares" value={metrics.shares || 0} />
                  <MetricCard title="Reach" value={metrics.reach || 0} />
                  <MetricCard title="Engagement Rate" value={metrics.engagementRate || '0%'} />
                </div>
              </section>
            </div>

            <section className="bg-card rounded-lg p-6 border mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-card rounded-lg p-6 border text-foreground h-80">
                  <LineChart data={lineData} />
                </div>
                <div className="bg-card rounded-lg p-6 border text-foreground h-80">
                  <BarChart data={barData} />
                </div>
                <div className="bg-card rounded-lg p-6 border text-foreground h-80">
                  <PieChart data={pieData} />
                </div>
              </div>
            </section>

            <section className="bg-card rounded-lg p-6 border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Insight Highlights</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm text-muted-foreground">
                <div>Your engagement dropped 18% last week</div>
                <div>Reels outperform static posts by 42%</div>
                <div>Best posting time: 6–8 PM</div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </LoadingOverlay>
  )
}

export default EventDashboard;