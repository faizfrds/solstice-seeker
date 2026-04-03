import React from 'react';
import { useAppStore } from '@/store/appStore';

export const ConfigPanel: React.FC = () => {
  const showGoldenRatio = useAppStore(s => s.showGoldenRatioOverlay);
  const toggleGoldenRatio = useAppStore(s => s.toggleGoldenRatioOverlay);

  return (
    <div className="fixed top-24 right-24 z-30 lg:block hidden pointer-events-auto">
      <div className="bg-surface/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-outline-variant/30 shadow-sm w-[350px]">
        <h3 className="font-headline text-lg font-bold tracking-tight mb-8 text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">filter_center_focus</span>
          Optical Overlays
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between group">
            <div className="max-w-[70%]">
              <p className="font-headline text-base font-bold text-on-surface">Golden framing</p>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Harmonize with the Fibonacci sequence.</p>
            </div>
            <button 
              onClick={toggleGoldenRatio}
              className={`w-12 h-6 rounded-full relative transition-all duration-300 shadow-inner ${showGoldenRatio ? 'bg-primary' : 'bg-surface-container-high'}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full shadow-md transition-all duration-300 ${showGoldenRatio ? 'right-0.5 bg-white' : 'left-0.5 bg-outline-variant'}`}></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
