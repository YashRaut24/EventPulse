import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AccountDeletionTab = () => {
  const [deletionReason, setDeletionReason] = useState('');
  const [confirmationText, setConfirmationText] = useState('');
  const [acknowledgments, setAcknowledgments] = useState({
    dataLoss: false,
    noRecovery: false,
    billingCancellation: false,
    exportedData: false
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const deletionReasons = [
    'No longer need the service',
    'Found a better alternative',
    'Too expensive',
    'Privacy concerns',
    'Technical issues',
    'Other'
  ];

  const dataRetentionInfo = [
    {
      type: 'Personal Data',
      retention: 'Deleted immediately',
      description: 'Profile information, preferences, and account settings'
    },
    {
      type: 'Event Data',
      retention: 'Deleted within 30 days',
      description: 'Event configurations, analytics, and performance data'
    },
    {
      type: 'Billing Records',
      retention: 'Retained for 7 years',
      description: 'Required for tax and legal compliance purposes'
    },
    {
      type: 'Support Tickets',
      retention: 'Anonymized after 2 years',
      description: 'Support communications with personal identifiers removed'
    }
  ];

  const handleAcknowledgmentChange = (key, value) => {
    setAcknowledgments(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const canProceedWithDeletion = () => {
    return Object.values(acknowledgments)?.every(Boolean) && 
           confirmationText === 'DELETE MY ACCOUNT' &&
           deletionReason;
  };

  const handleDeleteAccount = async () => {
    if (!canProceedWithDeletion()) return;
    
    setIsDeleting(true);
    // Simulate account deletion process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsDeleting(false);
    // Redirect to goodbye page or login
  };

  return (
    <div className="space-y-8">
      {/* Warning Banner */}
      <div className="bg-error/10 border border-error/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={24} className="text-error mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-error">Account Deletion Warning</h3>
            <p className="text-sm text-muted-foreground mt-2">
              This action is permanent and cannot be undone. Once you delete your account, 
              all your data will be permanently removed from our servers according to our data retention policy.
            </p>
          </div>
        </div>
      </div>
      {/* Before You Delete */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Before You Delete Your Account</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-warning/10 rounded-lg border border-warning/20">
              <Icon name="Download" size={20} className="text-warning mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Export Your Data</p>
                <p className="text-sm text-muted-foreground">
                  Download all your data before deletion. This includes events, analytics, and reports.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Go to Data Export
                </Button>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-info/10 rounded-lg border border-info/20">
              <Icon name="CreditCard" size={20} className="text-info mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Cancel Subscriptions</p>
                <p className="text-sm text-muted-foreground">
                  Your active subscription will be cancelled, but you won't receive a refund for the current period.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  View Billing
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
              <Icon name="Users" size={20} className="text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Team Access</p>
                <p className="text-sm text-muted-foreground">
                  If you're part of a team, consider transferring ownership or removing yourself instead.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
              <Icon name="MessageSquare" size={20} className="text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Contact Support</p>
                <p className="text-sm text-muted-foreground">
                  Having issues? Our support team might be able to help resolve your concerns.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Data Retention Policy */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Data Retention Policy</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Here's what happens to your data after account deletion:
        </p>
        
        <div className="space-y-4">
          {dataRetentionInfo?.map((item, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-foreground">{item?.type}</p>
                  <span className="text-sm text-muted-foreground">{item?.retention}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Deletion Form */}
      {!showConfirmation ? (
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Tell Us Why You're Leaving</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                What's your primary reason for deleting your account?
              </label>
              <div className="space-y-2">
                {deletionReasons?.map((reason, index) => (
                  <label key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-standard">
                    <input
                      type="radio"
                      name="deletionReason"
                      value={reason}
                      checked={deletionReason === reason}
                      onChange={(e) => setDeletionReason(e?.target?.value)}
                      className="w-4 h-4 text-primary border-border focus:ring-ring"
                    />
                    <span className="text-sm text-foreground">{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Additional feedback (optional)
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                placeholder="Help us improve by sharing more details about your experience..."
              />
            </div>

            <Button
              variant="destructive"
              onClick={() => setShowConfirmation(true)}
              disabled={!deletionReason}
              iconName="ArrowRight"
              iconPosition="right"
            >
              Continue to Account Deletion
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-error/20 p-6">
          <h3 className="text-lg font-semibold text-error mb-4">Final Confirmation</h3>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Please acknowledge that you understand the consequences of deleting your account:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={acknowledgments?.dataLoss}
                    onChange={(e) => handleAcknowledgmentChange('dataLoss', e?.target?.checked)}
                  />
                  <label className="text-sm text-foreground">
                    I understand that all my data will be permanently deleted and cannot be recovered
                  </label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={acknowledgments?.noRecovery}
                    onChange={(e) => handleAcknowledgmentChange('noRecovery', e?.target?.checked)}
                  />
                  <label className="text-sm text-foreground">
                    I understand that this action is irreversible and my account cannot be restored
                  </label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={acknowledgments?.billingCancellation}
                    onChange={(e) => handleAcknowledgmentChange('billingCancellation', e?.target?.checked)}
                  />
                  <label className="text-sm text-foreground">
                    I understand that my subscription will be cancelled without refund
                  </label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={acknowledgments?.exportedData}
                    onChange={(e) => handleAcknowledgmentChange('exportedData', e?.target?.checked)}
                  />
                  <label className="text-sm text-foreground">
                    I have exported any data I want to keep (or don't need to export data)
                  </label>
                </div>
              </div>
            </div>

            <Input
              label="Type 'DELETE MY ACCOUNT' to confirm"
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e?.target?.value)}
              placeholder="DELETE MY ACCOUNT"
              description="This confirmation is required to proceed with account deletion"
              error={confirmationText && confirmationText !== 'DELETE MY ACCOUNT' ? 'Please type exactly: DELETE MY ACCOUNT' : ''}
            />

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                loading={isDeleting}
                onClick={handleDeleteAccount}
                disabled={!canProceedWithDeletion()}
                iconName="Trash2"
                iconPosition="left"
              >
                {isDeleting ? 'Deleting Account...' : 'Delete My Account'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDeletionTab;