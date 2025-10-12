import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RealTimeIndicator = ({ isConnected = true, lastUpdate = null }) => {
  const [connectionStatus, setConnectionStatus] = useState(isConnected);
  const [updateCount, setUpdateCount] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState(lastUpdate || new Date());

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (connectionStatus) {
        setUpdateCount(prev => prev + Math.floor(Math.random() * 3) + 1);
        setLastUpdateTime(new Date());
      }
    }, 5000 + Math.random() * 10000); // Random interval between 5-15 seconds

    return () => clearInterval(interval);
  }, [connectionStatus]);

  useEffect(() => {
    // Simulate occasional connection issues
    const connectionCheck = setInterval(() => {
      if (Math.random() < 0.05) { // 5% chance of temporary disconnection
        setConnectionStatus(false);
        setTimeout(() => setConnectionStatus(true), 2000 + Math.random() * 3000);
      }
    }, 30000);

    return () => clearInterval(connectionCheck);
  }, []);

  const formatLastUpdate = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / 60000);
    
    if (seconds < 60) {
      return `${seconds}s ago`;
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else {
      return timestamp?.toLocaleTimeString();
    }
  };

  return (
    <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4 mb-6">
      {/* Connection Status */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className={`w-3 h-3 rounded-full ${
            connectionStatus ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {connectionStatus && (
              <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
            )}
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${
              connectionStatus ? 'text-green-600' : 'text-red-600'
            }`}>
              {connectionStatus ? 'Live' : 'Disconnected'}
            </span>
            <Icon 
              name={connectionStatus ? 'Wifi' : 'WifiOff'} 
              size={16} 
              className={connectionStatus ? 'text-green-600' : 'text-red-600'} 
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {connectionStatus 
              ? `Last update: ${formatLastUpdate(lastUpdateTime)}`
              : 'Attempting to reconnect...'
            }
          </p>
        </div>
      </div>

      {/* Update Statistics */}
      <div className="flex items-center space-x-6">
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{updateCount}</div>
          <div className="text-xs text-muted-foreground">New Updates</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-bold text-primary">1,247</div>
          <div className="text-xs text-muted-foreground">Total Mentions</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-bold text-secondary">89%</div>
          <div className="text-xs text-muted-foreground">Coverage</div>
        </div>
      </div>

      {/* Real-time Actions */}
      <div className="flex items-center space-x-2">
        {!connectionStatus && (
          <button
            onClick={() => setConnectionStatus(true)}
            className="flex items-center space-x-1 px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-standard"
          >
            <Icon name="RefreshCw" size={14} />
            <span>Reconnect</span>
          </button>
        )}
        
        <div className="relative group">
          <button className="p-2 rounded-md hover:bg-muted transition-standard">
            <Icon name="Settings" size={16} className="text-muted-foreground" />
          </button>
          
          {/* Settings Tooltip */}
          <div className="absolute right-0 top-full mt-2 bg-popover border border-border rounded-lg shadow-modal p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-standard z-10 w-48">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Auto-refresh</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-primary border-border rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Sound alerts</span>
                <input type="checkbox" className="w-4 h-4 text-primary border-border rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Desktop notifications</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-primary border-border rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeIndicator;