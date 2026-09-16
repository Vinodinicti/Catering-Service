import React, { useState, useEffect } from 'react';
import videoSource from '../assets/royal-catering-video.mp4';
import Card3DTilt from '../components/3d/Card3DTilt';
import InstantEstimator from '../components/estimator/InstantEstimator';
import CountUp from '../components/common/CountUp';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuData';
import { LIVE_STATIONS } from '../data/packageData';
import { Sparkles, Utensils, Star, ArrowRight, Flame, ChevronRight, UtensilsCrossed } from 'lucide-react';

// --- Helper Word-by-Word Staggered Text Reveal Component ---
function WordRevealText({ text, speed = 50, delay = 0, className = '', onComplete }) {
  const words = React.useMemo(() => text.split(' '), [text]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let intervalId;
    const timeoutId = setTimeout(() => {
      setStarted(true);
      let count = 1;
      setVisibleCount(1);
      intervalId = setInterval(() => {
        if (count <= words.length) {
          setVisibleCount(count);
          count++;
        } else {
          clearInterval(intervalId);
          if (onComplete) onComplete();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [words, speed, delay, onComplete]);

  if (!started) return <span className={className}>&nbsp;</span>;

  return (
    <span className={`${className} inline-wrap`}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`inline-block transition-all duration-300 ease-out mr-1 ${
            i < visibleCount
              ? 'opacity-100 translate-y-0 blur-0'
              : 'opacity-0 translate-y-2 blur-[2px]'
          }`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

// --- Helper Animated Bespoke Card Component ---
function AnimatedBespokeCard({ service, idx, activeCardIdx, onCardComplete, setActiveTab }) {
  const isMyTurn = idx === activeCardIdx;
  const isAlreadyFinished = idx < activeCardIdx;
  const [showOverlay, setShowOverlay] = useState(false);
  const [titleDone, setTitleDone] = useState(false);

  useEffect(() => {
    if (isMyTurn && !showOverlay) {
      // Stage 1 -> Stage 2: Slide up white overlay over lower portion of full image
      const timer = setTimeout(() => {
        setShowOverlay(true);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [isMyTurn, showOverlay]);

  useEffect(() => {
    if (isAlreadyFinished) {
      setShowOverlay(true);
      setTitleDone(true);
    }
  }, [isAlreadyFinished]);

  return (
    <div className="w-full">
      <Card3DTilt
        onClick={() => {
          setActiveTab('catering');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="bg-white border-palette-laceBorder shadow-lilac-md hover:shadow-lilac-lg group rounded-2xl relative h-[360px] sm:h-[390px] overflow-hidden cursor-pointer"
      >
        {/* Stage 1: Full Card Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <span className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-10 text-[8px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md ${service.badgeBg}`}>
            {service.badge}
          </span>
        </div>

        {/* Stage 2 & 3: White Overlay (covers lower area cleanly on mobile & desktop) with Word Reveal Text */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md p-2.5 sm:p-4 rounded-b-2xl border-t border-palette-laceBorder shadow-2xl transition-transform duration-600 ease-out z-20 flex flex-col justify-between ${
            showOverlay ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ minHeight: '52%', maxHeight: '68%' }}
        >
          <div className="space-y-1 overflow-hidden">
            <h3 className="font-serif text-[11px] sm:text-base font-extrabold text-palette-eggplant group-hover:text-palette-shamrock transition-colors leading-tight sm:leading-snug line-clamp-2">
              {showOverlay ? (
                isAlreadyFinished ? (
                  service.title
                ) : (
                  <WordRevealText
                    text={service.title}
                    speed={60}
                    delay={100}
                    onComplete={() => setTitleDone(true)}
                  />
                )
              ) : (
                <span className="opacity-0">{service.title}</span>
              )}
            </h3>

            <p className="text-palette-eggplant/85 text-[10px] sm:text-xs leading-tight sm:leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
              {showOverlay && (titleDone || isAlreadyFinished) ? (
                isAlreadyFinished ? (
                  service.desc
                ) : (
                  <WordRevealText
                    text={service.desc}
                    speed={35}
                    delay={50}
                    onComplete={onCardComplete}
                  />
                )
              ) : (
                <span className="opacity-0">{service.desc}</span>
              )}
            </p>
          </div>

          <div className="pt-1.5 sm:pt-2 border-t border-palette-laceBorder/40 flex items-center justify-between">
            <button
              onClick={() => {
                setActiveTab('catering');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[10px] sm:text-xs font-bold text-palette-eggplant flex items-center gap-1 hover:gap-2 transition-all group-hover:text-palette-shamrock"
            >
              <span>View Packages</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-palette-shamrock" />
            </button>
          </div>
        </div>
      </Card3DTilt>
    </div>
  );
}

// --- Helper 3D Floating Dish Icon Badge Container ---
function ThreeDishIconWrapper({ children, gradient }) {
  return (
    <div className="relative group/icon" style={{ perspective: '600px' }}>
      {/* 3D Floating Drop Shadow underneath badge */}
      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-2 bg-palette-eggplant/30 rounded-full blur-[4px] animate-pulse scale-x-90" />

      {/* 3D Tilting & Floating Badge Container */}
      <div
        className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-tr ${gradient} flex items-center justify-center text-white shadow-xl transition-all duration-500 transform group-hover/icon:scale-115 group-hover/icon:-translate-y-2 group-hover/icon:rotate-y-12 animate-float-slow relative`}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.4)'
        }}
      >
        {/* 3D Glossy Light Flare Overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/35 via-transparent to-black/25 pointer-events-none" />

        {/* 3D Spinning Ring Accent */}
        <div className="absolute -inset-1 rounded-2xl border border-white/40 animate-spin-slow pointer-events-none opacity-50" style={{ transform: 'rotateX(55deg)' }} />

        {/* 3D Elevating Dish SVG Icon */}
        <div style={{ transform: 'translateZ(16px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// --- Dish-Specific Animated Icon Components ---
function DosaTawaAnimatedIcon() {
  return (
    <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
      {/* Sizzling Steam Wisps */}
      <svg className="absolute -top-2 w-5 h-4 text-emerald-200 animate-pulse" viewBox="0 0 40 30" fill="none">
        <path d="M10,25 C5,15 15,10 10,0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M25,28 C20,18 30,12 25,2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      {/* Tawa & Rolled Dosa SVG */}
      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="16" rx="9" ry="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" />
        <path d="M3 16L1 18" strokeWidth="2.5" />
        <path d="M6 14C6 12 18 12 18 14C18 16 6 16 6 14Z" fill="currentColor" fillOpacity="0.9" stroke="currentColor" />
        <circle cx="10" cy="14" r="0.7" fill="#FEF08A" />
        <circle cx="14" cy="14" r="0.7" fill="#FEF08A" />
      </svg>
      <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-spin-slow" />
    </div>
  );
}

function AppamStewAnimatedIcon() {
  return (
    <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
      {/* Stew Steam */}
      <svg className="absolute -top-2.5 w-5 h-4 text-purple-200 animate-bounce-subtle" viewBox="0 0 40 30" fill="none">
        <path d="M12,25 C7,15 17,10 12,0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M28,25 C23,15 33,10 28,0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      {/* Appam Chatty / Bowl SVG */}
      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10C3 16 7 20 12 20C17 20 21 16 21 10H3Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" />
        <circle cx="12" cy="13" r="3.5" fill="white" fillOpacity="0.95" />
        <path d="M5 10C7 8 17 8 19 10" stroke="currentColor" strokeDasharray="1.5 1.5" />
      </svg>
    </div>
  );
}

function FishGrillAnimatedIcon() {
  return (
    <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
      {/* Grill Embers */}
      <div className="absolute -top-2 flex gap-1 animate-pulse">
        <Flame className="w-3 h-3 text-amber-200 fill-amber-300 animate-bounce" />
      </div>
      {/* Fish / Kebab Skewer SVG */}
      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 12C4 9 3 6.5 3 6.5C3 6.5 5.5 7.5 8.5 10C11.5 7.5 14 6.5 14 6.5C14 6.5 13 9 10.5 12C13 15 14 17.5 14 17.5C14 17.5 11.5 16.5 8.5 14C5.5 16.5 3 17.5 3 17.5C3 17.5 4 15 6.5 12Z" fill="currentColor" fillOpacity="0.85" stroke="currentColor" />
        <circle cx="5.5" cy="11.5" r="0.8" fill="white" />
        <path d="M8 10L10 14M10 9.5L12 13.5" stroke="#78350F" strokeWidth="1.5" />
        <line x1="2" y1="21" x2="22" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function FilterKaapiAnimatedIcon() {
  return (
    <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
      {/* Rich Kaapi Aroma Steam */}
      <svg className="absolute -top-2.5 w-5 h-4 text-purple-200 animate-steam-rise" viewBox="0 0 40 30" fill="none">
        <path d="M15,25 C10,15 20,10 15,0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M25,25 C20,15 30,10 25,0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      {/* Brass Davara Tumbler SVG */}
      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="18" rx="8" ry="3.5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" />
        <path d="M7 8L8.5 17C8.5 17.5 10 18 12 18C14 18 15.5 17.5 15.5 17L17 8H7Z" fill="currentColor" fillOpacity="0.8" stroke="currentColor" />
        <ellipse cx="12" cy="8" rx="5" ry="1.8" fill="#FDE68A" />
      </svg>
    </div>
  );
}

// --- Helper Bespoke Showcase Grid Component (Manages 1-by-1 Sequential Triggering) ---
function BespokeShowcaseGrid({ services, setActiveTab }) {
  const [activeCardIdx, setActiveCardIdx] = useState(-1);
  const gridRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && activeCardIdx === -1) {
          setActiveCardIdx(0); // Trigger first card when section enters view
        }
      },
      { threshold: 0.15 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, [activeCardIdx]);

  const handleCardComplete = (completedIdx) => {
    if (completedIdx === activeCardIdx) {
      setActiveCardIdx((prev) => prev + 1);
    }
  };

  return (
    <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      {services.map((service, idx) => (
        <AnimatedBespokeCard
          key={idx}
          service={service}
          idx={idx}
          activeCardIdx={activeCardIdx}
          onCardComplete={() => handleCardComplete(idx)}
          setActiveTab={setActiveTab}
        />
      ))}
    </div>
  );
}

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

              {/* Trust Badges with Number Counting Animation */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-palette-laceBorder max-w-lg mx-auto lg:mx-0">
                <div>
                  <h4 className="font-sans text-2xl sm:text-3xl font-black text-palette-shamrock tracking-tight">
                    <CountUp value="500+" duration={2200} />
                  </h4>
                  <p className="text-xs text-palette-eggplant/75 font-bold">Royal Events Served</p>
                </div>
                <div>
                  <h4 className="font-sans text-2xl sm:text-3xl font-black text-palette-eggplant tracking-tight">
                    <CountUp value="40+" duration={2000} />
                  </h4>
                  <p className="text-xs text-palette-eggplant/75 font-bold">Master Culinary Chefs</p>
                </div>
                <div>
                  <h4 className="font-sans text-2xl sm:text-3xl font-black text-palette-shamrock tracking-tight">
                    <CountUp value="99.8%" duration={2400} />
                  </h4>
                  <p className="text-xs text-palette-eggplant/75 font-bold">Guest Satisfaction</p>
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

          <BespokeShowcaseGrid
            services={[
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
            ]}
            setActiveTab={setActiveTab}
          />
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
              const dishAnimatedIcons = [
                <DosaTawaAnimatedIcon key="dosa" />,
                <AppamStewAnimatedIcon key="appam" />,
                <FishGrillAnimatedIcon key="fish" />,
                <FilterKaapiAnimatedIcon key="kaapi" />
              ];
              return (
                <div
                  key={station.id}
                  className="bg-white text-palette-eggplant p-4 sm:p-6 rounded-2xl border-2 border-palette-shamrock/40 shadow-lilac-lg hover:border-palette-shamrock hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl transition-all duration-300 space-y-2.5 group cursor-pointer"
                >
                  <ThreeDishIconWrapper gradient={iconGradients[idx % 4]}>
                    {dishAnimatedIcons[idx % 4]}
                  </ThreeDishIconWrapper>
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
              <Card3DTilt
                key={dish.id}
                onClick={() => {
                  setActiveTab('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white border border-palette-laceBorder group cursor-pointer shadow-lilac-md hover:shadow-xl rounded-2xl flex flex-col justify-between overflow-hidden"
              >
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
