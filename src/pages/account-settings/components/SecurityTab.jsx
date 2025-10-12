import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SecurityTab = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const [activeSessions] = useState([
    {
      id: 1,
      device: 'MacBook Pro',
      browser: 'Chrome 118.0',
      location: 'San Francisco, CA',
      ipAddress: '192.168.1.100',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: 2,
      device: 'iPhone 15',
      browser: 'Safari Mobile',
      location: 'San Francisco, CA',
      ipAddress: '192.168.1.101',
      lastActive: '1 hour ago',
      current: false
    },
    {
      id: 3,
      device: 'Windows PC',
      browser: 'Edge 118.0',
      location: 'New York, NY',
      ipAddress: '10.0.0.50',
      lastActive: '2 days ago',
      current: false
    }
  ]);

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChangePassword = async () => {
    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      return;
    }
    
    setIsChangingPassword(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleToggle2FA = async () => {
    if (twoFactorEnabled) {
      setTwoFactorEnabled(false);
    } else {
      setIsEnabling2FA(true);
      setShowQRCode(true);
      // Simulate enabling 2FA
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEnabling2FA(false);
    }
  };

  const handleComplete2FA = () => {
    setTwoFactorEnabled(true);
    setShowQRCode(false);
  };

  const handleLogoutSession = (sessionId) => {
    // Handle session logout
    console.log('Logging out session:', sessionId);
  };

  const handleLogoutAllSessions = () => {
    // Handle logout all sessions
    console.log('Logging out all sessions');
  };

  return (
    <div className="space-y-8">
      {/* Password Change */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={passwordData?.currentPassword}
            onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
            placeholder="Enter current password"
            required
          />
          
          <Input
            label="New Password"
            type="password"
            value={passwordData?.newPassword}
            onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
            placeholder="Enter new password"
            description="Password must be at least 8 characters long"
            required
          />
          
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordData?.confirmPassword}
            onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
            placeholder="Confirm new password"
            error={passwordData?.confirmPassword && passwordData?.newPassword !== passwordData?.confirmPassword ? 'Passwords do not match' : ''}
            required
          />
          
          <Button
            variant="default"
            loading={isChangingPassword}
            iconName="Lock"
            iconPosition="left"
            onClick={handleChangePassword}
            disabled={!passwordData?.currentPassword || !passwordData?.newPassword || passwordData?.newPassword !== passwordData?.confirmPassword}
          >
            Change Password
          </Button>
        </div>
      </div>
      {/* Two-Factor Authentication */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            twoFactorEnabled 
              ? 'bg-success/10 text-success border border-success/20' :'bg-warning/10 text-warning border border-warning/20'
          }`}>
            {twoFactorEnabled ? 'Enabled' : 'Disabled'}
          </div>
        </div>

        {twoFactorEnabled ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-success/10 rounded-lg border border-success/20">
              <Icon name="Shield" size={20} className="text-success" />
              <div>
                <p className="font-medium text-foreground">2FA is active</p>
                <p className="text-sm text-muted-foreground">Your account is protected with two-factor authentication</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                View Recovery Codes
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleToggle2FA}
              >
                Disable 2FA
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {!showQRCode ? (
              <div>
                <div className="flex items-center space-x-3 p-4 bg-warning/10 rounded-lg border border-warning/20 mb-4">
                  <Icon name="AlertTriangle" size={20} className="text-warning" />
                  <div>
                    <p className="font-medium text-foreground">2FA is not enabled</p>
                    <p className="text-sm text-muted-foreground">Your account is less secure without two-factor authentication</p>
                  </div>
                </div>
                <Button
                  variant="default"
                  loading={isEnabling2FA}
                  iconName="Shield"
                  iconPosition="left"
                  onClick={handleToggle2FA}
                >
                  Enable Two-Factor Authentication
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center p-6 bg-muted/50 rounded-lg">
                  <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center">
                      <Icon name="QrCode" size={48} className="text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">QR Code</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Scan this QR code with your authenticator app
                  </p>
                  <p className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                    ABCD-EFGH-IJKL-MNOP
                  </p>
                </div>
                <div className="max-w-xs mx-auto">
                  <Input
                    label="Verification Code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    description="Enter the code from your authenticator app"
                  />
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" onClick={() => setShowQRCode(false)}>
                      Cancel
                    </Button>
                    <Button variant="default" onClick={handleComplete2FA}>
                      Verify & Enable
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Active Sessions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Active Sessions</h3>
          <Button
            variant="outline"
            size="sm"
            iconName="LogOut"
            iconPosition="left"
            onClick={handleLogoutAllSessions}
          >
            Logout All Sessions
          </Button>
        </div>
        
        <div className="space-y-4">
          {activeSessions?.map((session) => (
            <div key={session?.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon 
                    name={session?.device?.includes('iPhone') ? 'Smartphone' : session?.device?.includes('MacBook') ? 'Laptop' : 'Monitor'} 
                    size={20} 
                    className="text-primary" 
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-foreground">{session?.device}</p>
                    {session?.current && (
                      <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full border border-success/20">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{session?.browser} • {session?.location}</p>
                  <p className="text-xs text-muted-foreground">IP: {session?.ipAddress} • Last active: {session?.lastActive}</p>
                </div>
              </div>
              {!session?.current && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="LogOut"
                  onClick={() => handleLogoutSession(session?.id)}
                >
                  Logout
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Security Recommendations */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Security Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg border border-success/20">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm text-foreground">Strong password enabled</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg border border-success/20">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm text-foreground">Two-factor authentication enabled</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm text-foreground">Consider reviewing active sessions regularly</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;