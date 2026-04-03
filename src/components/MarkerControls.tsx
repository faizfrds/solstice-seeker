import React from 'react';
import { useAppStore } from '@/store/appStore';

export const MarkerControls: React.FC = () => {
  const markerMode = useAppStore(s => s.markerMode);
  const setMarkerMode = useAppStore(s => s.setMarkerMode);
  const clearMarkers = useAppStore(s => s.clearMarkers);

  return (
    <div className="fixed right-6 top-24 z-40 flex flex-col gap-4 pointer-events-auto">
      <button 
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border transition-all active:scale-90 ${markerMode === 'vantage' ? 'bg-primary text-on-primary border-primary' : 'bg-surface/70 backdrop-blur-2xl text-primary border-white/50 hover:bg-surface-container-high'}`}
        onClick={() => setMarkerMode(markerMode === 'vantage' ? null : 'vantage')}
        title="Set Vantage Point"
      >
        <span className="material-symbols-outlined">person_pin_circle</span>
      </button>
      
      <button 
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border transition-all active:scale-90 ${markerMode === 'subject' ? 'bg-primary text-on-primary border-primary' : 'bg-surface/70 backdrop-blur-2xl text-primary border-white/50 hover:bg-surface-container-high'}`}
        onClick={() => setMarkerMode(markerMode === 'subject' ? null : 'subject')}
        title="Set Subject Point"
      >
        <span className="material-symbols-outlined">my_location</span>
      </button>
      
      <button 
        className="w-14 h-14 bg-surface/70 backdrop-blur-2xl rounded-full flex items-center justify-center text-error shadow-lg border border-white/50 hover:bg-error-container hover:text-on-error-container transition-all active:scale-90"
        onClick={() => clearMarkers()}
        title="Clear Markers"
      >
        <span className="material-symbols-outlined">layers_clear</span>
      </button>
    </div>
  );
};
