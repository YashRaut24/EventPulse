import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const EventSelector = ({ events, selectedEvent, onEventChange, className = '' }) => {
  const eventOptions = events?.map(event => ({
    value: event?.id,
    label: event?.name,
    description: `${event?.date} • ${event?.status}`
  }));

  const selectedEventData = events?.find(event => event?.id === selectedEvent);

  return (
    <div className={`bg-card border border-border rounded-lg p-4 shadow-soft ${className}`}>
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Calendar" size={16} className="text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">Current Event</h3>
          <p className="text-xs text-muted-foreground">Select event to analyze</p>
        </div>
      </div>
      <Select
        options={eventOptions}
        value={selectedEvent}
        onChange={onEventChange}
        placeholder="Select an event..."
        searchable
        className="mb-3"
      />
      {selectedEventData && (
        <div className="space-y-2 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Status:</span>
            <span className={`px-2 py-1 rounded-full font-medium ${
              selectedEventData?.status === 'Active' ?'bg-success/10 text-success' 
                : selectedEventData?.status === 'Upcoming' ?'bg-warning/10 text-warning' :'bg-muted text-muted-foreground'
            }`}>
              {selectedEventData?.status}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Date:</span>
            <span className="text-foreground font-medium">{selectedEventData?.date}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Venue:</span>
            <span className="text-foreground font-medium">{selectedEventData?.venue}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventSelector;