import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LinkedInConnect = () => {
  const [companyId, setCompanyId] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErro̥r] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:9000/api/companies/findCompany', {
        params: { companyId, companyName }
      });
      navigate('/companyAnalysis', { state: { companies: response.data } });
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to find company. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto p-6 pt-16">
        <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-8 shadow-md z-60 relative">
          <h1 className="text-2xl font-bold text-foreground mb-6">LinkedIn Company Search</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Company ID</label>
              <input
                type="text"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                className="w-full rounded-lg bg-gray-700 border border-gray-600 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter company ID"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full rounded-lg bg-gray-900 border border-gray-600 p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
            >
              {isLoading ? 'Searching...' : 'Search Company'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LinkedInConnect;
