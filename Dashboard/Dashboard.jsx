import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Bell, 
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Clock,
  MapPin,
  Star
} from 'lucide-react';
import SmartOverview from './SmartOverview';
import "./Dashboard.css";

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  // Mock data for dashboard
  const mockEvents = [
    {
      id: 1,
      name: "Tech Conference 2024",
      date: "2024-12-15",
      location: "Mumbai Convention Center",
      attendees: 1247,
      status: "Active",
      revenue: 125000
    },
    {
      id: 2,
      name: "Marketing Summit",
      date: "2024-12-22",
      location: "Delhi Expo Center",
      attendees: 890,
      status: "Planning",
      revenue: 89000
    },
    {
      id: 3,
      name: "Startup Meetup",
      date: "2024-11-30",
      location: "Pune Tech Park",
      attendees: 456,
      status: "Completed",
      revenue: 45600
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New registration",
      event: "Tech Conference 2024",
      time: "2 minutes ago",
      type: "registration"
    },
    {
      id: 2,
      action: "Payment received",
      event: "Marketing Summit",
      time: "15 minutes ago",
      type: "payment"
    },
    {
      id: 3,
      action: "Event updated",
      event: "Startup Meetup",
      time: "1 hour ago",
      type: "update"
    },
    {
      id: 4,
      action: "New review posted",
      event: "Tech Conference 2024",
      time: "2 hours ago",
      type: "review"
    }
  ];

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'green';
      case 'planning': return 'blue';
      case 'completed': return 'gray';
      default: return 'gray';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'registration': return <Users size={16} />;
      case 'payment': return <DollarSign size={16} />;
      case 'update': return <Clock size={16} />;
      case 'review': return <Star size={16} />;
      default: return <Bell size={16} />;
    }
  };

  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1 className="dashboard-title">Welcome back, John! 👋</h1>
            <p className="dashboard-subtitle">
              {formatDate(currentTime)} • {formatTime(currentTime)}
            </p>
          </div>
          
          <div className="header-actions">
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search events, attendees..." 
                className="search-input"
              />
            </div>
            
            <button className="action-btn secondary">
              <Filter size={18} />
              Filter
            </button>
            
            <button className="action-btn primary">
              <Plus size={18} />
              Create Event
            </button>
            
            <div className="notification-bell">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Overview Component */}
      <div className="dashboard-section">
        <SmartOverview />
      </div>

      {/* Dashboard Content Grid */}
      <div className="dashboard-content">
        {/* Quick Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-title-group">
                <div className="stat-icon">
                  <Calendar size={20} />
                </div>
                <h3 className="stat-title">Total Events</h3>
              </div>
            </div>
            <div className="stat-value">24</div>
            <div className="stat-change positive">
              <TrendingUp size={14} />
              +12% from last month
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-title-group">
                <div className="stat-icon">
                  <Users size={20} />
                </div>
                <h3 className="stat-title">Total Attendees</h3>
              </div>
            </div>
            <div className="stat-value">8,945</div>
            <div className="stat-change positive">
              <TrendingUp size={14} />
              +18% from last month
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-title-group">
                <div className="stat-icon">
                  <DollarSign size={20} />
                </div>
                <h3 className="stat-title">Revenue</h3>
              </div>
            </div>
            <div className="stat-value">₹2,45,600</div>
            <div className="stat-change positive">
              <TrendingUp size={14} />
              +25% from last month
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-title-group">
                <div className="stat-icon">
                  <Star size={20} />
                </div>
                <h3 className="stat-title">Avg. Rating</h3>
              </div>
            </div>
            <div className="stat-value">4.8</div>
            <div className="stat-change positive">
              <TrendingUp size={14} />
              +0.3 from last month
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Recent Events */}
          <div className="content-card events-card">
            <div className="card-header">
              <h3 className="card-title">Recent Events</h3>
              <button className="more-btn">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="events-list">
              {mockEvents.map(event => (
                <div key={event.id} className="event-item">
                  <div className="event-info">
                    <h4 className="event-name">{event.name}</h4>
                    <div className="event-details">
                      <span className="event-date">
                        <Calendar size={14} />
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span className="event-location">
                        <MapPin size={14} />
                        {event.location}
                      </span>
                    </div>
                  </div>
                  
                  <div className="event-stats">
                    <div className="event-attendees">
                      <Users size={16} />
                      {event.attendees.toLocaleString()}
                    </div>
                    <div className="event-revenue">
                      ₹{event.revenue.toLocaleString()}
                    </div>
                    <span className={`event-status ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="card-footer">
              <button className="view-all-btn">View All Events</button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="content-card activity-card">
            <div className="card-header">
              <h3 className="card-title">Recent Activity</h3>
              <button className="more-btn">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="activity-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="activity-content">
                    <p className="activity-action">{activity.action}</p>
                    <p className="activity-event">{activity.event}</p>
                  </div>
                  <div className="activity-time">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="card-footer">
              <button className="view-all-btn">View All Activity</button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3 className="section-title">Quick Actions</h3>
          <div className="actions-grid">
            <button className="quick-action-btn">
              <Plus size={24} />
              <span>Create New Event</span>
            </button>
            <button className="quick-action-btn">
              <Download size={24} />
              <span>Export Reports</span>
            </button>
            <button className="quick-action-btn">
              <Users size={24} />
              <span>Manage Attendees</span>
            </button>
            <button className="quick-action-btn">
              <Bell size={24} />
              <span>Send Notifications</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;