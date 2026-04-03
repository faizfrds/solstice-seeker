import React from 'react';
import { useAppStore } from '@/store/appStore';

export const LNTModal: React.FC = () => {
  const showLNTModal = useAppStore(s => s.showLNTModal);
  const dismissLNTModal = useAppStore(s => s.dismissLNTModal);

  if (!showLNTModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto p-4 sm:p-0">
      <div className="absolute inset-0 bg-surface/40 backdrop-blur-sm transition-opacity" onClick={dismissLNTModal}></div>
      
      <div className="relative bg-surface p-8 max-w-sm rounded-[2.5rem] shadow-2xl border border-primary/20 transform transition-all flex flex-col gap-5">
        <div className="flex items-start gap-5">
          <div className="bg-primary-container p-3 rounded-full flex-shrink-0">
            <span className="material-symbols-outlined text-primary">eco</span>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Social Stewardship</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed font-medium mt-2">
              This ecosystem is fragile. Stay on marked trails and practice 'Leave No Trace'. Excessive foot traffic at this coordinate can cause irreversible soil erosion.
            </p>
          </div>
        </div>
        
        <button 
          onClick={dismissLNTModal}
          className="mt-4 bg-primary text-on-primary py-3 px-6 rounded-full font-headline font-bold text-sm uppercase tracking-[0.15em] self-end shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          I understand
        </button>
      </div>
    </div>
  );
};
