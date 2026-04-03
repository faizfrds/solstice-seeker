import React from 'react';

export const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 flex justify-center pb-8 pointer-events-none">
      <div className="bg-surface/70 backdrop-blur-2xl rounded-full w-fit px-4 py-2 shadow-[0_12px_32px_rgba(48,52,42,0.08)] flex items-center justify-center gap-2 pointer-events-auto">
        <div className="flex items-center justify-center text-on-surface-variant p-4 hover:text-primary transition-all cursor-pointer">
          <span className="material-symbols-outlined">terrain</span>
        </div>
        <div className="flex items-center justify-center text-on-surface-variant p-4 hover:text-primary transition-all cursor-pointer">
          <span className="material-symbols-outlined">visibility</span>
        </div>
        <div className="flex items-center justify-center text-on-surface-variant p-4 hover:text-primary transition-all cursor-pointer">
          <span className="material-symbols-outlined">history</span>
        </div>
        <div className="bg-primary-container text-on-primary-container rounded-full p-4 scale-110 shadow-sm flex items-center justify-center cursor-pointer">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
        </div>
      </div>
    </nav>
  );
};
