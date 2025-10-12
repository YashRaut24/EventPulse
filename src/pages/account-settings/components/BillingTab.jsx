import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BillingTab = () => {
  const [currentPlan] = useState({
    name: 'Pro Plan',
    price: 49,
    billing: 'monthly',
    nextBilling: 'October 15, 2025',
    features: [
      'Unlimited events tracking',
      'Advanced analytics dashboard',
      'Real-time sentiment analysis',
      'Competitor benchmarking',
      'Custom reports & exports',
      'Priority support'
    ]
  });

  const [usageStats] = useState({
    eventsTracked: 12,
    eventsLimit: 50,
    socialAccounts: 8,
    socialLimit: 20,
    apiCalls: 45230,
    apiLimit: 100000,
    storageUsed: 2.3,
    storageLimit: 10
  });

  const [paymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      brand: 'Visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2026,
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      brand: 'Mastercard',
      last4: '8888',
      expiryMonth: 8,
      expiryYear: 2025,
      isDefault: false
    }
  ]);

  const [billingHistory] = useState([
    {
      id: 'inv_001',
      date: 'September 15, 2025',
      amount: 49.00,
      status: 'paid',
      description: 'Pro Plan - Monthly',
      downloadUrl: '#'
    },
    {
      id: 'inv_002',
      date: 'August 15, 2025',
      amount: 49.00,
      status: 'paid',
      description: 'Pro Plan - Monthly',
      downloadUrl: '#'
    },
    {
      id: 'inv_003',
      date: 'July 15, 2025',
      amount: 49.00,
      status: 'paid',
      description: 'Pro Plan - Monthly',
      downloadUrl: '#'
    }
  ]);

  const plans = [
    {
      name: 'Starter',
      price: 19,
      features: [
        'Up to 5 events',
        'Basic analytics',
        'Email support',
        '3 social accounts'
      ]
    },
    {
      name: 'Pro',
      price: 49,
      features: [
        'Up to 50 events',
        'Advanced analytics',
        'Real-time monitoring',
        '20 social accounts',
        'Priority support'
      ],
      current: true
    },
    {
      name: 'Enterprise',
      price: 149,
      features: [
        'Unlimited events',
        'Custom analytics',
        'Dedicated support',
        'Unlimited accounts',
        'API access'
      ]
    }
  ];

  const getUsagePercentage = (used, limit) => {
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return 'text-error';
    if (percentage >= 70) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Current Plan</h3>
            <p className="text-sm text-muted-foreground">Manage your subscription and billing</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">${currentPlan?.price}</div>
            <div className="text-sm text-muted-foreground">per {currentPlan?.billing}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Crown" size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{currentPlan?.name}</h4>
                <p className="text-sm text-muted-foreground">Next billing: {currentPlan?.nextBilling}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {currentPlan?.features?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Events Tracked</span>
                <span className="text-sm text-muted-foreground">
                  {usageStats?.eventsTracked} / {usageStats?.eventsLimit}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${getUsagePercentage(usageStats?.eventsTracked, usageStats?.eventsLimit)}%` }}
                ></div>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Social Accounts</span>
                <span className="text-sm text-muted-foreground">
                  {usageStats?.socialAccounts} / {usageStats?.socialLimit}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-secondary h-2 rounded-full transition-all"
                  style={{ width: `${getUsagePercentage(usageStats?.socialAccounts, usageStats?.socialLimit)}%` }}
                ></div>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">API Calls</span>
                <span className="text-sm text-muted-foreground">
                  {usageStats?.apiCalls?.toLocaleString()} / {usageStats?.apiLimit?.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-accent h-2 rounded-full transition-all"
                  style={{ width: `${getUsagePercentage(usageStats?.apiCalls, usageStats?.apiLimit)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <Button variant="default" iconName="CreditCard" iconPosition="left">
            Upgrade Plan
          </Button>
          <Button variant="outline">
            Change Billing Cycle
          </Button>
          <Button variant="ghost">
            Cancel Subscription
          </Button>
        </div>
      </div>
      {/* Available Plans */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans?.map((plan, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-lg border-2 transition-all ${
                plan?.current 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <div className="text-center mb-4">
                <h4 className="font-semibold text-foreground text-lg">{plan?.name}</h4>
                <div className="text-3xl font-bold text-foreground mt-2">${plan?.price}</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
              
              <div className="space-y-3 mb-6">
                {plan?.features?.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                variant={plan?.current ? "outline" : "default"} 
                fullWidth
                disabled={plan?.current}
              >
                {plan?.current ? 'Current Plan' : 'Upgrade'}
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Payment Methods */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Payment Methods</h3>
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Add Payment Method
          </Button>
        </div>
        
        <div className="space-y-4">
          {paymentMethods?.map((method) => (
            <div key={method?.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="CreditCard" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">
                      {method?.brand} •••• {method?.last4}
                    </span>
                    {method?.isDefault && (
                      <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full border border-success/20">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Expires {method?.expiryMonth}/{method?.expiryYear}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                {!method?.isDefault && (
                  <Button variant="ghost" size="sm">
                    Set Default
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Billing History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Billing History</h3>
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Download All
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Description</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory?.map((invoice) => (
                <tr key={invoice?.id} className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm text-foreground">{invoice?.date}</td>
                  <td className="py-3 px-4 text-sm text-foreground">{invoice?.description}</td>
                  <td className="py-3 px-4 text-sm text-foreground">${invoice?.amount?.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      invoice?.status === 'paid' ?'bg-success/10 text-success border border-success/20' :'bg-warning/10 text-warning border border-warning/20'
                    }`}>
                      {invoice?.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm" iconName="Download">
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingTab;