import React from 'react';
import { motion } from 'framer-motion';

const HistoricalComparison = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Historical Comparison</h2>
        <p className="text-gray-300">Compare performance across different time periods</p>
      </div>
      
      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl">📈</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Historical Analysis Coming Soon</h3>
        <p className="text-gray-300">Compare your current performance with historical data to identify trends and patterns.</p>
      </div>
    </div>
  );
};

export default HistoricalComparison;