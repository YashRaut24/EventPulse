import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';


const RegistrationForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    eventType: '',
    platforms: [],
    eventCategories: [],
    agreeToTerms: false,
    subscribeNewsletter: false
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const eventTypeOptions = [
    { value: 'corporate', label: 'Corporate Events' },
    { value: 'conference', label: 'Conferences & Trade Shows' },
    { value: 'festival', label: 'Festivals & Entertainment' },
    { value: 'wedding', label: 'Weddings & Private Events' },
    { value: 'nonprofit', label: 'Nonprofit & Fundraising' },
    { value: 'product', label: 'Product Launches' },
    { value: 'other', label: 'Other' }
  ];

  const platformOptions = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'Twitter/X' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'youtube', label: 'YouTube' }
  ];

  const categoryOptions = [
    { value: 'business', label: 'Business & Professional' },
    { value: 'technology', label: 'Technology & Innovation' },
    { value: 'entertainment', label: 'Entertainment & Arts' },
    { value: 'sports', label: 'Sports & Recreation' },
    { value: 'education', label: 'Education & Training' },
    { value: 'health', label: 'Health & Wellness' }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 25;
    return strength;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.company?.trim()) {
      newErrors.company = 'Company/Organization name is required';
    }

    if (!formData?.eventType) {
      newErrors.eventType = 'Please select an event type';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-error';
    if (passwordStrength < 50) return 'bg-warning';
    if (passwordStrength < 75) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
        
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          description="We'll send a verification email to this address"
          required
        />

        <div className="space-y-2">
          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />
          
          {formData?.password && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Password strength:</span>
                <span className={`font-medium ${passwordStrength >= 75 ? 'text-success' : passwordStrength >= 50 ? 'text-accent' : 'text-warning'}`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1">
                <div 
                  className={`h-1 rounded-full transition-all ${getPasswordStrengthColor()}`}
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />

        <Input
          label="Company/Organization"
          type="text"
          placeholder="Enter your company or organization name"
          value={formData?.company}
          onChange={(e) => handleInputChange('company', e?.target?.value)}
          error={errors?.company}
          required
        />

        <Select
          label="Primary Event Type"
          placeholder="Select your primary event type"
          options={eventTypeOptions}
          value={formData?.eventType}
          onChange={(value) => handleInputChange('eventType', value)}
          error={errors?.eventType}
          required
        />
      </div>
      {/* Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Preferences</h3>
        
        <Select
          label="Primary Social Media Platforms"
          placeholder="Select platforms you use most"
          options={platformOptions}
          value={formData?.platforms}
          onChange={(value) => handleInputChange('platforms', value)}
          multiple
          searchable
          description="Choose the platforms you want to monitor"
        />

        <Select
          label="Event Categories"
          placeholder="Select relevant categories"
          options={categoryOptions}
          value={formData?.eventCategories}
          onChange={(value) => handleInputChange('eventCategories', value)}
          multiple
          searchable
          description="Help us personalize your experience"
        />
      </div>
      {/* Terms and Newsletter */}
      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={formData?.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label="Subscribe to newsletter for platform updates and tips"
          description="Get the latest features and best practices delivered to your inbox"
          checked={formData?.subscribeNewsletter}
          onChange={(e) => handleInputChange('subscribeNewsletter', e?.target?.checked)}
        />
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegistrationForm;