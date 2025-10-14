import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileTab = () => {
  const { user, updateUser } = useAuth();
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        company: user.company || '',
        jobTitle: user.jobTitle || '',
        phone: user.phone || '',
        website: user.website || '',
        bio: user.bio || ''
      });
      setProfileImage(user.profileImage || 'https://via.placeholder.com/150x150?text=User');
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    alert('Saving profile changes...');
    
    try {
      // Update user data in context and localStorage
      const updatedData = {
        ...profileData,
        profileImage
      };
      updateUser(updatedData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile. Please try again.');
    }
    
    setIsSaving(false);
  };

  const handleImageUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e?.target?.result);
      };
      reader?.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile Photo Section */}
      <div className="bg-black/20 border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Profile Photo</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20">
              <Image 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <label className="absolute bottom-0 right-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-cyan-600 transition-all duration-300">
              <Icon name="Camera" size={16} color="white" />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-300 mb-2">
              Upload a professional photo to help others recognize you
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <label className="cursor-pointer">
                  Upload New Photo
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  if (confirm('Are you sure you want to remove your profile photo?')) {
                    setProfileImage('https://via.placeholder.com/150x150?text=No+Image');
                    alert('Profile photo removed successfully!');
                  }
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Personal Information */}
      <div className="bg-black/20 border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Personal Information</h3>
          {!isEditing ? (
            <Button 
              variant="outline" 
              size="sm" 
              iconName="Edit2" 
              iconPosition="left"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="default" 
                size="sm"
                loading={isSaving}
                iconName="Save"
                iconPosition="left"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            type="text"
            value={profileData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="Last Name"
            type="text"
            value={profileData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="Email Address"
            type="email"
            value={profileData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={true}
            description="Email cannot be changed for security reasons"
            required
          />
          
          <Input
            label="Phone Number"
            type="tel"
            value={profileData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            disabled={!isEditing}
          />
          
          <Input
            label="Company"
            type="text"
            value={profileData?.company}
            onChange={(e) => handleInputChange('company', e?.target?.value)}
            disabled={!isEditing}
          />
          
          <Input
            label="Job Title"
            type="text"
            value={profileData?.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e?.target?.value)}
            disabled={!isEditing}
          />
          
          <div className="md:col-span-2">
            <Input
              label="Website"
              type="url"
              value={profileData?.website}
              onChange={(e) => handleInputChange('website', e?.target?.value)}
              disabled={!isEditing}
              placeholder="https://yourwebsite.com"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white mb-2">
              Bio
            </label>
            <textarea
              value={profileData?.bio}
              onChange={(e) => handleInputChange('bio', e?.target?.value)}
              disabled={!isEditing}
              rows={4}
              className="w-full px-3 py-2 border border-white/20 rounded-lg bg-black/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
              placeholder="Tell us about yourself and your experience..."
            />
            <p className="text-xs text-gray-300 mt-1">
              {profileData?.bio?.length}/500 characters
            </p>
          </div>
        </div>
      </div>
      {/* Account Status */}
      <div className="bg-black/20 border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Account Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-success/10 rounded-lg border border-success/20">
            <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={20} color="white" />
            </div>
            <div>
              <p className="font-medium text-white">Email Verified</p>
              <p className="text-sm text-gray-300">Verified on Sept 15, 2025</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-success/10 rounded-lg border border-success/20">
            <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
              <Icon name="Shield" size={20} color="white" />
            </div>
            <div>
              <p className="font-medium text-white">2FA Enabled</p>
              <p className="text-sm text-gray-300">Enhanced security active</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Crown" size={20} color="white" />
            </div>
            <div>
              <p className="font-medium text-white">{user?.plan || 'Free'} Plan</p>
              <p className="text-sm text-gray-300">Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;