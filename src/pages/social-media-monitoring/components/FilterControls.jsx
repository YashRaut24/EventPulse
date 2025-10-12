import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterControls = ({ filters, onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [savedFilters, setSavedFilters] = useState([
    { id: 1, name: 'Positive Mentions', filters: { sentiment: 'positive', platforms: ['twitter', 'linkedin'] } },
    { id: 2, name: 'Influencer Posts', filters: { influencersOnly: true } },
    { id: 3, name: 'Last 24 Hours', filters: { timeRange: '24h' } }
  ]);

  const platformOptions = [
    { value: 'all', label: 'All Platforms' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'youtube', label: 'YouTube' }
  ];

  const sentimentOptions = [
    { value: 'all', label: 'All Sentiments' },
    { value: 'positive', label: 'Positive' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'negative', label: 'Negative' }
  ];

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const engagementOptions = [
    { value: 'all', label: 'All Engagement' },
    { value: 'high', label: 'High Engagement (>100)' },
    { value: 'medium', label: 'Medium Engagement (10-100)' },
    { value: 'low', label: 'Low Engagement (<10)' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    onFiltersChange(updatedFilters);
  };

  const handleKeywordAdd = (keyword) => {
    if (keyword?.trim() && !filters?.keywords?.includes(keyword?.trim())) {
      const updatedKeywords = [...(filters?.keywords || []), keyword?.trim()];
      handleFilterChange('keywords', updatedKeywords);
    }
  };

  const handleKeywordRemove = (keyword) => {
    const updatedKeywords = filters?.keywords?.filter(k => k !== keyword) || [];
    handleFilterChange('keywords', updatedKeywords);
  };

  const handleSaveFilter = () => {
    const filterName = prompt('Enter a name for this filter preset:');
    if (filterName) {
      const newFilter = {
        id: Date.now(),
        name: filterName,
        filters: { ...filters }
      };
      setSavedFilters([...savedFilters, newFilter]);
    }
  };

  const handleLoadFilter = (savedFilter) => {
    onFiltersChange(savedFilter?.filters);
  };

  const handleClearFilters = () => {
    onFiltersChange({
      platforms: 'all',
      sentiment: 'all',
      timeRange: '24h',
      engagement: 'all',
      keywords: [],
      influencersOnly: false,
      hasMedia: false
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Quick Filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          <div className="flex items-center space-x-2">
            {savedFilters?.map((savedFilter) => (
              <Button
                key={savedFilter?.id}
                variant="outline"
                size="sm"
                onClick={() => handleLoadFilter(savedFilter)}
              >
                {savedFilter?.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Save"
            onClick={handleSaveFilter}
          >
            Save Filter
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={handleClearFilters}
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        </div>
      </div>
      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Platform"
          options={platformOptions}
          value={filters?.platforms || 'all'}
          onChange={(value) => handleFilterChange('platforms', value)}
        />
        
        <Select
          label="Sentiment"
          options={sentimentOptions}
          value={filters?.sentiment || 'all'}
          onChange={(value) => handleFilterChange('sentiment', value)}
        />
        
        <Select
          label="Time Range"
          options={timeRangeOptions}
          value={filters?.timeRange || '24h'}
          onChange={(value) => handleFilterChange('timeRange', value)}
        />
        
        <Select
          label="Engagement Level"
          options={engagementOptions}
          value={filters?.engagement || 'all'}
          onChange={(value) => handleFilterChange('engagement', value)}
        />
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-border">
          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Keywords & Hashtags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {filters?.keywords?.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-1 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm"
                >
                  <span>{keyword}</span>
                  <button
                    onClick={() => handleKeywordRemove(keyword)}
                    className="hover:bg-primary/80 rounded-full p-0.5"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Add keyword or hashtag..."
                onKeyPress={(e) => {
                  if (e?.key === 'Enter') {
                    handleKeywordAdd(e?.target?.value);
                    e.target.value = '';
                  }
                }}
              />
              <Button
                variant="outline"
                iconName="Plus"
                onClick={(e) => {
                  const input = e?.target?.closest('.flex')?.querySelector('input');
                  handleKeywordAdd(input?.value);
                  input.value = '';
                }}
              >
                Add
              </Button>
            </div>
          </div>

          {/* Additional Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="influencersOnly"
                checked={filters?.influencersOnly || false}
                onChange={(e) => handleFilterChange('influencersOnly', e?.target?.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="influencersOnly" className="text-sm text-foreground">
                Influencers Only
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="hasMedia"
                checked={filters?.hasMedia || false}
                onChange={(e) => handleFilterChange('hasMedia', e?.target?.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="hasMedia" className="text-sm text-foreground">
                Has Media
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="verifiedOnly"
                checked={filters?.verifiedOnly || false}
                onChange={(e) => handleFilterChange('verifiedOnly', e?.target?.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="verifiedOnly" className="text-sm text-foreground">
                Verified Accounts Only
              </label>
            </div>
          </div>

          {/* Custom Date Range */}
          {filters?.timeRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="datetime-local"
                label="Start Date"
                value={filters?.startDate || ''}
                onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
              />
              <Input
                type="datetime-local"
                label="End Date"
                value={filters?.endDate || ''}
                onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
              />
            </div>
          )}
        </div>
      )}
      {/* Active Filters Summary */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Filter" size={16} />
          <span>
            {Object.values(filters)?.filter(v => v && v !== 'all' && (Array.isArray(v) ? v?.length > 0 : true))?.length} active filters
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export Results
          </Button>
          <Button variant="default" size="sm" iconName="Search">
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;