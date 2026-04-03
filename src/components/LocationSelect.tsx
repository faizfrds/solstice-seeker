import React from 'react';
import { useAppStore } from '@/store/appStore';
import { PARKS } from '@/constants/parks';

export const LocationSelect: React.FC = () => {
  const selectedPark = useAppStore(s => s.selectedPark);
  const setSelectedPark = useAppStore(s => s.setSelectedPark);

  return (
    <div className="fixed top-[4.5rem] left-6 z-40 pointer-events-auto">
      <div className="bg-surface/60 backdrop-blur-xl rounded-full flex items-center px-4 py-2 border border-outline-variant/40 shadow-sm relative w-64 hover:bg-surface/80 transition-colors">
        <span className="material-symbols-outlined text-primary text-sm mr-2">search</span>
        <select 
          className="bg-transparent text-sm text-on-surface font-headline font-semibold outline-none w-full appearance-none cursor-pointer"
          value={selectedPark.id}
          onChange={(e) => setSelectedPark(e.target.value)}
        >
          {PARKS.map(park => (
            <option key={park.id} value={park.id} className="bg-surface text-on-surface">
              {park.name}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined text-outline absolute right-4 pointer-events-none">expand_more</span>
      </div>
    </div>
  );
};
