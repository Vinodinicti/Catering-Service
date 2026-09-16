import React from 'react';
import { Sparkles, ChefHat, CheckCircle, Users, Award, Trophy, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Card3DTilt from '../components/3d/Card3DTilt';
import CountUp from '../components/common/CountUp';

export default function AboutPage({ onOpenBooking }) {
  const chefs = [
    {
      name: "Chef Vikram Ramanathan",
      title: "Executive Master Culinary Director",
      experience: "25+ Years Experience",
      specialty: "Royal Dakshin & Chettinad Feast Cuisine",
      image: "/images/chefs/chef_vikram.jpg",
      bio: "Former head chef at heritage royal palaces, specializing in traditional 21-item banana leaf feasts and authentic Chettinad spice roasts."
    },
    {
      name: "Chef Priya Sundaram",
      title: "Head Pastry & Payasam Artiste",
      experience: "18 Years Experience",
      specialty: "Tender Coconut Elaneer Payasam & Fusion Sweets",
      image: "/images/chefs/chef_priya.jpg",
      bio: "Master confectioner bringing theatrical live Madurai Jigarthanda counters and saffron-infused royal payasam to life."
    },
    {
      name: "Chef Rajesh Hegde",
      title: "Global & Tawa Grill Specialist",
      experience: "15 Years Experience",
      specialty: "Live Mysuru Dosa Bar & Mangalorean Tawa Grill",
      image: "/images/chefs/chef_rajesh.jpg",
      bio: "Curates live interactive cooking bars, hand-stretched coin parottas, and authentic Mysuru crispy dosa & tawa sear stations."
    }
  ];

  return (
    <div className="pt-28 pb-16 space-y-20 bg-palette-lace text-palette-eggplant">
      
      {/* Header Banner with Background Image & Eggplant Opacity Overlay */}
      <section className="relative text-center max-w-5xl mx-auto px-6 py-14 rounded-3xl overflow-hidden shadow-2xl border border-palette-lilac/30 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1600')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-palette-eggplant/95 via-palette-eggplantDark/90 to-palette-eggplant/95 backdrop-blur-xs" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 shadow-inner border border-palette-shamrock/40">
            <Sparkles className="w-4 h-4 text-palette-shamrock animate-pulse" />
            <span>Our Heritage & Culinary Philosophy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Where South Indian Tradition Meets <span className="bg-gradient-to-r from-white via-palette-shamrock to-white bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">Royal Elegance</span>
          </h1>
          <p className="text-palette-lilac/90 text-base sm:text-lg mt-3 max-w-2xl mx-auto leading-relaxed">
            Founded with a passion for preserving authentic South Indian heritage recipes while elevating modern presentation, The Royal Table has catered over 500 prestigious celebrations.
          </p>
        </div>
      </section>

      {/* --- Key Impact Numbers & Metrics --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Outer animated gradient border container */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative p-[3px] rounded-[32px] bg-gradient-to-r from-palette-shamrock via-palette-lilac to-palette-shamrock bg-[length:200%_200%] animate-gradient-shift shadow-2xl group"
        >
          {/* Main Box Interior with Background Image & Eggplant Opacity Overlay */}
          <div className="bg-palette-eggplant text-white p-8 sm:p-12 rounded-[29px] relative overflow-hidden backdrop-blur-xl border border-white/10">
            
            {/* Background Image Overlay with Opacity */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 pointer-events-none"
              style={{ backgroundImage: `url('/images/dishes/dosa_bar.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-palette-eggplant/95 via-palette-eggplantDark/90 to-palette-eggplant/95 pointer-events-none" />
            
            {/* Animated Ambient Glowing Orbs */}
            <motion.div 
              animate={{ 
                scale: [1, 1.25, 1],
                opacity: [0.25, 0.45, 0.25],
                x: [0, 30, 0],
                y: [0, -20, 0]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-20 -right-20 w-96 h-96 bg-palette-shamrock/30 rounded-full blur-3xl pointer-events-none" 
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
                x: [0, -30, 0],
                y: [0, 20, 0]
              }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-20 -left-20 w-96 h-96 bg-palette-lilac/30 rounded-full blur-3xl pointer-events-none" 
            />

            {/* Shimmer Light Streak Beam */}
            <motion.div
              animate={{ x: ['-100%', '250%'] }}
              transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none z-10"
            />
            
            {/* Section Header */}
            <div className="text-center mb-10 relative z-20">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-palette-shamrock bg-white/10 px-4 py-1.5 rounded-full border border-palette-shamrock/40 shadow-inner"
              >
                <TrendingUp className="w-3.5 h-3.5 text-palette-shamrock animate-pulse" />
                <span>Proven Excellence By Numbers</span>
              </motion.div>
              
              <motion.h3 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="font-serif text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight"
              >
                Milestones of Culinary Trust
              </motion.h3>
              <p className="text-palette-lilac/80 text-xs sm:text-sm mt-1 max-w-lg mx-auto">
                Decades of crafting royal memories, authentic recipes, and unexcelled dining hospitality.
              </p>
            </div>

            {/* 4 Metrics Grid with 3D Tilt & Staggered Animations */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative z-20">
              {[
                { 
                  icon: Users, 
                  number: "15,000+", 
                  label: "Happy Guests Served", 
                  sub: "Across Banquets & Feasts",
                  accent: "text-white"
                },
                { 
                  icon: Trophy, 
                  number: "500+", 
                  label: "Royal Events Catered", 
                  sub: "Weddings & Galas",
                  accent: "text-palette-shamrock"
                },
                { 
                  icon: Award, 
                  number: "25+", 
                  label: "Years Culinary Legacy", 
                  sub: "Master South Chefs",
                  accent: "text-white"
                },
                { 
                  icon: Star, 
                  number: "4.9 / 5.0", 
                  label: "Customer Rating", 
                  sub: "1,250+ Verified Reviews",
                  accent: "text-palette-shamrock"
                }
              ].map((metric, idx) => {
                const IconComponent = metric.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.12, duration: 0.6 }}
                  >
                    <Card3DTilt className="bg-white/10 p-5 rounded-2xl border border-white/20 backdrop-blur-md space-y-2 text-center h-full hover:bg-white/15 transition-all duration-300">
                      <div className="w-10 h-10 mx-auto rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-sm group-hover:scale-110 transition-transform">
                        <IconComponent className={`w-5 h-5 ${metric.accent}`} />
                      </div>

                      <div className={`font-sans text-3xl sm:text-4xl font-black ${metric.accent} tracking-tight drop-shadow-sm`}>
                        <CountUp value={metric.number} duration={2200} />
                      </div>
                      <div className="text-xs text-palette-shamrock font-bold uppercase tracking-wider">
                        {metric.label}
                      </div>
                      <p className="text-[11px] text-palette-lilac/85 font-medium">
                        {metric.sub}
                      </p>
                    </Card3DTilt>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </motion.div>
      </section>

      {/* Grid: Heritage & Hygiene Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-extrabold text-palette-eggplant">
              Uncompromising Quality & Authentic Culinary Excellence
            </h2>
            <p className="text-palette-eggplant/80 text-sm leading-relaxed">
              At The Royal Table, food is not merely served — it is celebrated. Our culinary artisans select only farm-fresh organic produce, hand-ground spices, cold-pressed gingelly & coconut oils to ensure every dish is rich in heritage.
            </p>

            <div className="space-y-4 pt-2">
              {[
                { title: "100% Certified Hygiene & Safety", desc: "ISO 22000 & FSSAI certified high-tech centralized kitchens with strict temperature controls." },
                { title: "Farm-to-Table Freshness", desc: "No artificial food colors, preservatives, or pre-made frozen pastes. Prepared fresh on event day." },
                { title: "White-Glove Imperial Service", desc: "Uniformed butler service, traditional brass davarah cups, and dedicated event kitchen captains." }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-white p-4 rounded-2xl border border-palette-laceBorder shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-palette-shamrock/20 text-palette-shamrock flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <CheckCircle className="w-5 h-5 text-palette-shamrock" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-palette-eggplant">{item.title}</h4>
                    <p className="text-palette-eggplant/75 text-xs mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-palette-laceBorder shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800"
                alt="Royal Kitchen & Catering"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-palette-eggplant/50 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white border border-palette-laceBorder p-5 rounded-2xl shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-palette-shamrock text-white flex items-center justify-center font-extrabold font-serif text-xl shadow-md">
                ★
              </div>
              <div>
                <p className="font-bold text-palette-eggplant text-sm">Best Luxury Caterer 2025</p>
                <p className="text-xs text-palette-eggplant/60">National Hospitality Excellence Award</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Master Chefs Showcase */}
      <section className="bg-palette-lilacLight py-16 border-y border-palette-laceBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-palette-eggplant bg-palette-lilac/50 px-3 py-1 rounded-full flex items-center justify-center gap-1 w-max mx-auto">
              <ChefHat className="w-4 h-4 text-palette-eggplant" />
              The Culinary Maestros
            </span>
            <h2 className="font-serif text-3xl font-extrabold text-palette-eggplant mt-3">
              Meet Our Executive Chefs & Food Artistes
            </h2>
            <p className="text-palette-eggplant/75 text-sm mt-2">
              Bringing decades of South Indian culinary heritage and passion to every platter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chefs.map((chef, idx) => (
              <Card3DTilt key={idx} className="bg-white border-palette-laceBorder group shadow-md hover:shadow-xl rounded-2xl">
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-palette-eggplant/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 bg-palette-shamrock text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
                    {chef.experience}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl font-bold text-palette-eggplant group-hover:text-palette-shamrock transition-colors">
                    {chef.name}
                  </h3>
                  <p className="text-xs text-palette-shamrock font-extrabold">{chef.title}</p>
                  <p className="text-palette-eggplant/75 text-xs leading-relaxed">{chef.bio}</p>
                  <div className="pt-2 border-t border-palette-laceBorder text-[11px] text-palette-eggplant font-bold">
                    <span className="text-palette-shamrock font-extrabold">Specialty:</span> {chef.specialty}
                  </div>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="bg-palette-eggplant p-10 rounded-3xl shadow-2xl text-white space-y-4 border border-palette-lilac/30">
          <h2 className="font-serif text-3xl font-extrabold">Ready to Plan Your Royal Menu?</h2>
          <p className="text-palette-lilac text-sm max-w-xl mx-auto">
            Schedule a complimentary menu tasting session with our executive chef at our culinary studio.
          </p>
          <button
            onClick={onOpenBooking}
            className="mt-2 px-8 py-3.5 bg-palette-shamrock hover:bg-palette-shamrockDark text-white font-extrabold text-sm rounded-2xl shadow-lg transition-transform hover:scale-105"
          >
            Book Complimentary Tasting & Consultation
          </button>
        </div>
      </section>

    </div>
  );
}
