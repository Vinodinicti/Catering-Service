import React, { useState } from 'react';
import { Crown, Phone, Mail, MapPin, Clock, Heart, Award, ShieldCheck, Lock, ArrowUpRight, FileText, MessageCircle, X, Shield } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenEstimate, onOpenAdmin }) {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

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

          {/* Col 2: Quick Links & Privacy */}
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
                { name: 'Contact Us 📞', tab: 'contact' },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      setActiveTab(item.tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-white hover:text-palette-shamrock font-medium transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-palette-shamrock" />
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}

              {/* Privacy Policy Link */}
              <li className="pt-1">
                <button
                  onClick={() => setIsPrivacyOpen(true)}
                  className="text-palette-lilac hover:text-white font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-palette-shamrock" />
                  <span>Privacy Policy & Terms</span>
                </button>
              </li>

              <li className="pt-1">
                <button
                  onClick={onOpenEstimate}
                  className="text-palette-shamrock hover:underline font-bold inline-flex items-center gap-1.5 cursor-pointer"
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

          {/* Col 4: Contact & Hours with WA Button */}
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

            {/* Direct WhatsApp Action Button */}
            <div className="pt-3">
              <a
                href="https://wa.me/919840012345?text=Hello%20Royal%20Table%20Catering!%20I%20would%20like%20to%20inquire%20about%20catering%20services."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-palette-shamrock hover:bg-palette-shamrockDark text-white text-xs font-black transition-all shadow-md hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Direct Chat 💬</span>
              </a>
            </div>
          </div>

        </div>


        {/* === 2. MOBILE VIEW: SHORT COMPACT LAYOUT (block md:hidden) === */}
        <div className="block md:hidden space-y-4 pb-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-palette-shamrock flex items-center justify-center shadow-md">
                <Crown className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-serif text-xl font-extrabold text-white tracking-tight">
                THE ROYAL TABLE
              </span>
            </div>
            
            {/* Quick WhatsApp Badge for Mobile */}
            <a
              href="https://wa.me/919840012345?text=Hello%20Royal%20Table%20Catering!"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-palette-shamrock text-white shadow-md hover:scale-110 transition-transform"
              aria-label="Contact WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
            </a>
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
              { name: 'Contact Us 📞', tab: 'contact' },
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
            
            {/* Mobile Privacy Link */}
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="text-palette-lilac hover:text-white font-bold inline-flex items-center gap-1"
            >
              <FileText className="w-3 h-3 text-palette-shamrock" />
              <span>Privacy</span>
            </button>

            <button
              onClick={onOpenEstimate}
              className="text-palette-shamrock hover:underline font-bold inline-flex items-center gap-1"
            >
              <span>Estimator</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-1.5 text-xs text-white/90 font-medium pt-1 flex flex-col sm:flex-row items-start sm:items-center gap-2 justify-between">
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
          <div className="flex flex-wrap items-center gap-3">
            <p>© {new Date().getFullYear()} The Royal Table Catering Services.</p>
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="text-palette-lilac hover:text-white underline font-semibold text-[11px] cursor-pointer"
            >
              Privacy Policy & Terms
            </button>
          </div>
          
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

      {/* --- PRIVACY POLICY POPUP MODAL --- */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            onClick={() => setIsPrivacyOpen(false)}
            className="fixed inset-0 bg-palette-eggplant/80 backdrop-blur-md transition-opacity animate-fadeIn"
          />
          <div className="relative w-full max-w-2xl bg-white text-palette-eggplant rounded-3xl border border-palette-laceBorder shadow-2xl overflow-hidden z-10 animate-scaleUp my-auto flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="bg-palette-eggplant p-5 border-b border-white/15 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-palette-shamrock flex items-center justify-center shadow-md">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-extrabold text-white leading-tight">
                    Privacy Policy & Data Security
                  </h3>
                  <p className="text-xs text-palette-lilac font-medium">The Royal Table Gourmet Services</p>
                </div>
              </div>
              <button
                onClick={() => setIsPrivacyOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-palette-eggplant/85 leading-relaxed bg-palette-lace/30">
              
              <div className="bg-palette-shamrock/15 p-3.5 rounded-2xl border border-palette-shamrock/40 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-palette-shamrock shrink-0" />
                <div>
                  <h4 className="font-bold text-palette-eggplant text-xs uppercase">100% Confidential & Secure Guarantee</h4>
                  <p className="text-[11px] text-palette-eggplant/75">Your privacy and event security are held to the highest royal hospitality standards.</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-serif font-extrabold text-palette-eggplant text-sm">1. Information We Collect</h4>
                <p>When you request an estimate or submit a booking form, we collect essential event details including your full name, contact number, email address, event date, guest count, and catering preferences.</p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-serif font-extrabold text-palette-eggplant text-sm">2. How We Use Your Data</h4>
                <p>Your details are strictly used to prepare authentic South Indian catering quotations, coordinate logistics with our master chef team, and provide concierge support for your event.</p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-serif font-extrabold text-palette-eggplant text-sm">3. Zero Third-Party Sharing</h4>
                <p>We do NOT sell, rent, or trade your personal information to marketing agencies or third-party vendors. Your contact details remain confidential within our culinary concierge database.</p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-serif font-extrabold text-palette-eggplant text-sm">4. WhatsApp Communication</h4>
                <p>WhatsApp updates are sent only upon your explicit request when choosing to share confirmation details or initiate direct chat with our concierge helpline.</p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-serif font-extrabold text-palette-eggplant text-sm">5. Data Inquiries & Deletion</h4>
                <p>If you wish to update or permanently delete your contact records from our system, please email our privacy team at <a href="mailto:privacy@royaltablecatering.com" className="text-palette-shamrock font-bold underline">privacy@royaltablecatering.com</a>.</p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-palette-laceBorder flex justify-end shrink-0">
              <button
                onClick={() => setIsPrivacyOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-palette-eggplant hover:bg-palette-eggplantDark text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                I Understand & Accept
              </button>
            </div>

          </div>
        </div>
      )}

    </footer>
  );
}
