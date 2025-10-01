import React from "react";
import "./Analytics.css";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

function Analytics({ engagementByDay, postPerformance, engagementBySource, COLORS }) {
  return (
    <section className="analytics-section">
      <div className="analytics-header">
        <h2 className="analytics-title">Engagement Dashboard</h2>
        <div className="analytics-date">Last 7 days</div>
      </div>

      <div className="analytics-grid">
        <div className="chart-card">
          <h3 className="chart-title">Daily Views</h3>
          <div className="chart-container">
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

        <div className="chart-card">
          <h3 className="chart-title">Post Performance</h3>
          <div className="chart-container">
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

        <div className="chart-card">
          <h3 className="chart-title">Traffic Sources</h3>
          <div className="pie-chart-wrapper">
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
}

export default Analytics;
