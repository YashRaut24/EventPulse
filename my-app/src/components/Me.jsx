import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import Profile from "./Profile";
import Analytics from "./Analytics";

// LinkedIn-style profile with sidebar navigation and Dashboard view
export default function LinkedInProfile({ profile }) {
  const [activeTab, setActiveTab] = useState('profile');


  // Mock engagement data
  const engagementByDay = [
    { day: 'Mon', views: 120, likes: 24, comments: 8 },
    { day: 'Tue', views: 98, likes: 18, comments: 5 },
    { day: 'Wed', views: 150, likes: 30, comments: 12 },
    { day: 'Thu', views: 170, likes: 40, comments: 18 },
    { day: 'Fri', views: 220, likes: 55, comments: 25 },
    { day: 'Sat', views: 90, likes: 12, comments: 3 },
    { day: 'Sun', views: 60, likes: 8, comments: 2 },
  ];

  const engagementBySource = [
    { name: 'Direct', value: 400 },
    { name: 'Search', value: 300 },
    { name: 'Referral', value: 300 },
    { name: 'Social', value: 200 },
  ];

  const postPerformance = [
    { post: 'Project Demo', impressions: 800, clicks: 120 },
    { post: 'Article: DSA Tips', impressions: 600, clicks: 80 },
    { post: 'Open Source', impressions: 450, clicks: 50 },
  ];

  const COLORS = ['#4F46E5', '#06B6D4', '#F59E0B', '#EF4444'];


  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <nav className="w-56 bg-white border-r p-4 space-y-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`block w-full text-left px-3 py-2 rounded-lg ${activeTab === 'profile' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`block w-full text-left px-3 py-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          Analytics
        </button>
      </nav>

      {/* Content */}
      <main className="flex-1 p-6">
  {activeTab === 'profile' ? (
    <Profile profile={profile} />
  ) : (
    <Analytics
      engagementByDay={engagementByDay}
      postPerformance={postPerformance}
      engagementBySource={engagementBySource}
      COLORS={COLORS}
    />
  )}
</main>

    </div>
  );
}
