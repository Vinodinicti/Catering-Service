import React, { useState } from 'react';
import videoSource from '../assets/royal-catering-video.mp4';
import Card3DTilt from '../components/3d/Card3DTilt';
import InstantEstimator from '../components/estimator/InstantEstimator';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuData';
import { LIVE_STATIONS } from '../data/packageData';
import { Sparkles, Utensils, Star, ArrowRight, Flame, ChevronRight } from 'lucide-react';

export default function HomePage({ setActiveTab, onOpenEstimate, onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredMenuItems = activeCategory === 'all'
    ? MENU_ITEMS.slice(0, 6)
    : MENU_ITEMS.filter(item => item.category === activeCategory).slice(0, 6);

  return (
    <div className="space-y-0 text-palette-eggplant">
      
      {/* --- 1. HERO SECTION (CLEAN WHITE BACKGROUND) --- */}
      <section className="relative min-h-[85vh] pt-20 lg:pt-24 pb-16 flex items-center overflow-hidden bg-white text-palette-eggplant">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-palette-lilac/25 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-palette-shamrock/15 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-palette-shamrock/15 border border-palette-shamrock/40 px-4 py-1.5 rounded-full text-xs font-extrabold text-palette-shamrock tracking-wider uppercase shadow-lilac-sm">
                <Sparkles className="w-4 h-4 text-palette-shamrock animate-pulse" />
                <span>Luxury South Indian Catering & Culinary Arts</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-palette-eggplant leading-[1.15] tracking-tight">
                Crafting{' '}
                <span className="bg-gradient-to-r from-palette-eggplant via-palette-shamrock to-palette-eggplant bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">
                  Royal Dakshin Feasts
                </span>{' '}
                & Imperial Hospitality
              </h1>

              <p className="text-palette-eggplant/80 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
                From traditional banana leaf wedding feasts to grand corporate galas, we bring authentic master South Indian recipes, live dosa/tawa counters, and white-glove service directly to your venue.
              </p>

              {/* Multi-color CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-palette-shamrock hover:bg-palette-shamrockDark text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-lilac-md hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <Utensils className="w-5 h-5" />
                  <span>Book Catering Event</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <button
                  onClick={onOpenEstimate}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl border-2 border-palette-eggplant text-palette-eggplant hover:bg-palette-eggplant hover:text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-lilac-sm transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5 text-palette-shamrock" />
                  <span>Instant Cost Estimator</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-palette-laceBorder max-w-lg mx-auto lg:mx-0">
                <div>
                  <h4 className="font-sans text-2xl sm:text-3xl font-extrabold text-palette-shamrock tracking-tight">500+</h4>
                  <p className="text-xs text-palette-eggplant/75 font-semibold">Royal Events Served</p>
                </div>
                <div>
                  <h4 className="font-sans text-2xl sm:text-3xl font-extrabold text-palette-eggplant tracking-tight">40+</h4>
                  <p className="text-xs text-palette-eggplant/75 font-semibold">Master Culinary Chefs</p>
                </div>
                <div>
                  <h4 className="font-sans text-2xl sm:text-3xl font-extrabold text-palette-shamrock tracking-tight">99.8%</h4>
                  <p className="text-xs text-palette-eggplant/75 font-semibold">Guest Satisfaction</p>
                </div>
              </div>

            </div>

            {/* Right: Video Feature */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[500px] overflow-hidden rounded-[32px] border border-palette-laceBorder bg-white p-3 shadow-[0_30px_90px_rgba(36,30,62,0.12)]">
                <div className="absolute inset-x-6 top-6 z-10 rounded-full border border-white/60 bg-white/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-white backdrop-blur-sm">
                  Royal Feast
                </div>
                <video
                  src={videoSource}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-[520px] w-full rounded-[24px] object-cover bg-palette-lace"
                />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* --- 2. CATERING SERVICES SHOWCASE (THEME: SOFT LACE #F7F5FA) --- */}
      <section className="bg-palette-lace py-20 border-y border-palette-laceBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-palette-eggplant bg-palette-lilac/40 px-3.5 py-1 rounded-full border border-palette-lilac/50">
              Bespoke Hospitality
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-palette-eggplant mt-3">
              Tailored South Indian Catering for Every Milestone
            </h2>
            <p className="text-palette-eggplant/75 text-sm mt-3">
              Every celebration deserves authentic banana leaf feasts, live interactive tawa counters, and rich traditional hospitality.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              {
                title: "Royal South Weddings",
                badge: "Signature",
                badgeBg: "bg-palette-eggplant text-white",
                desc: "Traditional 21-item banana leaf feasts & multi-course imperial dining for up to 3,000 guests.",
                image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
              },
              {
                title: "Corporate Galas",
                badge: "Executive",
                badgeBg: "bg-palette-eggplant text-white",
                desc: "Sophisticated tiffin spreads, plated fine dining & custom Kumbakonam kaapi lounges for VIP meets.",
                image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600",
              },
              {
                title: "Sasthiabdhapoorthi & Birthdays",
                badge: "Intimate",
                badgeBg: "bg-palette-shamrock text-white",
                desc: "Personal chef on-site, traditional sweet platters & curated tiffin pairings for family functions.",
                image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600",
              },
              {
                title: "Outdoor & Destination Events",
                badge: "Outdoor",
                badgeBg: "bg-palette-lilac text-palette-eggplant font-bold",
                desc: "Mobile luxury kitchens, live open-flame tawa grills & beachside BBQ buffets anywhere across India.",
                image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?auto=format&fit=crop&q=80&w=600",
              }
            ].map((service, idx) => (
              <Card3DTilt key={idx} className="bg-white border-palette-laceBorder shadow-lilac-md hover:shadow-lilac-lg group rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="relative h-32 sm:h-48 overflow-hidden rounded-t-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-palette-eggplant/60 via-transparent to-transparent" />
                    <span className={`absolute top-2 right-2 text-[9px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm ${service.badgeBg}`}>
                      {service.badge}
                    </span>
                  </div>
                  <div className="p-3 sm:p-5 space-y-1.5 sm:space-y-3">
                    <h3 className="font-serif text-sm sm:text-xl font-bold text-palette-eggplant group-hover:text-palette-shamrock transition-colors line-clamp-1 sm:line-clamp-none">
                      {service.title}
                    </h3>
                    <p className="text-palette-eggplant/75 text-[11px] sm:text-xs leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {service.desc}
                    </p>
                  </div>
                </div>
                <div className="p-3 sm:p-5 pt-0">
                  <button
                    onClick={() => {
                      setActiveTab('catering');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="pt-1 text-[11px] sm:text-xs font-bold text-palette-eggplant flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    <span>Packages</span>
                    <ChevronRight className="w-3.5 h-3.5 text-palette-shamrock" />
                  </button>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </div>
      </section>


      {/* --- 3. LIVE COOKING STATIONS SECTION (THEME: DARK PURPLE SECTION WITH CRISP ANIMATED WHITE CARDS) --- */}
      <section className="bg-palette-eggplantDark py-20 text-white relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-palette-shamrock/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-palette-lilac/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-palette-shamrock flex items-center justify-center gap-1 bg-white/10 px-4 py-1.5 rounded-full inline-flex border border-palette-shamrock/40 shadow-lilac-sm">
              <Flame className="w-4 h-4 text-palette-shamrock animate-bounce" />
              Interactive South Indian Live Counters
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mt-3">
              Live Mysuru Dosa, Appam & Filter Kaapi Lounge
            </h2>
            <p className="text-palette-lilac text-sm mt-3">
              Delight your guests with live master chefs preparing crisp dosas, fluffy appams & foamy kaapi right before their eyes.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {LIVE_STATIONS.map((station, idx) => {
              const iconGradients = [
                'from-palette-shamrock to-emerald-400',
                'from-palette-lilac to-purple-500',
                'from-amber-400 to-amber-500',
                'from-palette-eggplant to-purple-700'
              ];
              return (
                <div
                  key={station.id}
                  className="bg-white text-palette-eggplant p-3.5 sm:p-6 rounded-2xl border-2 border-palette-shamrock/40 shadow-lilac-lg hover:border-palette-shamrock hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl transition-all duration-300 space-y-2 sm:space-y-4 group cursor-pointer"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr ${iconGradients[idx % 4]} flex items-center justify-center text-white shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                    <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-white animate-bounce-subtle" />
                  </div>
                  <h3 className="font-serif text-sm sm:text-lg font-bold text-palette-eggplant group-hover:text-palette-shamrock transition-colors line-clamp-1 sm:line-clamp-none">{station.name}</h3>
                  <p className="text-palette-eggplant/80 text-[11px] sm:text-xs leading-relaxed line-clamp-2 sm:line-clamp-none">{station.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* --- 4. FEATURED FOOD MENU SHOWCASE (THEME: SOFT LILAC TINT #ECE8FF) --- */}
      <section className="bg-palette-lilacLight py-20 border-b border-palette-laceBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-palette-eggplant bg-palette-lilac/50 px-3 py-1 rounded-full">
                Culinary Creations
              </span>
              <h2 className="font-serif text-3xl font-extrabold text-palette-eggplant mt-2">Chef's Signature South Indian Highlights</h2>
            </div>
            <button
              onClick={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl bg-palette-eggplant hover:bg-palette-eggplantDark text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all self-start md:self-auto hover:scale-105"
            >
              <span>View Full Menu Catalog ({MENU_ITEMS.length} Items)</span>
              <ArrowRight className="w-4 h-4 text-palette-shamrock" />
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-palette-eggplant text-white shadow-md font-extrabold'
                    : 'bg-white text-palette-eggplant/80 hover:text-palette-eggplant border border-palette-laceBorder'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dish Grid: 2x2 on mobile! */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {filteredMenuItems.map((dish) => (
              <Card3DTilt key={dish.id} className="bg-white border-palette-laceBorder group shadow-lilac-md hover:shadow-lilac-lg rounded-2xl">
                <div className="relative h-32 sm:h-52 overflow-hidden rounded-t-2xl">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-palette-eggplant/60 via-transparent to-transparent" />
                  
                  <span className={`absolute top-2 left-2 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider ${
                    dish.dietary === 'veg' ? 'bg-palette-shamrock text-white' : 'bg-palette-eggplant text-white'
                  }`}>
                    {dish.dietary === 'veg' ? '● Veg' : '▲ Non-Veg'}
                  </span>
                </div>

                <div className="p-3 sm:p-5 space-y-1.5 sm:space-y-3">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="font-serif text-xs sm:text-lg font-bold text-palette-eggplant group-hover:text-palette-shamrock transition-colors line-clamp-1">
                      {dish.name}
                    </h3>
                    <span className="font-sans font-extrabold text-palette-eggplant text-xs sm:text-lg shrink-0">
                      ₹{dish.price} <span className="text-[9px] sm:text-xs text-palette-eggplant/70">/ portion</span>
                    </span>
                  </div>
                  
                  <p className="text-palette-eggplant/75 text-[10px] sm:text-xs line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[10px] sm:text-[11px] text-palette-eggplant/70 border-t border-palette-laceBorder">
                    <div className="flex items-center gap-1 text-palette-shamrock font-bold">
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-palette-shamrock" />
                      <span>{dish.rating} Rating</span>
                    </div>
                  </div>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </div>
      </section>


      {/* --- 5. EMBEDDED INSTANT ESTIMATOR WIDGET --- */}
      <section className="bg-palette-lace py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InstantEstimator onBookWithEstimate={onOpenBooking} />
        </div>
      </section>

    </div>
  );
}
