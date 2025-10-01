import React, { useState, useRef } from 'react';
import { User, Mail, Phone, MapPin, Camera, Shield, Bell, Share2, Facebook, Instagram, Twitter, Settings,CheckCircle,Upload,Save,Edit3,Globe,Calendar,Users,BarChart3,Star,Award,Lock} from 'lucide-react';
import axios from "axios";

import './Profile.css';

function Profile(){
  const [isEditing, setIsEditing] = useState(false);
  const [userRole, setUserRole] = useState('organizer'); 
  const [avatar, setAvatar] = useState();
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    bio: '',
    website: '',
    specialties: [],
    avatar: ''
  });

  const [notifications, setNotifications] = useState({
    eventRegistrations: true,
    eventUpdates: true,
    promotionalTips: true,
    socialMedia: false,
    smsAlerts: true,
    emailDigest: true
  });

  const [socialAccounts, setSocialAccounts] = useState({
    facebook: { connected: true, followers: '2.1K' },
    instagram: { connected: true, followers: '1.8K' },
    twitter: { connected: false, followers: '0' }
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (setting) => {
    setNotifications(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const [newSpecialty, setNewSpecialty] = useState("");

const handleSave = async () => {
  setIsEditing(false);

  // If user typed something but didn't press Enter
  let updatedProfile = { ...profileData };
  if (newSpecialty.trim()) {
    updatedProfile.specialties = [...profileData.specialties, newSpecialty.trim()];
    setProfileData(updatedProfile);
    setNewSpecialty(""); // clear input
  }

  try {
    const response = await axios.post("http://localhost:9000/save", updatedProfile);
    alert("Profile Saved successfully!");
    console.log("Saved Profile:", response.data);
  } catch (error) {
    console.error("Error saving profile:", error);
    alert("Error saving profile.");
  }
};


  const connectSocialAccount = (platform) => {
    setSocialAccounts(prev => ({
      ...prev,
      [platform]: { ...prev[platform], connected: !prev[platform].connected }
    }));
  };

const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  try {
    const res = await axios.post("http://localhost:9000/upload-avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    const url = res.data.url;
    setAvatar(url); 
    setProfileData(prev => ({ ...prev, avatar: url })); 
  } catch (err) {
    console.error(err);
  }
};


const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setAvatar(imageUrl); // show preview immediately
    uploadAvatar(file);  // send to server
  }
};



  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-header-card">
          <div className="profile-header-bg">
            <div className="profile-header-overlay"></div>
          </div>
          <div className="profile-header-content">
            <div className="profile-picture-section">
              <div className="profile-picture-wrapper">
            <img src={avatar || profileData.avatar || "/image.png"}  alt="Profile" className="profile-picture" />

                <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                <button
                    className="profile-picture-edit"
                    onClick={() => fileInputRef.current.click()}
                >
                    <Camera size={18} />
                </button>
            </div>
              <div className="profile-info">
                <div className="profile-name-section">
                  <h1 className="profile-name">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  <div className="verified-badge">
                    <CheckCircle size={16} />
                    <span>Verified</span>
                  </div>
                </div>
                <p className="profile-role">
                  {userRole === 'organizer' ? 'Event Organizer' : 'Event Host'}
                </p>
                <p className="profile-company">{profileData.company}</p>
              </div>
            </div>

            <div className="quick-stats">
              <div className="stat-card stat-blue">
                <div className="stat-content">
                  <Calendar size={24} />
                  <div className="stat-info">
                    <p className="stat-number">24</p>
                    <p className="stat-label">Events Organized</p>
                  </div>
                </div>
              </div>
              <div className="stat-card stat-green">
                <div className="stat-content">
                  <Users size={24} />
                  <div className="stat-info">
                    <p className="stat-number">1.2K</p>
                    <p className="stat-label">Total Attendees</p>
                  </div>
                </div>
              </div>
              <div className="stat-card stat-purple">
                <div className="stat-content">
                  <Share2 size={24} />
                  <div className="stat-info">
                    <p className="stat-number">94%</p>
                    <p className="stat-label">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-form-card">
          <div className="form-header">
            <h2 className="form-title">Profile Information</h2>
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="edit-btn"
            >
              {isEditing ? <Save size={20} /> : <Edit3 size={20} />}
              <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
            </button>
          </div>

          <div className="form-grid">
            <div className="form-section">
              <h3 className="section-title">Basic Information</h3>
              
              <div className="name-grid">
                <div className="input-group">
                  <label className="input-label">First Name</label>
                  <input 
                    type="text" 
                    value={profileData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Last Name</label>
                  <input 
                    type="text" 
                    value={profileData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Email</label>
                <div className="input-with-icon">
                  <Mail className="input-icon" size={20} />
                  <input 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="form-input icon-input"
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Phone</label>
                <div className="input-with-icon">
                  <Phone className="input-icon" size={20} />
                  <input 
                    type="tel" 
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="form-input icon-input"
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Role</label>
                <select 
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  disabled={!isEditing}
                  className="form-input"
                >
                  <option value="organizer">Event Organizer</option>
                  <option value="host">Event Host</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Professional Details</h3>
              
              <div className="input-group">
                <label className="input-label">Company/Organization</label>
                <input 
                  type="text" 
                  value={profileData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Location</label>
                <div className="input-with-icon">
                  <MapPin className="input-icon" size={20} />
                  <input 
                    type="text" 
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                    className="form-input icon-input"
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Website</label>
                <div className="input-with-icon">
                  <Globe className="input-icon" size={20} />
                  <input 
                    type="url" 
                    value={profileData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    disabled={!isEditing}
                    className="form-input icon-input"
                  />
                </div>
              </div>

             <div className="input-group">
                <label className="input-label">Specialties</label>
                <div className="specialties-tags">
                    {profileData.specialties.map((specialty, index) => (
                    <span key={index} className="specialty-tag">
                        {specialty}
                        {isEditing && (
                        <button
                            type="button"
                            className="remove-tag-btn"
                            onClick={() => {
                            setProfileData(prev => ({
                                ...prev,
                                specialties: prev.specialties.filter((_, i) => i !== index)
                            }));
                            }}
                        >
                            ×
                        </button>
                        )}
                    </span>
                    ))}
                </div>

                {isEditing && (
                    <input
                    type="text"
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && newSpecialty.trim()) {
                        e.preventDefault(); 
                        setProfileData(prev => ({
                            ...prev,
                            specialties: prev.specialties.includes(newSpecialty.trim())
                            ? prev.specialties
                            : [...prev.specialties, newSpecialty.trim()]
                        }));
                        setNewSpecialty("");
                        }
                    }}
                    placeholder="Add specialty and press Enter"
                    className="form-input"
                    />
                )}
            </div>

           </div>
          </div>

          <div className="bio-section">
            <label className="input-label">Professional Bio</label>
            <textarea 
              value={profileData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              disabled={!isEditing}
              rows={4}
              className="form-textarea"
              placeholder="Tell us about your experience and expertise in event management..."
            />
          </div>
            <div className="profile-card analytics-card">
                <h2 className="card-title">Analytics Snapshot</h2>
                <div className="analytics-grid">
                    <div className="stat-card stat-blue">
                    <BarChart3 size={22} />
                    <p>Avg Attendance: 78%</p>
                    </div>
                    <div className="stat-card stat-green">
                    <Users size={22} />
                    <p>Total Attendees: 2500+</p>
                    </div>
                    <div className="stat-card stat-purple">
                    <Star size={22} />
                    <p>Avg Feedback: 4.5/5</p>
                    </div>
                </div>
            </div>

            <div className="profile-card">
                <h2 className="card-title">Event History</h2>
                <ul className="event-history-list">
                    <li>Music Fest 2024 – 1200 Attendees</li>
                    <li>Startup Summit – 450 Attendees</li>
                    <li>Wedding Expo – 800 Attendees</li>
                </ul>
                <button className="view-all-btn">View All</button>
            </div>

            <div className="profile-card">
                <h2 className="card-title">Achievements</h2>
                <div className="badges">
                    <span className="badge gold"><Award size={16}/> Top Organizer</span>
                    <span className="badge blue"><Users size={16}/> 1000+ Attendees</span>
                    <span className="badge purple"><Star size={16}/> 50+ 5★ Ratings</span>
                </div>
            </div>
        </div>

        <div className="social-media-card">
          <h2 className="card-title">Social Media Integration</h2>
          
          <div className="social-grid">
            <div className="social-item">
              <div className="social-header">
                <div className="social-info">
                  <Facebook className="social-icon facebook" size={24} />
                  <div className="social-details">
                    <h3 className="social-name">Facebook</h3>
                    <p className="social-followers">{socialAccounts.facebook.followers} followers</p>
                  </div>
                </div>
                <div className={`connection-status ${socialAccounts.facebook.connected ? 'connected' : 'disconnected'}`}></div>
              </div>
              <button 
                onClick={() => connectSocialAccount('facebook')}
                className={`social-btn ${socialAccounts.facebook.connected ? 'disconnect' : 'connect-facebook'}`}
              >
                {socialAccounts.facebook.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>

            <div className="social-item">
              <div className="social-header">
                <div className="social-info">
                  <Instagram className="social-icon instagram" size={24} />
                  <div className="social-details">
                    <h3 className="social-name">Instagram</h3>
                    <p className="social-followers">{socialAccounts.instagram.followers} followers</p>
                  </div>
                </div>
                <div className={`connection-status ${socialAccounts.instagram.connected ? 'connected' : 'disconnected'}`}></div>
              </div>
              <button 
                onClick={() => connectSocialAccount('instagram')}
                className={`social-btn ${socialAccounts.instagram.connected ? 'disconnect' : 'connect-instagram'}`}
              >
                {socialAccounts.instagram.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>

            <div className="social-item">
              <div className="social-header">
                <div className="social-info">
                  <Twitter className="social-icon twitter" size={24} />
                  <div className="social-details">
                    <h3 className="social-name">Twitter</h3>
                    <p className="social-followers">Not connected</p>
                  </div>
                </div>
                <div className={`connection-status ${socialAccounts.twitter.connected ? 'connected' : 'disconnected'}`}></div>
              </div>
              <button 
                onClick={() => connectSocialAccount('twitter')}
                className={`social-btn ${socialAccounts.twitter.connected ? 'disconnect' : 'connect-twitter'}`}
              >
                {socialAccounts.twitter.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
        </div>

        <div className="notifications-card">
          <h2 className="card-title">Notification Preferences</h2>
          
          <div className="notifications-list">
            <div className="notification-item">
              <div className="notification-info">
                <Bell className="notification-icon bell" size={20} />
                <div className="notification-details">
                  <h3 className="notification-title">Event Registrations</h3>
                  <p className="notification-desc">Get notified when someone registers for your events</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notifications.eventRegistrations}
                  onChange={() => handleNotificationChange('eventRegistrations')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <Calendar className="notification-icon calendar" size={20} />
                <div className="notification-details">
                  <h3 className="notification-title">Event Updates</h3>
                  <p className="notification-desc">Receive updates about your upcoming events</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notifications.eventUpdates}
                  onChange={() => handleNotificationChange('eventUpdates')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <Share2 className="notification-icon share" size={20} />
                <div className="notification-details">
                  <h3 className="notification-title">Promotional Tips</h3>
                  <p className="notification-desc">Get marketing and promotion suggestions</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notifications.promotionalTips}
                  onChange={() => handleNotificationChange('promotionalTips')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <Phone className="notification-icon phone" size={20} />
                <div className="notification-details">
                  <h3 className="notification-title">SMS Alerts</h3>
                  <p className="notification-desc">Receive text messages for urgent updates</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notifications.smsAlerts}
                  onChange={() => handleNotificationChange('smsAlerts')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <Mail className="notification-icon mail" size={20} />
                <div className="notification-details">
                  <h3 className="notification-title">Email Digest</h3>
                  <p className="notification-desc">Weekly summary of your event performance</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notifications.emailDigest}
                  onChange={() => handleNotificationChange('emailDigest')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="profile-card security-card">
            <h2 className="card-title">Security & Account</h2>
            <div className="security-options">
                <button className="security-btn"><Lock size={16}/> Change Password</button>
                <button className="security-btn"><Shield size={16}/> Enable 2FA</button>
                <button className="delete-btn">Delete Account</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;