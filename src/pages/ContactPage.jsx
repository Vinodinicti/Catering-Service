import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle, ChevronDown, ChevronUp, Clock, Sparkles, Navigation, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "How far in advance should we book Royal Table South Indian Catering?",
      a: "We recommend booking 4 to 8 weeks in advance for grand South Indian weddings & large corporate galas to secure your preferred date. Intimate events can be accommodated up to 10 days prior subject to availability."
    },
    {
      q: "Do you offer traditional Banana Leaf feast service?",
      a: "Yes! We specialize in authentic 21-item traditional banana leaf feasts with dedicated servers, brass davarah kaapi service, and live tiffin stalls."
    },
    {
      q: "Do you offer complimentary food tasting sessions?",
      a: "Yes! Once an initial booking estimate is created, we invite clients to our studio kitchen for a complimentary tasting session with our executive master chef."
    },
    {
      q: "Can you accommodate strict Jain, Vegan, or Sattvic dietary needs?",
      a: "Absolutely. We maintain separate dedicated cooking utensils and prep stations for 100% pure Jain, Sattvic, Vegan, and Halal catering."
    }
  ];

  return (
    <div className="pt-20 lg:pt-24 pb-16 space-y-10 sm:space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-palette-lace text-palette-eggplant relative overflow-hidden animate-fadeIn">
      
      {/* Ambient Lighting Background Accents */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-palette-lilac/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-palette-shamrock/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner with Background Image & Medium Opacity Overlay */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative text-center max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 rounded-3xl overflow-hidden shadow-2xl border-2 border-palette-lilac/40 text-white group"
      >
        {/* Background Image Slow Horizontal Zoom */}
        <motion.div 
          animate={{ 
            scale: [1, 1.08, 1],
            x: [0, -15, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/dishes/kaapi_lounge.jpg')` }}
        />
        
        {/* Medium Opacity Eggplant Overlay */}
        <div className="absolute inset-0 bg-palette-eggplant/75 backdrop-blur-[2px] transition-opacity duration-500 group-hover:bg-palette-eggplant/70" />

        <div className="relative z-10 space-y-3.5 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-lg border border-white/30"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-palette-shamrock animate-bounce" />
            <span>24/7 Culinary Concierge Hotline</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-md"
          >
            Contact <span className="bg-gradient-to-r from-palette-shamrock via-white to-palette-shamrock bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">The Royal Table Concierge</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-white/95 text-xs sm:text-base max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm"
          >
            Have a question about South Indian catering packages, custom menu tasting, or event dates? Our royal event coordinators are ready to assist you.
          </motion.p>
        </div>
      </motion.section>

      {/* Main Grid: Inquiry Form & Communication Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 relative z-10">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border-2 border-palette-laceBorder shadow-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-palette-laceBorder">
            <div>
              <h2 className="font-serif text-2xl font-extrabold text-palette-eggplant">Send an Inquiry Message</h2>
              <p className="text-xs text-palette-eggplant/70 font-medium">We respond to all catering inquiries within 2 hours.</p>
            </div>
            <span className="w-3 h-3 rounded-full bg-palette-shamrock animate-ping" />
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-5 animate-scaleUp">
              <div className="w-20 h-20 bg-palette-shamrock/20 rounded-full border-2 border-palette-shamrock flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-palette-shamrock" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-extrabold text-palette-eggplant">Message Sent Successfully!</h3>
                <p className="text-palette-eggplant/75 text-sm max-w-md mx-auto mt-2">
                  Thank you, <span className="font-bold text-palette-eggplant">{formData.name}</span>. Our royal event coordinator will contact you shortly via phone or WhatsApp.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-palette-shamrock hover:bg-palette-shamrockDark text-white rounded-xl font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase text-palette-eggplant/80 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Kalyanaraman S"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock focus:ring-2 focus:ring-palette-shamrock/20 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold uppercase text-palette-eggplant/80 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98400 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock focus:ring-2 focus:ring-palette-shamrock/20 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-palette-eggplant/80 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock focus:ring-2 focus:ring-palette-shamrock/20 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-palette-eggplant/80 mb-1">
                  Inquiry Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grand Wedding Banana Leaf Feast Quote"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock focus:ring-2 focus:ring-palette-shamrock/20 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-palette-eggplant/80 mb-1">
                  Your Message *
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Details regarding your event date, venue location, expected guests..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock focus:ring-2 focus:ring-palette-shamrock/20 transition-all font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-palette-shamrock hover:bg-palette-shamrockDark text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 text-white" />
                <span>Submit Inquiry Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Direct Info Cards & Interactive Studio Map */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Direct Communication Info Card */}
          <div className="bg-white p-4 sm:p-8 rounded-3xl border-2 border-palette-laceBorder shadow-xl space-y-5 transition-all hover:shadow-2xl">
            <div className="flex items-center justify-between border-b border-palette-laceBorder pb-3">
              <h3 className="font-serif text-xl font-extrabold text-palette-eggplant">Direct Communication</h3>
              <span className="text-[10px] uppercase font-black text-palette-shamrock bg-palette-shamrock/15 px-2.5 py-0.5 rounded-full border border-palette-shamrock/30">
                Fast Support
              </span>
            </div>
            
            <div className="space-y-3.5 text-sm text-palette-eggplant">
              <div className="flex items-center gap-3 sm:gap-3.5 p-3 sm:p-3.5 bg-gradient-to-r from-palette-lace to-palette-lilacLight/40 rounded-2xl border border-palette-laceBorder hover:border-palette-shamrock/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-palette-eggplant text-white flex items-center justify-center shrink-0 shadow-md">
                  <Phone className="w-5 h-5 text-palette-shamrock" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-palette-eggplant/60 uppercase font-extrabold">24/7 Helpline & WhatsApp</p>
                  <a href="tel:+919840012345" className="font-extrabold text-palette-eggplant hover:text-palette-shamrock transition-colors block text-xs sm:text-sm">
                    +91 98400 12345 / +91 94440 54321
                  </a>
                  <p className="text-[10px] text-palette-shamrock font-bold mt-0.5">Toll-Free Helpline: 1800-425-7890</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-3.5 p-3 sm:p-3.5 bg-gradient-to-r from-palette-lace to-palette-lilacLight/40 rounded-2xl border border-palette-laceBorder hover:border-palette-shamrock/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-palette-eggplant text-white flex items-center justify-center shrink-0 shadow-md">
                  <Mail className="w-5 h-5 text-palette-shamrock" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-palette-eggplant/60 uppercase font-extrabold">Official Email</p>
                  <a href="mailto:bookings@royaltablecatering.com" className="font-extrabold text-palette-eggplant hover:text-palette-shamrock transition-colors block text-[11px] sm:text-sm break-all">
                    bookings@royaltablecatering.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 bg-gradient-to-r from-palette-lace to-palette-lilacLight/40 rounded-2xl border border-palette-laceBorder hover:border-palette-shamrock/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-palette-eggplant text-white flex items-center justify-center shrink-0 shadow-md mt-0.5">
                  <MapPin className="w-5 h-5 text-palette-shamrock" />
                </div>
                <div>
                  <p className="text-[10px] text-palette-eggplant/60 uppercase font-extrabold">Studio & Test Kitchen</p>
                  <p className="text-palette-eggplant text-xs font-bold leading-snug">
                    108 Royal Heritage Boulevard, Culinary District, Metro City
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <a
              href="https://wa.me/919840012345?text=Hello%20Royal%20Table%20Catering!%20I%20want%20to%20inquire%20about%20South%20Indian%20catering%20services."
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 rounded-2xl bg-palette-shamrock hover:bg-palette-shamrockDark text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-palette-shamrock/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Instant Chat on WhatsApp 💬</span>
            </a>
          </div>

          {/* Interactive Culinary Studio Map Card */}
          <div className="bg-gradient-to-br from-palette-eggplant via-palette-eggplantDark to-palette-eggplant text-white p-6 rounded-3xl border-2 border-palette-shamrock/40 shadow-xl space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-palette-shamrock animate-pulse" />
                <h4 className="font-serif font-extrabold text-base text-white">Visit Kitchen & Tasting Studio</h4>
              </div>
              <span className="text-[10px] font-black uppercase text-palette-shamrock bg-palette-shamrock/20 px-2 py-0.5 rounded-full border border-palette-shamrock/40">
                Open Daily
              </span>
            </div>

            <p className="text-xs text-palette-lilac/90 leading-relaxed font-medium">
              Join us for a complimentary tasting session. Experience our authentic banana leaf feast prep and live counter setups in person.
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-white/15 text-xs">
              <div className="flex items-center gap-2 text-white font-bold">
                <Clock className="w-4 h-4 text-palette-shamrock" />
                <span>9:00 AM – 10:00 PM (IST)</span>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-palette-shamrock font-extrabold hover:underline inline-flex items-center gap-1 text-xs"
              >
                <span>Get Directions</span>
                <Navigation className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-4xl mx-auto pt-8 relative z-10">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-palette-eggplant bg-palette-lilac/30 px-3.5 py-1 rounded-full border border-palette-lilac/40">
            Help & Guidance
          </span>
          <h2 className="font-serif text-3xl font-extrabold text-palette-eggplant">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                openFaq === idx
                  ? 'bg-white border-palette-shamrock shadow-lg ring-2 ring-palette-shamrock/20'
                  : 'bg-white/80 border-palette-laceBorder hover:border-palette-lilac shadow-sm'
              }`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full p-5 text-left font-serif text-base font-extrabold text-palette-eggplant flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-palette-shamrock shrink-0" />
                  <span>{faq.q}</span>
                </span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-palette-shamrock shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-palette-eggplant/40 shrink-0" />
                )}
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-palette-eggplant/85 leading-relaxed border-t border-palette-laceBorder/60 pt-3.5 bg-palette-lace/30 animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
