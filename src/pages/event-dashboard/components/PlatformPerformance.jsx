import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const PlatformPerformance = ({ data, title = "Platform Performance" }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-popover-foreground">{`Platform: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.dataKey}: ${entry?.value?.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'Facebook': 'Facebook',
      'Twitter': 'Twitter',
      'Instagram': 'Instagram',
      'LinkedIn': 'Linkedin',
      'YouTube': 'Youtube',
      'TikTok': 'Music'
    };
    return icons?.[platform] || 'Globe';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      {/* Platform Icons */}
      <div className="flex items-center justify-center space-x-6 mb-6">
        {data?.map((platform, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <Icon name={getPlatformIcon(platform?.platform)} size={20} className="text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{platform?.platform}</span>
          </div>
        ))}
      </div>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="platform" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="engagement" 
              fill="var(--color-primary)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PlatformPerformance;