import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const EventSelector = ({ events, selectedEvent, onEventChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedEventData = events.find(event => event.id === selectedEvent);

  const handleEventSelect = (eventId) => {
    onEventChange(eventId);
    setIsOpen(false);
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
            <h3 className="text-lg font-semibold text-white mb-1">
              {selectedEventData?.name || 'Select Event'}
            </h3>
            {selectedEventData && (
              <div className="space-y-1">
                <p className="text-gray-300 text-sm">{selectedEventData.date}</p>
                <p className="text-gray-400 text-xs">{selectedEventData.venue}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  selectedEventData.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                  selectedEventData.status === 'Upcoming' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {selectedEventData.status}
                </span>
              </div>
            )}
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
            {events.map((event) => (
              <motion.button
                key={event.id}
                whileHover={{ backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
                onClick={() => handleEventSelect(event.id)}
                className="w-full p-4 text-left border-b border-white/5 last:border-b-0 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">{event.name}</h4>
                    <p className="text-gray-300 text-sm">{event.date}</p>
                    <p className="text-gray-400 text-xs">{event.venue}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                    event.status === 'Upcoming' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventSelector;