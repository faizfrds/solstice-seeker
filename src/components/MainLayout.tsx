import React from 'react';
import { TopNav } from './TopNav';
import { BottomNav } from './BottomNav';

interface MainLayoutProps {
  children: React.ReactNode;
  mapChildren: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, mapChildren }) => {
  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden no-scrollbar bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      {/* Base Map Layer */}
      <div className="absolute inset-0 z-0">
        {mapChildren}
      </div>

      {/* Persistent UI Layer */}
      <TopNav />
      
      {/* Route/View dependent content Layer. Keep pointer-events-none so map is draggable, and set pointer-events-auto on interactive children within */}
      <main className="absolute inset-x-0 inset-y-24 z-[5] pointer-events-none overflow-y-auto no-scrollbar">
        {children}
      </main>

      <BottomNav />
    </div>
  );
};
