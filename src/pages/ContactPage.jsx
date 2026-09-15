import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';

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
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
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
      a: "Yes! Once an initial booking estimate is created, we invite clients to our studio kitchen for a complimentary tasting session with our executive chef."
    },
    {
      q: "Can you accommodate strict Jain, Vegan, or Sattvic dietary needs?",
      a: "Absolutely. We maintain separate dedicated cooking utensils and prep stations for 100% pure Jain, Sattvic, Vegan, and Halal catering."
    }
  ];

  return (
    <div className="pt-28 pb-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-palette-lace text-palette-eggplant">
      
      {/* Header Banner with Background Image & Eggplant Opacity Overlay */}
      <section className="relative text-center max-w-5xl mx-auto px-6 py-14 rounded-3xl overflow-hidden shadow-2xl border border-palette-lilac/30 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url('/images/dishes/kaapi_lounge.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-palette-eggplant/95 via-palette-eggplantDark/90 to-palette-eggplant/95 backdrop-blur-xs" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 shadow-inner border border-palette-shamrock/40">
            <Phone className="w-4 h-4 text-palette-shamrock" />
            <span>Connect with Concierge</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-white">
            Contact <span className="bg-gradient-to-r from-white via-palette-shamrock to-white bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">The Royal Table Concierge</span>
          </h1>
          <p className="text-palette-lilac/90 text-sm sm:text-base max-w-2xl mx-auto">
            Have a query about South Indian catering packages, custom menus, or date availability? Reach out to our event specialists.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-palette-laceBorder shadow-md">
          <h2 className="font-serif text-2xl font-extrabold text-palette-eggplant mb-6">Send an Inquiry Message</h2>

          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle className="w-16 h-16 text-palette-shamrock mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-palette-eggplant">Message Sent Successfully!</h3>
              <p className="text-palette-eggplant/75 text-sm max-w-md mx-auto">
                Thank you for contacting us, <span className="font-bold text-palette-eggplant">{formData.name}</span>. Our event coordinator will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-palette-lilacLight text-palette-eggplant rounded-xl font-bold text-xs hover:bg-palette-lilac/30 border border-palette-lilac/30"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-palette-eggplant/80 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Kalyanaraman S"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-palette-eggplant/80 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98400 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-palette-eggplant/80 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-palette-eggplant/80 mb-1">Inquiry Subject</label>
                <input
                  type="text"
                  placeholder="e.g. South Indian Wedding Banana Leaf Feast Quote"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-palette-eggplant/80 mb-1">Your Message *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Details regarding your event date, location, expected guests..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-palette-eggplant hover:bg-palette-eggplantDark text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Send className="w-4 h-4 text-palette-shamrock" />
                <span>Submit Inquiry Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-palette-laceBorder shadow-md space-y-4">
            <h3 className="font-serif text-xl font-extrabold text-palette-eggplant">Direct Communication</h3>
            
            <div className="space-y-3 text-sm text-palette-eggplant">
              <div className="flex items-center gap-3 p-3 bg-palette-lace rounded-xl border border-palette-laceBorder">
                <Phone className="w-5 h-5 text-palette-shamrock" />
                <div>
                  <p className="text-[10px] text-palette-eggplant/60 uppercase font-bold">24/7 Hotline & WhatsApp</p>
                  <a href="tel:+919840012345" className="font-bold text-palette-eggplant hover:text-palette-shamrock">
                    +91 98400 12345 / +91 94440 54321
                  </a>
                  <p className="text-[10px] text-palette-shamrock font-bold mt-0.5">Toll-Free: 1800-425-7890</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-palette-lace rounded-xl border border-palette-laceBorder">
                <Mail className="w-5 h-5 text-palette-eggplant" />
                <div>
                  <p className="text-[10px] text-palette-eggplant/60 uppercase font-bold">Official Email</p>
                  <a href="mailto:bookings@royaltablecatering.com" className="font-bold text-palette-eggplant hover:text-palette-shamrock">
                    bookings@royaltablecatering.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-palette-lace rounded-xl border border-palette-laceBorder">
                <MapPin className="w-5 h-5 text-palette-shamrock shrink-0 mt-1" />
                <div>
                  <p className="text-[10px] text-palette-eggplant/60 uppercase font-bold">Head Studio Location</p>
                  <p className="text-palette-eggplant text-xs">108 Royal Heritage Boulevard, Culinary District, Metro City</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <a
              href="https://wa.me/919840012345?text=Hello%20Royal%20Table%20Catering!%20I%20want%20to%20inquire%20about%20South%20Indian%20catering%20services."
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-2xl bg-palette-shamrock hover:bg-palette-shamrockDark text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Instant Chat on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto pt-8">
        <h2 className="font-serif text-2xl font-extrabold text-palette-eggplant text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-palette-laceBorder overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full p-5 text-left font-serif text-base font-bold text-palette-eggplant flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-5 h-5 text-palette-shamrock" /> : <ChevronDown className="w-5 h-5 text-palette-eggplant/40" />}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-palette-eggplant/80 leading-relaxed border-t border-palette-laceBorder pt-3">
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
