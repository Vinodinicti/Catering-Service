import React, { useState } from 'react';
import videoSource from '../assets/royal-catering-video.mp4';
import Card3DTilt from '../components/3d/Card3DTilt';
import InstantEstimator from '../components/estimator/InstantEstimator';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuData';
import { LIVE_STATIONS } from '../data/packageData';
import { Sparkles, Utensils, Star, ArrowRight, Flame, ChevronRight, UtensilsCrossed } from 'lucide-react';

export default function HomePage({ setActiveTab, onOpenEstimate, onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredMenuItems = activeCategory === 'all'
    ? MENU_ITEMS.slice(0, 6)
    : MENU_ITEMS.filter(item => item.category === activeCategory).slice(0, 6);

  return (
    <div className="space-y-0 text-palette-eggplant">
      
      {/* --- 1. HERO SECTION (TWINKLING LILAC FOOD STARS & FLOATING SPARKLES) --- */}
      <section className="relative min-h-[85vh] pt-20 lg:pt-24 pb-16 flex items-center overflow-hidden bg-white text-palette-eggplant">
        
        {/* Soft Ambient Lilac Glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-palette-lilac/30 rounded-full blur-[130px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-palette-shamrock/15 rounded-full blur-[150px] pointer-events-none" />

        {/* Floating Twinkling Lilac Food Stars & Culinary Sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Twinkling Star 1 */}
          <div className="absolute top-16 left-[12%] text-palette-lilac animate-food-twinkle">
            <Star className="w-5 h-5 fill-palette-lilac/40 text-palette-lilac" />
          </div>
          {/* Twinkling Star 2 */}
          <div className="absolute top-36 right-[15%] text-palette-shamrock animate-food-twinkle" style={{ animationDelay: '1.2s' }}>
            <Sparkles className="w-6 h-6 text-palette-shamrock" />
          </div>
          {/* Floating Food Icon 1 */}
          <div className="absolute bottom-24 left-[8%] text-palette-lilac/60 animate-float-slow" style={{ animationDelay: '0.8s' }}>
            <UtensilsCrossed className="w-8 h-8 opacity-40" />
          </div>
          {/* Twinkling Star 3 */}
          <div className="absolute top-[48%] left-[45%] text-palette-lilac animate-food-twinkle" style={{ animationDelay: '2.4s' }}>
            <Star className="w-4 h-4 fill-palette-lilac/30 text-palette-lilac" />
          </div>
          {/* Twinkling Star 4 */}
          <div className="absolute bottom-16 right-[22%] text-palette-shamrock/60 animate-food-twinkle" style={{ animationDelay: '3.1s' }}>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

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

              {/* Multi-color CTAs - 2 Buttons Side-by-Side on 1 Line */}
              <div className="pt-2 flex flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 w-full max-w-xl mx-auto lg:mx-0">
                <button
                  onClick={onOpenBooking}
                  className="flex-1 sm:flex-none px-3.5 sm:px-7 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-palette-shamrock hover:bg-palette-shamrockDark text-white font-extrabold text-xs sm:text-base flex items-center justify-center gap-1.5 sm:gap-2.5 shadow-lilac-md hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <Utensils className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="whitespace-nowrap">Book Catering Event</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 hidden sm:inline-block" />
                </button>
                
                <button
                  onClick={onOpenEstimate}
                  className="flex-1 sm:flex-none px-3.5 sm:px-7 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-palette-eggplant text-palette-eggplant hover:bg-palette-eggplant hover:text-white font-extrabold text-xs sm:text-base flex items-center justify-center gap-1.5 sm:gap-2.5 shadow-lilac-sm transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-palette-shamrock shrink-0" />
                  <span className="whitespace-nowrap">Instant Cost Estimator</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-palette-laceBorder max-w-lg mx-auto lg:mx-0">
                <div className="transform hover:scale-105 transition-transform">
                  <h4 className="font-sans text-2xl sm:text-4xl font-black text-palette-shamrock tracking-tight drop-shadow-sm">
                    <AnimatedCounter target={500} suffix="+" duration={2000} />
                  </h4>
                  <p className="text-xs text-palette-eggplant/80 font-bold mt-1">Royal Events Served</p>
                </div>
                <div className="transform hover:scale-105 transition-transform">
                  <h4 className="font-sans text-2xl sm:text-4xl font-black text-palette-eggplant tracking-tight drop-shadow-sm">
                    <AnimatedCounter target={40} suffix="+" duration={1800} />
                  </h4>
                  <p className="text-xs text-palette-eggplant/80 font-bold mt-1">Master Culinary Chefs</p>
                </div>
                <div className="transform hover:scale-105 transition-transform">
                  <h4 className="font-sans text-2xl sm:text-4xl font-black text-palette-shamrock tracking-tight drop-shadow-sm">
                    <AnimatedCounter target={99.8} suffix="%" decimals={1} duration={2200} />
                  </h4>
                  <p className="text-xs text-palette-eggplant/80 font-bold mt-1">Guest Satisfaction</p>
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


      {/* --- 2. CATERING SERVICES SHOWCASE (THEME: ANIMATED LILAC FOOD STEAM WISPS) --- */}
      <section className="bg-palette-lace py-20 border-y border-palette-laceBorder relative overflow-hidden">
        
        {/* Animated Rising Food Steam / Smoke Wisps (Lilac Tinted) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Steam Wisp 1 */}
          <svg className="absolute bottom-4 left-[10%] w-24 h-40 text-palette-lilac/40 animate-steam-rise" viewBox="0 0 100 200" fill="none">
            <path d="M50,200 Q20,150 60,100 T50,0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
          </svg>
          {/* Steam Wisp 2 */}
          <svg className="absolute bottom-8 left-[35%] w-20 h-36 text-palette-lilac/30 animate-steam-rise" style={{ animationDelay: '1.8s' }} viewBox="0 0 100 200" fill="none">
            <path d="M40,200 Q70,140 30,80 T60,0" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />
          </svg>
          {/* Steam Wisp 3 */}
          <svg className="absolute bottom-2 right-[25%] w-28 h-44 text-palette-lilac/35 animate-steam-rise" style={{ animationDelay: '3.5s' }} viewBox="0 0 100 200" fill="none">
            <path d="M50,200 Q30,130 70,70 T40,0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
          </svg>
          {/* Floating Lilac Gradient Aura Ring */}
          <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full border border-palette-lilac/40 animate-spin-slow pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                  <div className="p-3.5 sm:p-5 space-y-2">
                    <h3 className="font-serif text-sm sm:text-xl font-extrabold text-palette-eggplant group-hover:text-palette-shamrock transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-palette-eggplant/90 text-xs sm:text-sm leading-relaxed font-normal">
                      {service.desc}
                    </p>
                  </div>
                </div>
                <div className="p-3.5 sm:p-5 pt-0">
                  <button
                    onClick={() => {
                      setActiveTab('catering');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="pt-1 text-xs font-bold text-palette-eggplant flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    <span>View Packages</span>
                    <ChevronRight className="w-4 h-4 text-palette-shamrock" />
                  </button>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </div>
      </section>


      {/* --- 3. LIVE COOKING STATIONS SECTION (THEME: LIVE COUNTER SPARKLES & LILAC EMBER PARTICLES) --- */}
      <section className="bg-palette-eggplantDark py-20 text-white relative overflow-hidden">
        
        {/* Deep Glows & Floating Lilac Embers */}
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-palette-shamrock/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-palette-lilac/30 rounded-full blur-[130px] pointer-events-none animate-pulse" />

        {/* Floating Lilac & Gold Ember Sparks */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-12 left-[15%] text-palette-lilac animate-food-twinkle">
            <Flame className="w-5 h-5 text-palette-lilac/50" />
          </div>
          <div className="absolute top-1/3 right-[10%] text-palette-shamrock animate-float-drift">
            <Sparkles className="w-6 h-6 text-palette-shamrock/70" />
          </div>
          <div className="absolute bottom-16 left-[40%] text-palette-lilac animate-float-slow" style={{ animationDelay: '1.5s' }}>
            <Star className="w-4 h-4 text-palette-lilac/60 fill-palette-lilac/40" />
          </div>
        </div>

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
                  className="bg-white text-palette-eggplant p-4 sm:p-6 rounded-2xl border-2 border-palette-shamrock/40 shadow-lilac-lg hover:border-palette-shamrock hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl transition-all duration-300 space-y-2.5 group cursor-pointer"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr ${iconGradients[idx % 4]} flex items-center justify-center text-white shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                    <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-white animate-bounce-subtle" />
                  </div>
                  <h3 className="font-serif text-sm sm:text-lg font-bold text-palette-eggplant group-hover:text-palette-shamrock transition-colors leading-snug">{station.name}</h3>
                  <p className="text-palette-eggplant/90 text-xs leading-relaxed font-normal">{station.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* --- 4. FEATURED FOOD MENU SHOWCASE (THEME: FLOATING LILAC CULINARY CONSTELLATIONS) --- */}
      <section className="bg-gradient-to-br from-palette-lilacLight via-white to-palette-lilacLight/60 py-20 border-b border-palette-laceBorder relative overflow-hidden">
        
        {/* Floating Lilac Culinary Icons & Star Clusters */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-10 left-8 text-palette-lilac/50 animate-float-slow">
            <UtensilsCrossed className="w-12 h-12 opacity-30" />
          </div>
          <div className="absolute bottom-12 right-12 text-palette-lilac/60 animate-food-twinkle" style={{ animationDelay: '2s' }}>
            <Sparkles className="w-10 h-10 text-palette-lilac" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-palette-eggplant bg-palette-lilac/50 px-3 py-1 rounded-full border border-palette-lilac/60 shadow-sm">
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

          {/* Dish Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredMenuItems.map((dish) => (
              <Card3DTilt key={dish.id} className="bg-white border border-palette-laceBorder group cursor-pointer shadow-lilac-md hover:shadow-xl rounded-2xl flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="relative h-40 sm:h-52 overflow-hidden rounded-t-2xl">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-palette-eggplant/70 via-transparent to-transparent" />
                    
                    {/* Dietary Badge */}
                    <span className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md ${
                      dish.dietary === 'veg' ? 'bg-palette-shamrock text-white' : 'bg-palette-eggplant text-white'
                    }`}>
                      {dish.dietary === 'veg' ? '● Veg' : '▲ Non-Veg'}
                    </span>

                    {/* High Contrast Price Pill Badge */}
                    <div className="absolute bottom-2.5 right-2.5 bg-palette-eggplant/90 backdrop-blur-md text-white px-2.5 py-1 rounded-xl text-xs sm:text-sm font-black shadow-md border border-white/20">
                      ₹{dish.price} <span className="text-[9px] sm:text-[10px] font-semibold text-palette-lilac">/ portion</span>
                    </div>
                  </div>

                  {/* Content Box */}
                  <div className="p-4 sm:p-5 space-y-2">
                    <h3 className="font-serif text-base sm:text-lg font-black text-palette-eggplant group-hover:text-palette-shamrock transition-colors leading-snug line-clamp-2">
                      {dish.name}
                    </h3>
                    
                    <p className="text-palette-eggplant/90 text-xs sm:text-sm font-normal line-clamp-2 sm:line-clamp-3 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Footer Rating */}
                <div className="p-4 sm:p-5 pt-0">
                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-palette-eggplant border-t border-palette-laceBorder">
                    <div className="inline-flex items-center gap-1 bg-palette-shamrock/15 text-palette-shamrockDark px-2.5 py-1 rounded-md font-black text-xs">
                      <Star className="w-3.5 h-3.5 fill-palette-shamrockDark text-palette-shamrockDark" />
                      <span>{dish.rating} Rating</span>
                    </div>
                  </div>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </div>
      </section>


      {/* --- 5. EMBEDDED INSTANT ESTIMATOR WIDGET (THEME: SOFT LILAC ORB AURA) --- */}
      <section className="bg-palette-lace py-20 relative overflow-hidden">
        {/* Soft Animated Lilac Background Glow Field */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-palette-lilac/30 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <InstantEstimator onBookWithEstimate={onOpenBooking} />
        </div>
      </section>

    </div>
  );
}
