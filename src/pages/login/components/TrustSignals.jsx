import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const socialPlatforms = [
    { name: 'Facebook', icon: 'Facebook', color: '#1877F2' },
    { name: 'Twitter', icon: 'Twitter', color: '#1DA1F2' },
    { name: 'Instagram', icon: 'Instagram', color: '#E4405F' },
    { name: 'LinkedIn', icon: 'Linkedin', color: '#0A66C2' },
    { name: 'YouTube', icon: 'Youtube', color: '#FF0000' },
    { name: 'TikTok', icon: 'Music', color: '#000000' }
  ];

  const securityFeatures = [
    { icon: 'Shield', text: 'SSL Encrypted' },
    { icon: 'Lock', text: 'Secure Login' },
    { icon: 'Eye', text: 'Privacy Protected' }
  ];

  return (
    <div className="space-y-6">
      {/* Social Media Integration */}
      <div className="text-center">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Integrated Social Media Platforms
        </h3>
        <div className="flex items-center justify-center space-x-4">
          {socialPlatforms?.map((platform) => (
            <div
              key={platform?.name}
              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:scale-110 transition-transform"
              title={platform?.name}
            >
              <Icon 
                name={platform?.icon} 
                size={16} 
                className="text-muted-foreground" 
              />
            </div>
          ))}
        </div>
      </div>
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-6">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Icon 
              name={feature?.icon} 
              size={16} 
              className="text-success" 
            />
            <span className="text-xs text-muted-foreground font-medium">
              {feature?.text}
            </span>
          </div>
        ))}
      </div>
      {/* Certification Badge */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-2 bg-success/10 border border-success/20 rounded-full">
          <Icon name="CheckCircle" size={14} className="text-success" />
          <span className="text-xs text-success font-medium">
            SOC 2 Type II Certified
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;