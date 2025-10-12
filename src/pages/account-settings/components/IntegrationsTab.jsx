import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const IntegrationsTab = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: 'facebook',
      name: 'Facebook',
      description: 'Connect your Facebook pages and analyze engagement',
      icon: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=40&h=40&fit=crop',
      connected: true,
      lastSync: '2 hours ago',
      permissions: ['Read posts', 'Read comments', 'Read insights'],
      accounts: ['EventPulse Official', 'Tech Conference 2025']
    },
    {
      id: 'twitter',
      name: 'Twitter',
      description: 'Monitor tweets and track hashtag performance',
      icon: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=40&h=40&fit=crop',
      connected: true,
      lastSync: '1 hour ago',
      permissions: ['Read tweets', 'Read mentions', 'Read analytics'],
      accounts: ['@eventpulse', '@techconf2025']
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Analyze Instagram posts and story engagement',
      icon: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=40&h=40&fit=crop',
      connected: true,
      lastSync: '3 hours ago',
      permissions: ['Read posts', 'Read stories', 'Read insights'],
      accounts: ['eventpulse_official']
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Track professional network engagement',
      icon: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=40&h=40&fit=crop',
      connected: false,
      lastSync: null,
      permissions: [],
      accounts: []
    },
    {
      id: 'youtube',
      name: 'YouTube',
      description: 'Monitor video content and channel analytics',
      icon: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=40&h=40&fit=crop',
      connected: false,
      lastSync: null,
      permissions: [],
      accounts: []
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      description: 'Analyze short-form video content performance',
      icon: 'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?w=40&h=40&fit=crop',
      connected: false,
      lastSync: null,
      permissions: [],
      accounts: []
    }
  ]);

  const [isConnecting, setIsConnecting] = useState(null);

  const handleConnect = async (integrationId) => {
    setIsConnecting(integrationId);
    // Simulate API connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIntegrations(prev => prev?.map(integration => 
      integration?.id === integrationId 
        ? { 
            ...integration, 
            connected: true, 
            lastSync: 'Just now',
            permissions: ['Read posts', 'Read comments', 'Read insights'],
            accounts: [`${integration?.name} Account`]
          }
        : integration
    ));
    setIsConnecting(null);
  };

  const handleDisconnect = (integrationId) => {
    setIntegrations(prev => prev?.map(integration => 
      integration?.id === integrationId 
        ? { 
            ...integration, 
            connected: false, 
            lastSync: null,
            permissions: [],
            accounts: []
          }
        : integration
    ));
  };

  const handleReconnect = async (integrationId) => {
    setIsConnecting(integrationId);
    // Simulate API reconnection
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIntegrations(prev => prev?.map(integration => 
      integration?.id === integrationId 
        ? { ...integration, lastSync: 'Just now' }
        : integration
    ));
    setIsConnecting(null);
  };

  return (
    <div className="space-y-6">
      {/* Connected Platforms Overview */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Connected Platforms</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
            <div className="text-2xl font-bold text-success">
              {integrations?.filter(i => i?.connected)?.length}
            </div>
            <p className="text-sm text-muted-foreground">Connected</p>
          </div>
          <div className="text-center p-4 bg-warning/10 rounded-lg border border-warning/20">
            <div className="text-2xl font-bold text-warning">
              {integrations?.filter(i => !i?.connected)?.length}
            </div>
            <p className="text-sm text-muted-foreground">Available</p>
          </div>
          <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="text-2xl font-bold text-primary">
              {integrations?.reduce((acc, i) => acc + i?.accounts?.length, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Accounts</p>
          </div>
        </div>
      </div>
      {/* Integration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrations?.map((integration) => (
          <div key={integration?.id} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-border">
                  <Image 
                    src={integration?.icon} 
                    alt={integration?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{integration?.name}</h4>
                  <p className="text-sm text-muted-foreground">{integration?.description}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                integration?.connected 
                  ? 'bg-success/10 text-success border border-success/20' :'bg-muted text-muted-foreground border border-border'
              }`}>
                {integration?.connected ? 'Connected' : 'Not Connected'}
              </div>
            </div>

            {integration?.connected ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last sync:</span>
                  <span className="text-foreground">{integration?.lastSync}</span>
                </div>

                {integration?.accounts?.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Connected Accounts:</p>
                    <div className="space-y-1">
                      {integration?.accounts?.map((account, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <Icon name="CheckCircle" size={14} className="text-success" />
                          <span className="text-muted-foreground">{account}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {integration?.permissions?.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Permissions:</p>
                    <div className="flex flex-wrap gap-2">
                      {integration?.permissions?.map((permission, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    loading={isConnecting === integration?.id}
                    iconName="RefreshCw"
                    iconPosition="left"
                    onClick={() => handleReconnect(integration?.id)}
                  >
                    Reconnect
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDisconnect(integration?.id)}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            ) : (
              <div className="pt-4">
                <Button
                  variant="default"
                  size="sm"
                  loading={isConnecting === integration?.id}
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => handleConnect(integration?.id)}
                  fullWidth
                >
                  Connect {integration?.name}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Data Sync Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Data Sync Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Auto Sync</p>
              <p className="text-sm text-muted-foreground">Automatically sync data every hour</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ring/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Historical Data Import</p>
              <p className="text-sm text-muted-foreground">Import data from the last 30 days when connecting</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ring/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Real-time Monitoring</p>
              <p className="text-sm text-muted-foreground">Monitor mentions and engagement in real-time</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ring/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
      {/* Manual Sync */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Manual Sync</h3>
            <p className="text-sm text-muted-foreground">Force sync all connected platforms now</p>
          </div>
          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
          >
            Sync All Platforms
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsTab;