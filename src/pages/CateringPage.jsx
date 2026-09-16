import React from 'react';
import { CATERING_PACKAGES, LIVE_STATIONS } from '../data/packageData';
import Card3DTilt from '../components/3d/Card3DTilt';
import { CheckCircle2, UtensilsCrossed, ArrowRight, Flame, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CateringPage({ onOpenEstimate, onOpenBooking }) {
  return (
    <div className="pt-28 pb-16 space-y-20 bg-palette-lace text-palette-eggplant overflow-x-hidden">
      
      {/* Header Banner with Background Image & Eggplant Opacity Overlay */}
      <section className="relative text-center max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 rounded-3xl overflow-hidden shadow-2xl border border-palette-lilac/30 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url('/images/dishes/dosa_bar.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-palette-eggplant/95 via-palette-eggplantDark/90 to-palette-eggplant/95 backdrop-blur-xs" />

        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 text-white px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3 shadow-inner border border-palette-shamrock/40"
          >
            <UtensilsCrossed className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-palette-shamrock animate-pulse" />
            <span>Curated South Indian Tiers</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight"
          >
            Imperial <span className="bg-gradient-to-r from-white via-palette-shamrock to-white bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">Catering Packages & Services</span>
          </motion.h1>
          <p className="text-palette-lilac/90 text-sm sm:text-lg mt-2.5 sm:mt-3 max-w-2xl mx-auto leading-relaxed">
            Select from our handcrafted South Indian catering packages or request a 100% custom menu designed specifically for your event requirements.
          </p>
        </div>
      </section>

      {/* Catering Packages Grid with 3D Depth & Staggered Animations */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 perspective-1000">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {CATERING_PACKAGES.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="h-full"
            >
              <Card3DTilt
                className={`bg-white border flex flex-col justify-between relative shadow-lilac-md hover:shadow-2xl rounded-3xl h-full transition-all duration-500 transform-style-3d group ${
                  pkg.popular ? 'border-palette-shamrock ring-4 ring-palette-shamrock/20' : 'border-palette-laceBorder'
                }`}
              >
                {pkg.popular && (
                  <div className="bg-gradient-to-r from-palette-shamrock via-palette-shamrockDark to-palette-shamrock text-white font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider py-1.5 sm:py-2 text-center shadow-md rounded-t-3xl flex items-center justify-center gap-1.5 transform transition-transform group-hover:translate-z-6">
                    <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white animate-spin-slow" />
                    <span>★ Most Requested Choice ★</span>
                  </div>
                )}

                <div className="p-4 sm:p-8 space-y-4 sm:space-y-6 flex-1">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-palette-eggplant bg-palette-lilac/40 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-palette-lilac/50 inline-block shadow-sm transform transition-transform group-hover:translate-z-8">
                      {pkg.badge}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-palette-eggplant mt-2 sm:mt-3 group-hover:text-palette-shamrock transition-colors">{pkg.name}</h3>
                    <p className="text-palette-eggplant/75 text-[11px] sm:text-xs mt-1.5 sm:mt-2 leading-tight sm:leading-relaxed">{pkg.tagline}</p>
                  </div>

                  {/* 3D Floating Price Box */}
                  <div className="bg-gradient-to-br from-palette-lilacLight/80 to-white p-3.5 sm:p-5 rounded-2xl border border-palette-lilac/40 text-center shadow-inner group-hover:shadow-md transition-all duration-300 transform group-hover:scale-[1.02]">
                    <span className="text-[10px] sm:text-xs text-palette-eggplant/70 block uppercase font-extrabold tracking-wider">Investment</span>
                    <div className="font-sans text-2xl sm:text-3xl font-extrabold text-palette-eggplant mt-0.5 sm:mt-1 tracking-tight">
                      ₹{pkg.pricePerGuest} <span className="text-xs font-semibold text-palette-eggplant/70">/ guest</span>
                    </div>
                    <p className="text-[9px] sm:text-[10px] text-palette-eggplant/70 font-semibold mt-0.5 sm:mt-1">Min. {pkg.minGuests} Guests</p>
                  </div>

                  {/* Includes Checklist */}
                  <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
                    <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-palette-eggplant flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-palette-shamrock" />
                      <span>Package Highlights:</span>
                    </p>
                    <ul className="space-y-2 sm:space-y-2.5">
                      {pkg.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 sm:gap-2.5 text-[11px] sm:text-xs text-palette-eggplant/90 font-medium group-hover:translate-x-1 transition-transform leading-tight sm:leading-normal" style={{ transitionDelay: `${i * 30}ms` }}>
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-palette-shamrock shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-4 sm:p-6 pt-0 mt-auto">
                  <button
                    onClick={onOpenEstimate}
                    className={`w-full py-3 sm:py-4 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                      pkg.popular
                        ? 'bg-palette-shamrock hover:bg-palette-shamrockDark text-white hover:shadow-xl hover:scale-105'
                        : 'bg-palette-eggplant hover:bg-palette-eggplantDark text-white hover:scale-102'
                    }`}
                  >
                    <span>Estimate with this Package</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-palette-shamrock group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Card3DTilt>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Live Cooking Stations Section with Dynamic 3D Floating Cards */}
      <section className="bg-palette-eggplantDark text-white py-12 sm:py-16 border-y border-palette-laceBorder relative overflow-hidden">
        {/* Soft Ambient Glows */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-palette-lilac/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-palette-shamrock/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-palette-shamrock flex items-center justify-center gap-1 bg-white/10 px-3 py-1 rounded-full w-max mx-auto border border-palette-shamrock/40 shadow-inner">
              <Flame className="w-3.5 h-3.5 text-palette-shamrock animate-bounce" />
              <span>Live Interactive Counters</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white mt-2.5 sm:mt-3 tracking-tight">
              Elevate Your Event with Live Culinary Theatre
            </h2>
            <p className="text-palette-lilac/90 text-xs sm:text-sm mt-1.5 sm:mt-2">
              Add interactive live stations where master chefs prepare dishes fresh to order in front of your guests.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 perspective-1000">
            {LIVE_STATIONS.map((station, idx) => (
              <motion.div
                key={station.id}
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card3DTilt className="bg-white text-palette-eggplant p-2.5 sm:p-5 rounded-2xl sm:rounded-3xl border-2 border-palette-shamrock/40 shadow-lilac-lg hover:border-palette-shamrock transition-all duration-300 space-y-2.5 sm:space-y-3 group cursor-pointer h-full flex flex-col justify-between">
                  {/* Dish Image Banner with 3D Depth */}
                  <div className="relative h-28 sm:h-44 w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all">
                    <img
                      src={station.image}
                      alt={station.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-palette-eggplant/70 via-transparent to-transparent" />
                    <span className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 bg-palette-shamrock text-white text-[8px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                      <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white fill-white animate-pulse" />
                      <span>Live Station</span>
                    </span>
                  </div>

                  <div className="space-y-1 sm:space-y-1.5 flex-1">
                    <h3 className="font-serif text-xs sm:text-base font-bold text-palette-eggplant group-hover:text-palette-shamrock transition-colors leading-tight sm:leading-snug">
                      {station.name}
                    </h3>
                    <p className="text-palette-eggplant/80 text-[10px] sm:text-xs leading-tight sm:leading-relaxed">
                      {station.description}
                    </p>
                  </div>
                </Card3DTilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-palette-laceBorder shadow-lilac-lg space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-palette-eggplant">Need a Custom Catering Proposal?</h3>
          <p className="text-palette-eggplant/80 text-sm max-w-xl mx-auto">
            Have specific dietary preferences or a multi-day wedding celebration? Talk directly with our senior event planner.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 bg-palette-eggplant hover:bg-palette-eggplantDark text-white font-extrabold text-sm rounded-2xl shadow-md hover:scale-105 transition-all"
          >
            Request Customized Catering Quote
          </button>
        </div>
      </section>

    </div>
  );
}
