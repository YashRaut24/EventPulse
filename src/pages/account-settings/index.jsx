import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Icon from '../../components/AppIcon';
import ProfileTab from './components/ProfileTab';
import NotificationsTab from './components/NotificationsTab';
import IntegrationsTab from './components/IntegrationsTab';
import SecurityTab from './components/SecurityTab';
import BillingTab from './components/BillingTab';
import DataExportTab from './components/DataExportTab';
import AccountDeletionTab from './components/AccountDeletionTab';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      component: ProfileTab
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      component: NotificationsTab
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: 'Link',
      component: IntegrationsTab
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      component: SecurityTab
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: 'CreditCard',
      component: BillingTab
    },
    {
      id: 'data-export',
      label: 'Data Export',
      icon: 'Download',
      component: DataExportTab
    },
    {
      id: 'account-deletion',
      label: 'Delete Account',
      icon: 'Trash2',
      component: AccountDeletionTab
    }
  ];

  const ActiveComponent = tabs?.find(tab => tab?.id === activeTab)?.component || ProfileTab;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumbs />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
                <p className="text-muted-foreground">Manage your EventPulse account preferences and configurations</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-4 sticky top-24">
                <nav className="space-y-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-standard ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon 
                        name={tab?.icon} 
                        size={18} 
                        className={activeTab === tab?.id ? 'text-primary-foreground' : 'text-muted-foreground'} 
                      />
                      <span className="font-medium">{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-lg border border-border">
                {/* Tab Header */}
                <div className="px-6 py-4 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={tabs?.find(tab => tab?.id === activeTab)?.icon || 'User'} 
                      size={20} 
                      className="text-primary" 
                    />
                    <h2 className="text-xl font-semibold text-foreground">
                      {tabs?.find(tab => tab?.id === activeTab)?.label || 'Profile'}
                    </h2>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  <ActiveComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default AccountSettings;