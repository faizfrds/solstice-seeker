import React from 'react';
import { useAppStore } from '@/store/appStore';

export const SunInfoWidget: React.FC = () => {
  const sunPosition = useAppStore(s => s.sunPosition);
  
  if (!sunPosition) return null;

  // Format the numbers
  const azimuthDeg = sunPosition.azimuthDeg.toFixed(1);
  const altitudeDeg = sunPosition.altitudeDeg.toFixed(1);

  return (
    <div className="fixed top-24 left-6 z-40 pointer-events-auto">
      <div className="bg-surface/70 backdrop-blur-2xl p-6 rounded-[2rem] border border-outline-variant/40 flex flex-col gap-5 min-w-[200px] shadow-sm">
        <div className="flex flex-col">
          <span className="font-label text-[9px] tracking-widest text-secondary uppercase font-semibold">Solar Position</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">{azimuthDeg}°</span>
            <span className="font-label text-[9px] text-secondary/60 uppercase">Azimuth</span>
          </div>
        </div>
        <div className="w-full h-[1px] bg-outline-variant/30"></div>
        <div className="flex flex-col">
          <div className="flex items-baseline justify-between">
            <span className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">{altitudeDeg}°</span>
            <span className="font-label text-[9px] text-secondary/60 uppercase">Altitude</span>
          </div>
        </div>
        
        {/* Simple golden hour indicator mock */}
        <div className="mt-1 py-2 px-4 bg-primary-container/40 rounded-full flex items-center gap-2 border border-primary/10">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="text-[9px] font-bold text-on-primary-container uppercase tracking-wider">Golden Hour</span>
        </div>
      </div>
    </div>
  );
};
