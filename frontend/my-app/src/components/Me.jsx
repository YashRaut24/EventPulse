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

// LinkedIn-style profile with sidebar navigation and Dashboard view
export default function LinkedInProfile({ profile }) {
  const [activeTab, setActiveTab] = useState('profile');

  // Sample data fallback
  const p = profile || {
    name: 'Shreyas Patil',
    headline: 'Aspiring Software Engineer • Java | C/C++ | Full‑Stack',
    location: 'Mumbai, India',
    about:
      "Passionate developer building web apps and data-driven solutions. Experienced with Java Swing, React, Node.js and learning machine learning.",
    avatarAlt: 'Avatar',
    avatarInitials: 'SP',
    contact: {
      email: 'shreyas@example.com',
      phone: '+91 98XXXXXXX',
      website: 'https://example.com',
    },
    experience: [
      {
        role: 'Frontend Intern',
        company: 'Example Co.',
        date: 'Jun 2024 - Aug 2024',
        description: 'Built interactive UI components in React and improved performance by 20%.',
      },
    ],
    education: [
      { degree: 'B.Sc. Computer Science', school: 'KC College', date: '2021 - 2024' },
    ],
    skills: ['Java', 'C++', 'React', 'HTML/CSS', 'APIs', 'DSA'],
    recommendations: [
      {
        by: 'Mayur Narkhede',
        text: 'Shreyas is a focused engineer who delivers clean code and learns quickly.',
      },
    ],
  };

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

  // Dashboard component
  const Dashboard = () => (
    <section className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Engagement Dashboard</h2>
        <div className="text-sm text-gray-500">Last 7 days</div>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line chart: Views over days */}
        <div className="p-4 border rounded-lg bg-white">
          <h3 className="text-sm font-medium text-gray-700">Daily Views</h3>
          <div style={{ height: 180 }} className="mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementByDay}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#4F46E5" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar chart: Post performance */}
        <div className="p-4 border rounded-lg bg-white">
          <h3 className="text-sm font-medium text-gray-700">Post Performance</h3>
          <div style={{ height: 180 }} className="mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={postPerformance}>
                <XAxis dataKey="post" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="impressions" fill="#06B6D4" />
                <Bar dataKey="clicks" fill="#4F46E5" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie chart: Traffic sources */}
        <div className="p-4 border rounded-lg bg-white">
          <h3 className="text-sm font-medium text-gray-700">Traffic Sources</h3>
          <div style={{ height: 180 }} className="mt-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={engagementBySource} dataKey="value" nameKey="name" innerRadius={30} outerRadius={60} paddingAngle={3}>
                  {engagementBySource.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );

  // Profile component
  const Profile = () => (
    <>
      {/* Top header */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex gap-6">
        <div className="flex-shrink-0">
          <div className="h-28 w-28 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-semibold">
            {p.avatarInitials}
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{p.name}</h1>
          <p className="text-sm text-gray-600 mt-1">{p.headline}</p>
          <p className="text-sm text-gray-500 mt-2">{p.location}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800">Experience</h3>
            <div className="mt-4 space-y-4">
              {p.experience.map((exp, idx) => (
                <div key={idx} className="p-4 border rounded-lg">
                  <div className="font-medium text-gray-900">{exp.role}</div>
                  <div className="text-sm text-gray-600">{exp.company}</div>
                  <div className="text-sm text-gray-500">{exp.date}</div>
                  <p className="mt-2 text-sm text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800">Education</h3>
            {p.education.map((edu, idx) => (
              <div key={idx} className="mt-2">
                <div className="font-medium text-gray-900">{edu.degree}</div>
                <div className="text-sm text-gray-600">{edu.school}</div>
                <div className="text-sm text-gray-500">{edu.date}</div>
              </div>
            ))}
          </section>
        </div>

        <aside className="space-y-6">
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800">Skills</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.skills.map((s, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-sm border border-gray-200">{s}</span>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </>
  );

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
        {activeTab === 'profile' ? <Profile /> : <Dashboard />}
      </main>
    </div>
  );
}
