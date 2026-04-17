import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

class ApiService {
  async request(endpoint, options = {}) {
    const config = {
      ...options,
      headers: {
        ...options.headers,
      },
    };

    try {
      const response = await api(endpoint, config);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Request failed');
    }
  }

  async signUp(userData) {
    return this.request('/auth/signup', {
      method: 'POST',
      data: userData,
    });
  }

  async signIn(credentials) {
    return this.request('/auth/signin', {
      method: 'POST',
      data: credentials,
    });
  }

  async updateUser(userId, userData) {
    return this.request(`/user/${userId}`, {
      method: 'PUT',
      data: userData,
    });
  }

async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.request('/upload', {
      method: 'POST',
      headers: {},
      data: formData,
    });
  }

  async getSocialMetrics(platform) {
    if (!platform || !['Instagram', 'Twitter', 'Facebook'].includes(platform)) {
      throw new Error('Valid platform (Instagram/Twitter/Facebook) required for social metrics');
    }
    return this.getAnalytics([platform]);
  }

async getAnalytics(platforms) {
    if (!platforms || platforms.length === 0) {
      throw new Error('Platforms required');
    }

    const platform = platforms[0];
    
    // Single platform logic
    if (platforms.length === 1) {
      if (['Instagram', 'Twitter', 'Facebook'].includes(platform)) {
        // CSV-based analytics API with platform param
        return this.normalizeAnalyticsData(await this.request(`/api/analytics?platform=${platform}`));
      } else if (platform === 'Swish') {
        let userId;
        // Match dashboard logic
        try {
          const storedUser = JSON.parse(localStorage.getItem('eventpulse_user') || '{}');
          userId = storedUser.id;
        } catch (e) {}
        if (!userId) userId = '696fadb44b36d0f9b35986a0';
        
        console.log("🔍 Fetching Swish analytics for userId:", userId);
        
        const response = await axios.get(`http://localhost:3000/api/analytics/user/${userId}`);
        const data = response.data;
        console.log("✅ Swish raw data:", data);

        return this.normalizeAnalyticsData({
          totalLikes: data.totalLikes,
          totalComments: data.totalComments,
          totalShares: 0,
          totalReach: data.totalLikes + data.totalComments,
          platform: 'Swish'
        });
      } else if (platform === 'LinkedIn') {
        // Keep existing logic - return null (handled in UI)
        return null;
      }
    }
    
    // Multi-platform fallback (existing logic)
    if (platforms.includes('Swish')) {
      return this.normalizeAnalyticsData(await this.request('/analytics'));
    } else {
      const params = platforms.join(',');
      return this.normalizeAnalyticsData(await this.request(`/analytics?platforms=${params}`));
    }
  }

  normalizeAnalyticsData(data) {
    // Map backend totals to frontend expected fields
    const totalLikes = data.totalLikes || data.likes || 0;
    const totalComments = data.totalComments || data.comments || 0;
    const totalShares = data.totalShares || data.shares || 0;
    const totalReach = data.totalReach || data.reach || 1;
    
    const normalized = {
      likes: totalLikes,
      comments: totalComments,
      totalShares: totalShares,
      reach: totalReach,
      engagementRate: ((totalLikes + totalComments + totalShares) / totalReach) * 100,
      platformBreakdown: data.platformBreakdown || {}
    };
    
    // Single platform breakdown
    if (!normalized.platformBreakdown || Object.keys(normalized.platformBreakdown).length === 0) {
      normalized.platformBreakdown = {
        [data.platform || 'Social Media']: {
          likes: totalLikes,
          comments: totalComments,
          shares: totalShares,
          reach: totalReach
        }
      };
    }
    
    console.log('📈 Normalized analytics:', normalized);
    return normalized;
  }

}

export const getSwishStats = async (userId) => {
  try {
    const res = await fetch(`http://localhost:3000/api/analytics/user/${userId}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching Swish stats:", err);
    return null;
  }
};


export default new ApiService();
