import React from 'react';
import { Crown, Phone, Mail, MapPin, Clock, Heart, Award, ShieldCheck, Lock, ArrowUpRight } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenEstimate, onOpenAdmin }) {
  return (
    <footer className="bg-palette-eggplant text-white py-8 md:pt-14 md:pb-8 border-t border-palette-shamrock/30 relative overflow-hidden">
      {/* Soft Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-palette-lilac/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-palette-shamrock/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* === 1. DESKTOP VIEW: FULL RICH 4-COLUMN FOOTER (md:grid) === */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10 border-b border-white/10">
          
          {/* Col 1: Brand Info & Badges */}
          <div>
            <div className="flex items-center gap-3 mb-3.5">
              <div className="w-9 h-9 rounded-xl bg-palette-shamrock flex items-center justify-center shadow-md">
                <Crown className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-serif text-2xl font-extrabold text-white tracking-tight">
                THE ROYAL TABLE
              </span>
            </div>
            <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-5">
              Crafting unforgettable culinary experiences for royal South Indian weddings, grand corporate galas, and traditional celebrations with master authentic flavors.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs bg-white/10 px-3 py-1.5 rounded-lg text-white font-medium border border-white/15">
                <Award className="w-4 h-4 text-palette-shamrock" />
                <span>Award Winning Chef Team</span>
              </div>
              <div className="flex items-center gap-2 text-xs bg-white/10 px-3 py-1.5 rounded-lg text-white font-medium border border-white/15">
                <ShieldCheck className="w-4 h-4 text-palette-shamrock" />
                <span>100% Food Safety Certified</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-base font-extrabold text-palette-shamrock mb-3.5">
              Explore Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { name: 'Home', tab: 'home' },
                { name: 'About Us', tab: 'about' },
                { name: 'Catering Packages', tab: 'catering' },
                { name: 'Food Menu', tab: 'menu' },
                { name: 'Contact Us', tab: 'contact' },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      setActiveTab(item.tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-white hover:text-palette-shamrock font-medium transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-palette-shamrock" />
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <button
                  onClick={onOpenEstimate}
                  className="text-palette-shamrock hover:underline font-bold inline-flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-palette-shamrock animate-ping" />
                  <span>Instant Catering Estimator</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Catering Specialities */}
          <div>
            <h4 className="font-serif text-base font-extrabold text-palette-shamrock mb-3.5">
              Catering Specialities
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2 text-white font-medium">
                <span className="text-palette-shamrock font-bold">✦</span>
                <span>Grand South Indian Weddings</span>
              </li>
              <li className="flex items-center gap-2 text-white font-medium">
                <span className="text-palette-shamrock font-bold">✦</span>
                <span>Corporate Conferences & Galas</span>
              </li>
              <li className="flex items-center gap-2 text-white font-medium">
                <span className="text-palette-shamrock font-bold">✦</span>
                <span>Sasthiabdhapoorthi & Birthdays</span>
              </li>
              <li className="flex items-center gap-2 text-white font-medium">
                <span className="text-palette-shamrock font-bold">✦</span>
                <span>Traditional 21-Item Leaf Feasts</span>
              </li>
              <li className="flex items-center gap-2 text-white font-medium">
                <span className="text-palette-shamrock font-bold">✦</span>
                <span>Live Mysuru Dosa & Kaapi Lounge</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div>
            <h4 className="font-serif text-base font-extrabold text-palette-shamrock mb-3.5">
              Get In Touch
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-palette-shamrock shrink-0 mt-0.5" />
                <span className="text-white font-medium">108 Royal Heritage Blvd, Culinary District, Metro City</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-palette-shamrock shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+919840012345" className="text-white font-medium hover:text-palette-shamrock transition-colors block">
                    +91 98400 12345 / +91 94440 54321
                  </a>
                  <span className="text-[11px] text-palette-shamrock font-bold block mt-0.5">Helpline: 1800-425-7890</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-palette-shamrock shrink-0" />
                <a href="mailto:bookings@royaltablecatering.com" className="text-white font-medium hover:text-palette-shamrock transition-colors">
                  bookings@royaltablecatering.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-palette-shamrock shrink-0" />
                <span className="text-xs text-white/90 font-medium">Open Daily: 9:00 AM - 10:00 PM (IST)</span>
              </li>
            </ul>
          </div>

        </div>


        {/* === 2. MOBILE VIEW: SHORT COMPACT LAYOUT (block md:hidden) === */}
        <div className="block md:hidden space-y-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-palette-shamrock flex items-center justify-center shadow-md">
              <Crown className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-serif text-xl font-extrabold text-white tracking-tight">
              THE ROYAL TABLE
            </span>
          </div>
          <p className="text-palette-lilac/90 text-xs leading-relaxed">
            Crafting unforgettable South Indian culinary experiences for royal weddings, corporate galas & celebrations.
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold pt-1">
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

          <div className="space-y-1.5 text-xs text-white/90 font-medium pt-1">
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


        {/* === 3. BOTTOM BAR WITH UN-OBSCURED ADMIN PORTAL BUTTON === */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/80 pr-16 md:pr-0">
          <p>© {new Date().getFullYear()} The Royal Table Catering Services. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            {/* Prominent Admin Portal Icon Button */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-palette-shamrock/20 hover:bg-palette-shamrock text-white text-[11px] font-extrabold transition-all border border-palette-shamrock/50 shadow-md hover:scale-105 active:scale-95 cursor-pointer group"
              title="Admin Portal Access"
            >
              <Lock className="w-3.5 h-3.5 text-palette-shamrock group-hover:text-white transition-colors" />
              <span>Admin Portal 🔐</span>
            </button>

            <div className="flex items-center gap-1 text-white/70 text-[11px]">
              <span>Crafted with</span>
              <Heart className="w-3 h-3 text-palette-shamrock fill-palette-shamrock inline" />
              <span>for Royal Taste</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
