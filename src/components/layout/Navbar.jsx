import React, { useState, useEffect } from 'react';
import { Crown, Calculator, Menu, X, UtensilsCrossed } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenEstimate, onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'catering', label: 'Catering Packages' },
    { id: 'menu', label: 'Food Menu' },
    { id: 'contact', label: 'Contact Us', isHighlighted: true }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-palette-eggplant/95 backdrop-blur-lg border-b border-palette-shamrock/30 shadow-lilac-md py-2' : 'bg-palette-eggplant py-2.5 border-b border-palette-shamrock/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8.5 h-8.5 rounded-xl bg-palette-shamrock flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <Crown className="w-4.5 h-4.5 text-white fill-white" />
            </div>
            <div>
              <span className="font-serif text-lg font-extrabold tracking-tight text-white">
                THE ROYAL TABLE
              </span>
              <p className="text-[9px] tracking-widest text-palette-shamrock font-bold uppercase -mt-0.5">
                South Indian Gourmet Catering
              </p>
            </div>
          </div>

          {/* Desktop Nav Links (Vibrant Shamrock Green Theme Fonts) */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-palette-shamrock/30 shadow-sm">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 relative ${
                    isActive 
                      ? 'text-white bg-palette-shamrock shadow-md font-extrabold'
                      : link.isHighlighted 
                        ? 'text-white bg-palette-shamrock/80 hover:bg-palette-shamrock font-extrabold shadow-sm'
                        : 'text-white hover:text-palette-shamrock hover:bg-white/15'
                  }`}
                >
                  {link.label}
                  {link.isBadge && (
                    <span className="ml-1 px-1 py-0.2 text-[9px] bg-palette-shamrock text-white font-extrabold rounded-full animate-pulse">
                      Live
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={onOpenEstimate}
              className="px-3.5 py-1.5 rounded-xl border border-palette-shamrock/60 text-palette-shamrock hover:bg-palette-shamrock/20 text-xs font-bold flex items-center gap-1.5 transition-all duration-200 shadow-sm"
            >
              <Calculator className="w-3.5 h-3.5 text-palette-shamrock" />
              <span>Instant Estimate</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="px-4 py-1.5 rounded-xl bg-palette-shamrock hover:bg-palette-shamrockDark text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md hover:scale-105 transition-all duration-300"
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Book Catering</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenEstimate}
              className="p-1.5 rounded-xl bg-palette-shamrock/20 text-palette-shamrock border border-palette-shamrock/40"
              title="Instant Estimate"
            >
              <Calculator className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xl text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-palette-shamrock" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-palette-eggplant border-b border-palette-shamrock/30 px-4 py-4 mt-2 shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2 rounded-xl font-bold flex items-center justify-between text-xs transition-colors ${
                  activeTab === link.id
                    ? 'bg-palette-shamrock text-white font-extrabold'
                    : 'text-palette-shamrock hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {link.isBadge && (
                  <span className="px-1.5 py-0.5 text-[9px] bg-palette-shamrock text-white font-bold rounded-full">
                    Admin
                  </span>
                )}
              </button>
            ))}

            <div className="pt-3 border-t border-palette-shamrock/30 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEstimate();
                }}
                className="w-full py-2 rounded-xl border border-palette-shamrock/50 text-palette-shamrock font-bold flex items-center justify-center gap-2 bg-palette-shamrock/10 text-xs"
              >
                <Calculator className="w-4 h-4 text-palette-shamrock" />
                <span>Instant Catering Calculator</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2 rounded-xl bg-palette-shamrock text-white font-extrabold flex items-center justify-center gap-2 shadow-md text-xs"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Book Event Catering Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
