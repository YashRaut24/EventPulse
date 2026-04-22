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
    const token = localStorage.getItem('eventpulse_token') || localStorage.getItem('token');
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

  async getMe() {
    return this.request('/auth/me');
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
    const token = localStorage.getItem('eventpulse_token') || localStorage.getItem('token');
    return this.request('/upload', {
      method: 'POST',
      data: formData,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  async getAnalytics(platforms) {
    if (!platforms || platforms.length === 0) {
      throw new Error('Platforms required');
    }

    const platform = platforms[0];
    
    if (platforms.length === 1) {
      if (['Instagram', 'Twitter', 'Facebook'].includes(platform)) {
        return this.normalizeAnalyticsData(await this.request(`/analytics?platform=${platform}`));
      } else if (platform === 'LinkedIn') {
        return null;
      }
    }
    
    const params = platforms.join(',');
    return this.normalizeAnalyticsData(await this.request(`/social-media-data?platforms=${params}`));
  }

  normalizeAnalyticsData(data) {
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
    
    return normalized;
  }
}

export default new ApiService();
