import React from 'react';
import { Crown, Phone, Mail, MapPin, Lock, Heart, ArrowUpRight } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenEstimate, onOpenAdmin }) {
  return (
    <footer className="bg-palette-eggplant text-white py-8 sm:py-10 border-t border-palette-shamrock/30 relative overflow-hidden">
      {/* Soft Ambient Glow */}
      <div className="absolute top-0 right-1/3 w-72 h-72 bg-palette-shamrock/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact 3-Column Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pb-6 border-b border-white/10 items-start">
          
          {/* Col 1: Brand Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-palette-shamrock flex items-center justify-center shadow-md">
                <Crown className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-serif text-xl font-extrabold text-white tracking-tight">
                THE ROYAL TABLE
              </span>
            </div>
            <p className="text-palette-lilac/80 text-xs leading-relaxed max-w-sm">
              Unforgettable South Indian culinary experiences for royal weddings, corporate galas & celebrations.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h4 className="font-serif text-sm font-extrabold text-palette-shamrock tracking-wide uppercase">
              Quick Navigation
            </h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-semibold">
              {[
                { name: 'Home', tab: 'home' },
                { name: 'About Us', tab: 'about' },
                { name: 'Catering Packages', tab: 'catering' },
                { name: 'Food Menu', tab: 'menu' },
                { name: 'Contact', tab: 'contact' },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.tab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-white/90 hover:text-palette-shamrock transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={onOpenEstimate}
                className="text-palette-shamrock hover:underline font-bold inline-flex items-center gap-1"
              >
                <span>Estimator</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="space-y-2 text-xs">
            <h4 className="font-serif text-sm font-extrabold text-palette-shamrock tracking-wide uppercase">
              Contact Concierge
            </h4>
            <div className="space-y-1.5 text-white/90 font-medium">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-palette-shamrock shrink-0" />
                <a href="tel:+919840012345" className="hover:text-palette-shamrock transition-colors">+91 98400 12345</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-palette-shamrock shrink-0" />
                <a href="mailto:bookings@royaltablecatering.com" className="hover:text-palette-shamrock transition-colors">bookings@royaltablecatering.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Visible Admin Portal Icon Button */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/80">
          <p>© {new Date().getFullYear()} The Royal Table Catering. All rights reserved.</p>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-white/70 text-[11px]">
              <span>Crafted with</span>
              <Heart className="w-3 h-3 text-palette-shamrock fill-palette-shamrock inline" />
              <span>for Royal Taste</span>
            </div>

            {/* Visible Admin Portal Icon Button */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-palette-shamrock/20 hover:bg-palette-shamrock text-white text-[11px] font-extrabold transition-all border border-palette-shamrock/40 shadow-sm hover:scale-105 active:scale-95 cursor-pointer group"
              title="Admin Portal Access"
            >
              <Lock className="w-3.5 h-3.5 text-palette-shamrock group-hover:text-white transition-colors" />
              <span>Admin Portal 🔐</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
