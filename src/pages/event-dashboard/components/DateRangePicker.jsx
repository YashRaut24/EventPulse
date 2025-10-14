import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const DateRangePicker = ({ onDateRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState('Last 7 days');

  const dateRanges = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 3 months', value: '3m' },
    { label: 'Last 6 months', value: '6m' },
    { label: 'Last year', value: '1y' },
    { label: 'Custom range', value: 'custom' }
  ];

  const handleRangeSelect = (range) => {
    setSelectedRange(range.label);
    setIsOpen(false);
    
    if (onDateRangeChange) {
      onDateRangeChange({
        label: range.label,
        value: range.value,
        startDate: getStartDate(range.value),
        endDate: new Date().toISOString().split('T')[0]
      });
    }
  };

  const getStartDate = (value) => {
    const now = new Date();
    switch (value) {
      case '7d':
        return new Date(now.setDate(now.getDate() - 7)).toISOString().split('T')[0];
      case '30d':
        return new Date(now.setDate(now.getDate() - 30)).toISOString().split('T')[0];
      case '3m':
        return new Date(now.setMonth(now.getMonth() - 3)).toISOString().split('T')[0];
      case '6m':
        return new Date(now.setMonth(now.getMonth() - 6)).toISOString().split('T')[0];
      case '1y':
        return new Date(now.setFullYear(now.getFullYear() - 1)).toISOString().split('T')[0];
      default:
        return new Date(now.setDate(now.getDate() - 7)).toISOString().split('T')[0];
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-left hover:border-cyan-400/30 transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Date Range</h3>
            <p className="text-gray-300 text-sm">{selectedRange}</p>
          </div>
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-gray-400" 
          />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            {dateRanges.map((range) => (
              <motion.button
                key={range.value}
                whileHover={{ backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
                onClick={() => handleRangeSelect(range)}
                className="w-full p-4 text-left border-b border-white/5 last:border-b-0 transition-colors"
              >
                <span className="text-white">{range.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateRangePicker;