import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DateRangePicker = ({ onDateRangeChange, className = '' }) => {
  const [selectedRange, setSelectedRange] = useState('7d');
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const predefinedRanges = [
    { value: '1d', label: 'Last 24 hours', days: 1 },
    { value: '7d', label: 'Last 7 days', days: 7 },
    { value: '30d', label: 'Last 30 days', days: 30 },
    { value: '90d', label: 'Last 90 days', days: 90 },
    { value: 'custom', label: 'Custom Range', days: null }
  ];

  const handleRangeSelect = (range) => {
    setSelectedRange(range?.value);
    
    if (range?.value === 'custom') {
      setIsCustomOpen(true);
      return;
    }
    
    setIsCustomOpen(false);
    const endDate = new Date();
    const startDate = new Date();
    startDate?.setDate(endDate?.getDate() - range?.days);
    
    onDateRangeChange({
      startDate: startDate?.toISOString()?.split('T')?.[0],
      endDate: endDate?.toISOString()?.split('T')?.[0],
      label: range?.label
    });
  };

  const handleCustomApply = () => {
    if (customStartDate && customEndDate) {
      onDateRangeChange({
        startDate: customStartDate,
        endDate: customEndDate,
        label: `${customStartDate} to ${customEndDate}`
      });
      setIsCustomOpen(false);
    }
  };

  const getCurrentRangeLabel = () => {
    const range = predefinedRanges?.find(r => r?.value === selectedRange);
    return range ? range?.label : 'Custom Range';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 shadow-soft ${className}`}>
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="CalendarDays" size={16} className="text-secondary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">Date Range</h3>
          <p className="text-xs text-muted-foreground">{getCurrentRangeLabel()}</p>
        </div>
      </div>
      <div className="space-y-2">
        {predefinedRanges?.map((range) => (
          <button
            key={range?.value}
            onClick={() => handleRangeSelect(range)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-standard ${
              selectedRange === range?.value
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-muted'
            }`}
          >
            {range?.label}
          </button>
        ))}
      </div>
      {isCustomOpen && (
        <div className="mt-4 pt-4 border-t border-border space-y-3">
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground">Start Date</label>
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground">End Date</label>
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCustomOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleCustomApply}
              className="flex-1"
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;