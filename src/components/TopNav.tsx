import React from 'react';

export const TopNav: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-10 flex items-center justify-between bg-surface/60 backdrop-blur-xl px-6 py-4 shadow-[0_12px_32px_rgba(48,52,42,0.06)] pointer-events-auto">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-primary text-2xl">landscape</span>
        <h1 className="font-headline font-semibold tracking-tight text-lg text-primary">Solstice</h1>
      </div>
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex gap-8">
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label text-xs uppercase tracking-widest font-semibold" href="#">Explore</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label text-xs uppercase tracking-widest font-semibold" href="#">Terrain</a>
          <a className="text-primary font-label text-xs uppercase tracking-widest font-bold border-b-2 border-primary pb-1" href="#">Settings</a>
        </nav>
        <span className="material-symbols-outlined text-primary cursor-pointer scale-95 active:scale-90 transition-transform">settings</span>
      </div>
    </header>
  );
};
