import React, { useMemo } from 'react';
import { useAppStore } from '@/store/appStore';

export const TimeControls: React.FC = () => {
  const selectedMinutes = useAppStore(s => s.selectedMinutes);
  const setMinutes = useAppStore(s => s.setMinutes);
  const sunTimes = useAppStore(s => s.sunTimes);

  // Format minutes into HH:MM
  const timeString = useMemo(() => {
    const hours = Math.floor(selectedMinutes / 60);
    const mins = selectedMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }, [selectedMinutes]);

  // Handle slider change safely
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinutes(parseInt(e.target.value, 10));
  };

  // Extract sunset to local time format if available
  const sunsetStr = useMemo(() => {
    if (!sunTimes?.sunset) return '--:--';
    return sunTimes.sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  }, [sunTimes]);

  return (
    <div className="fixed bottom-36 left-1/2 -translate-x-1/2 w-full max-w-xl px-6 z-40 pointer-events-auto">
      <div className="bg-surface/70 backdrop-blur-2xl p-8 rounded-[3rem] border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-end mb-8">
          <div className="flex flex-col">
            <span className="font-label text-[10px] tracking-widest text-primary uppercase font-bold mb-1">Time Travel</span>
            <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tighter">{timeString}</h2>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-label text-[9px] text-secondary uppercase tracking-widest font-medium">Sunset today</span>
            <span className="font-headline text-lg font-bold text-secondary">{sunsetStr}</span>
          </div>
        </div>

        {/* Real HTML5 Range input styled via index.css */}
        <div className="w-full px-2">
            <input 
              type="range" 
              min="0" 
              max="1439" 
              value={selectedMinutes}
              onChange={handleSliderChange}
              className="organic-slider"
            />
        </div>

        <div className="flex justify-between mt-4 px-1">
          <span className="font-label text-[8px] font-bold text-outline-variant uppercase tracking-widest">Dawn</span>
          <span className="font-label text-[8px] font-bold text-outline-variant uppercase tracking-widest">Noon</span>
          <span className="font-label text-[8px] font-bold text-outline-variant uppercase tracking-widest">Dusk</span>
        </div>
      </div>
    </div>
  );
};
