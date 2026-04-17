const API_BASE_URL = 'http://localhost:9000/api';

class ApiService {
  getToken() {
    return localStorage.getItem('eventpulse_token');
  }

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Request failed');
    return data;
  }

  async signUp(userData) {
    return this.request('/auth/signup', { method: 'POST', body: JSON.stringify(userData) });
  }

  async signIn(credentials) {
    return this.request('/auth/signin', { method: 'POST', body: JSON.stringify(credentials) });
  }

  async getMe() {
    return this.request('/auth/me');
  }

  async updateUser(userId, userData) {
    return this.request(`/user/${userId}`, { method: 'PUT', body: JSON.stringify(userData) });
  }

  async uploadFile(file) {
    const token = this.getToken();
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Upload failed');
    return data;
  }
}

export default new ApiService();
