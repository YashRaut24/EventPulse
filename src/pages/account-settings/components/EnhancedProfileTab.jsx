import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import EditableField from './EditableField.jsx';

const EnhancedProfileTab = () => {
  const { user, updateUser } = useAuth();
  const [profileImage, setProfileImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileImage(user.profileImage || 'https://via.placeholder.com/150x150?text=User');
    }
  }, [user]);

  const handleFieldSave = async (field, value) => {
    try {
      const updatedData = { [field]: value };
      updateUser(updatedData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show success message
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
      alert(`${fieldName} updated successfully!`);
    } catch (error) {
      throw new Error('Failed to update field');
    }
  };

  const handleImageUpload = async (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setIsUploading(true);
      
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = e?.target?.result;
          setProfileImage(newImage);
          updateUser({ profileImage: newImage });
          alert('Profile photo updated successfully!');
          setIsUploading(false);
        };
        reader?.readAsDataURL(file);
      } catch (error) {
        alert('Error uploading image');
        setIsUploading(false);
      }
    }
  };

  const handleRemoveImage = () => {
    if (confirm('Are you sure you want to remove your profile photo?')) {
      const defaultImage = 'https://via.placeholder.com/150x150?text=No+Image';
      setProfileImage(defaultImage);
      updateUser({ profileImage: defaultImage });
      alert('Profile photo removed successfully!');
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile Photo Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/20 border border-white/10 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-6">Profile Photo</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20">
              <Image 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <Icon name="Loader2" size={24} className="text-white animate-spin" />
              </div>
            )}
            
            <label className="absolute bottom-2 right-2 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-cyan-600 transition-all duration-300 shadow-lg">
              <Icon name="Camera" size={18} color="white" />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          </div>
          
          <div className="flex-1">
            <h4 className="text-white font-medium mb-2">Update your photo</h4>
            <p className="text-gray-300 text-sm mb-4">
              Upload a professional photo to help others recognize you. Recommended size: 400x400px.
            </p>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition-colors"
              >
                <label className="cursor-pointer flex items-center space-x-2">
                  <Icon name="Upload" size={16} />
                  <span>Upload New</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRemoveImage}
                className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <Icon name="Trash2" size={16} className="mr-2" />
                Remove
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-black/20 border border-white/10 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-6">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EditableField
            label="First Name"
            value={user?.firstName}
            onSave={(value) => handleFieldSave('firstName', value)}
            placeholder="Enter your first name"
          />
          
          <EditableField
            label="Last Name"
            value={user?.lastName}
            onSave={(value) => handleFieldSave('lastName', value)}
            placeholder="Enter your last name"
          />
          
          <EditableField
            label="Email Address"
            value={user?.email}
            disabled={true}
          />
          
          <EditableField
            label="Phone Number"
            value={user?.phone}
            onSave={(value) => handleFieldSave('phone', value)}
            type="tel"
            placeholder="+1 (555) 123-4567"
          />
          
          <EditableField
            label="Company"
            value={user?.company}
            onSave={(value) => handleFieldSave('company', value)}
            placeholder="Your company name"
          />
          
          <EditableField
            label="Job Title"
            value={user?.jobTitle}
            onSave={(value) => handleFieldSave('jobTitle', value)}
            placeholder="Your job title"
          />
          
          <div className="md:col-span-2">
            <EditableField
              label="Website"
              value={user?.website}
              onSave={(value) => handleFieldSave('website', value)}
              type="url"
              placeholder="https://yourwebsite.com"
            />
          </div>
          
          <div className="md:col-span-2">
            <EditableField
              label="Bio"
              value={user?.bio}
              onSave={(value) => handleFieldSave('bio', value)}
              placeholder="Tell us about yourself and your experience..."
              multiline={true}
            />
          </div>
        </div>
      </motion.div>

      {/* Account Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-black/20 border border-white/10 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-6">Account Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">Account ID</label>
            <div className="px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-400 font-mono text-sm">
              {user?.id || 'N/A'}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">Member Since</label>
            <div className="px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-400">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'N/A'}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">Current Plan</label>
            <div className="flex items-center space-x-2">
              <div className="px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-lg text-cyan-400 font-medium">
                {user?.plan || 'Free'} Plan
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors text-sm"
              >
                Upgrade
              </motion.button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">Account Status</label>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400 font-medium">Active</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-black/20 border border-white/10 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-all duration-300 text-left"
          >
            <Icon name="Download" size={20} className="text-blue-400 mb-2" />
            <h4 className="text-white font-medium mb-1">Export Data</h4>
            <p className="text-gray-400 text-sm">Download your account data</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-all duration-300 text-left"
          >
            <Icon name="Shield" size={20} className="text-green-400 mb-2" />
            <h4 className="text-white font-medium mb-1">Security Settings</h4>
            <p className="text-gray-400 text-sm">Manage your security preferences</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-all duration-300 text-left"
          >
            <Icon name="Bell" size={20} className="text-purple-400 mb-2" />
            <h4 className="text-white font-medium mb-1">Notifications</h4>
            <p className="text-gray-400 text-sm">Configure notification settings</p>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedProfileTab;