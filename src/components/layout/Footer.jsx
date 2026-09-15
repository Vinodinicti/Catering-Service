import React from 'react';
import { Crown, Phone, Mail, MapPin, Clock, Heart, Award, ShieldCheck, Lock } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenEstimate, onOpenBooking, onOpenAdmin }) {
  return (
    <footer className="bg-palette-eggplant text-white pt-16 pb-8 border-t border-palette-shamrock/30 relative overflow-hidden">
      {/* Soft Palette Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-palette-lilac/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-palette-shamrock/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-palette-shamrock flex items-center justify-center shadow-md">
                <Crown className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-serif text-2xl font-extrabold text-white tracking-tight">
                THE ROYAL TABLE
              </span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-6">
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
            <h4 className="font-serif text-lg font-extrabold text-palette-shamrock mb-4 flex items-center gap-2">
              <span>Explore Services</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              {['Home', 'About Us', 'Catering Packages', 'Food Menu', 'Contact Us'].map((item, idx) => {
                const tabKey = ['home', 'about', 'catering', 'menu', 'contact'][idx];
                return (
                  <li key={item}>
                    <button
                      onClick={() => {
                        setActiveTab(tabKey);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-white hover:text-palette-shamrock font-medium transition-colors flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-palette-shamrock" />
                      <span>{item}</span>
                    </button>
                  </li>
                );
              })}
              <li>
                <button
                  onClick={onOpenEstimate}
                  className="text-white hover:text-palette-shamrock font-semibold underline flex items-center gap-2 mt-1 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-palette-shamrock animate-ping" />
                  <span>Instant Catering Estimator</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Catering Event Types */}
          <div>
            <h4 className="font-serif text-lg font-extrabold text-palette-shamrock mb-4">
              Catering Specialities
            </h4>
            <ul className="space-y-2.5 text-sm">
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
                <span>Traditional 21-Item Banana Leaf Feasts</span>
              </li>
              <li className="flex items-center gap-2 text-white font-medium">
                <span className="text-palette-shamrock font-bold">✦</span>
                <span>Live Mysuru Dosa & Filter Kaapi Lounges</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div>
            <h4 className="font-serif text-lg font-extrabold text-palette-shamrock mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-palette-shamrock shrink-0 mt-0.5" />
                <span className="text-white font-medium">108 Royal Heritage Boulevard, Culinary District, Metro City</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-palette-shamrock shrink-0 mt-1" />
                <div>
                  <a href="tel:+919840012345" className="text-white font-medium hover:text-palette-shamrock transition-colors block">
                    +91 98400 12345 / +91 94440 54321
                  </a>
                  <span className="text-xs text-palette-shamrock font-extrabold block mt-0.5">Toll-Free Helpline: 1800-425-7890</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-palette-shamrock shrink-0" />
                <a href="mailto:bookings@royaltablecatering.com" className="text-white font-medium hover:text-palette-shamrock transition-colors">
                  bookings@royaltablecatering.com
                </a>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <Clock className="w-5 h-5 text-palette-shamrock shrink-0" />
                <span className="text-xs text-white font-medium">Open Daily: 9:00 AM - 10:00 PM (IST)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line with Admin Portal Lock Icon Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/80 gap-4">
          <p>© {new Date().getFullYear()} The Royal Table Catering Services. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-white font-medium">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-palette-shamrock fill-palette-shamrock inline" />
              <span>for Royal Taste</span>
            </div>

            {/* Admin Portal Footer Icon Button */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-palette-shamrock text-white text-[11px] font-extrabold transition-all border border-white/20 shadow-sm"
              title="Admin Portal Access"
            >
              <Lock className="w-3.5 h-3.5 text-palette-shamrock group-hover:text-white" />
              <span>Admin Portal 🔐</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
