import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'Your data is encrypted and secure'
    },
    {
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'GDPR compliant data handling'
    },
    {
      icon: 'CheckCircle',
      title: 'Platform Certified',
      description: 'Verified by major social platforms'
    }
  ];

  const platformCertifications = [
    { name: 'Facebook Marketing Partner', verified: true },
    { name: 'Twitter Official Partner', verified: true },
    { name: 'LinkedIn Marketing Solutions', verified: true },
    { name: 'Instagram Business Tools', verified: true }
  ];

  return (
    <div className="space-y-6">
      {/* Security Badges */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Shield" size={20} className="mr-2 text-success" />
          Security & Privacy
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {trustBadges?.map((badge, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name={badge?.icon} size={16} className="text-success" />
              </div>
              <div>
                <div className="font-medium text-foreground text-sm">{badge?.title}</div>
                <div className="text-xs text-muted-foreground">{badge?.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Platform Certifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Award" size={20} className="mr-2 text-primary" />
          Platform Certifications
        </h3>
        
        <div className="space-y-3">
          {platformCertifications?.map((cert, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{cert?.name}</span>
              {cert?.verified && (
                <div className="flex items-center space-x-1">
                  <Icon name="CheckCircle" size={14} className="text-success" />
                  <span className="text-xs text-success font-medium">Verified</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Data Protection Notice */}
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Your data is protected</p>
            <p>We use industry-standard encryption and never share your personal information with third parties. All social media data is processed securely and stored in compliance with international privacy regulations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;