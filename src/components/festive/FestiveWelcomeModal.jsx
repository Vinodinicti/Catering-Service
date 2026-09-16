import React, { useState, useEffect } from 'react';
import { Sparkles, Utensils, X, PartyPopper, Flame, Music, Volume2, VolumeX } from 'lucide-react';

export default function FestiveWelcomeModal({ isOpen, onClose, onOpenEstimate }) {
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    // Esc key support
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  // Generate random confetti pieces
  const confettiItems = Array.from({ length: 30 }).map((_, i) => {
    const colors = ['bg-palette-lilac', 'bg-palette-shamrock', 'bg-palette-denim', 'bg-amber-400', 'bg-purple-300'];
    const randomColor = colors[i % colors.length];
    const randomLeft = `${Math.floor(Math.random() * 95)}%`;
    const randomDelay = `${(Math.random() * 2).toFixed(1)}s`;
    const randomSize = Math.random() > 0.5 ? 'w-3 h-3 rounded-full' : 'w-2.5 h-4 rotate-45 rounded-sm';

    return (
      <div
        key={i}
        className={`fixed top-0 z-50 pointer-events-none animate-confetti-fall ${randomColor} ${randomSize}`}
        style={{ left: randomLeft, animationDelay: randomDelay }}
      />
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-palette-eggplant/80 backdrop-blur-md transition-all duration-500 animate-fadeIn overflow-y-auto">
      {/* Falling Festive Confetti */}
      {confettiItems}

      {/* Modal Card */}
      <div className="relative w-full max-w-md sm:max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-palette-lace border-2 border-palette-shamrock rounded-3xl p-5 sm:p-8 shadow-2xl shadow-palette-eggplant/50 text-center transform transition-transform duration-300 scale-100 my-auto">
        
        {/* Decorative Festive Ambient Glows */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-palette-lilac/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-palette-shamrock/30 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-palette-eggplant/10 hover:bg-palette-eggplant text-palette-eggplant hover:text-white transition-all duration-200 z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Festive Header Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-palette-eggplant to-palette-denim text-palette-lace px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-extrabold uppercase tracking-wider shadow-md mb-3 sm:mb-4 animate-bounce-subtle">
          <PartyPopper className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-palette-shamrock animate-spin-slow" />
          <span>Festive Celebration Mode</span>
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-palette-lilac" />
        </div>

        {/* Royal Title */}
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-palette-eggplant leading-tight">
          Welcome to <span className="bg-gradient-to-r from-palette-eggplant via-palette-shamrock to-palette-denim bg-clip-text text-transparent">Royal Dakshin</span> Feast!
        </h2>

        <p className="text-palette-eggplant/80 text-sm mt-3 leading-relaxed max-w-md mx-auto">
          Experience authentic master South Indian culinary arts, 3D interactive royal platter feast, and live counters designed for grand milestone celebrations!
        </p>

        {/* Palette Swatch Preview Pill */}
        <div className="my-6 p-4 rounded-2xl bg-white border border-palette-laceBorder shadow-inner flex items-center justify-between gap-2">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-palette-denim">Active Festive Palette</span>
            <p className="text-xs font-serif font-bold text-palette-eggplant">Royal Purple & Shamrock Green</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-palette-eggplant border border-white shadow-sm" title="Eggplant" />
            <span className="w-5 h-5 rounded-full bg-palette-lilac border border-white shadow-sm" title="Lilac" />
            <span className="w-5 h-5 rounded-full bg-palette-shamrock border border-white shadow-sm" title="Shamrock" />
            <span className="w-5 h-5 rounded-full bg-palette-lace border border-palette-laceBorder shadow-sm" title="Lace" />
            <span className="w-5 h-5 rounded-full bg-palette-denim border border-white shadow-sm" title="Denim" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          <button
            onClick={() => {
              onClose();
              if (onOpenEstimate) onOpenEstimate();
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-palette-eggplant to-palette-denim hover:from-palette-eggplantDark hover:to-palette-denimDark text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-palette-eggplant/30 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-palette-shamrock" />
            <span>Instant Catering Estimator</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-palette-shamrock hover:bg-palette-shamrockDark text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Utensils className="w-4 h-4" />
            <span>Enter Royal Experience</span>
          </button>
        </div>

      </div>
    </div>
  );
}
