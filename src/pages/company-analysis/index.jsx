import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CompanyAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const company = location.state?.companies;

  if (!company) {
    return (
      <div className="min-h-screen bg-background">
        <main className="max-w-7xl mx-auto p-6 pt-16">
          <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-8 shadow-md">
            <h1 className="text-2xl font-bold text-foreground mb-4">Company Analysis</h1>
            <p className="text-muted-foreground">No company data found. Please search for a company first.</p>
            <button
              onClick={() => navigate('/linkedin-connect')}
              className="mt-4 bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
            >
              Go to Search
            </button>
          </div>
        </main>
      </div>
    );
  }

  const parseMediaUrls = (urls) => {
    if (!urls) return [];
    try {
      return JSON.parse(urls.replace(/'/g, '"'));
    } catch {
      return [];
    }
  };

  const mediaUrls = parseMediaUrls(company.media_urls);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto p-6 pt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{company.name}</h1>
          <p className="text-muted-foreground">{company.headline}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Followers</h3>
            <p className="text-2xl font-bold text-foreground">{company.followers || 'N/A'}</p>
          </div>
          <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Connections</h3>
            <p className="text-2xl font-bold text-foreground">{company.connections || 'N/A'}</p>
          </div>
          <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Location</h3>
            <p className="text-lg font-semibold text-foreground">{company.location || 'N/A'}</p>
          </div>
          <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Reactions</h3>
            <p className="text-2xl font-bold text-foreground">{company.reactions || 'N/A'}</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-background rounded-2xl p-8 shadow-md">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground mb-4">About</h2>
            <p className="text-muted-foreground leading-relaxed">{company.about || 'No description available.'}</p>
          </div>

          {company.content && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Recent Content</h2>
              <p className="text-muted-foreground leading-relaxed">{company.content}</p>
            </div>
          )}

          {mediaUrls.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Media</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediaUrls.map((url, index) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    {url.includes('video') || url.includes('mp4') ? (
                      <video
                        src={url}
                        controls
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <img
                        src={url}
                        alt={`Media ${index + 1}`}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={() => navigate('/engagementAnalysis')}
              className="bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
            >
              View Engagement Analysis
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyAnalysis;
