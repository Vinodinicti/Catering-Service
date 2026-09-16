import React, { useState } from 'react';
import { Calculator, Users, Sparkles, ArrowRight, CheckCircle2, TrendingDown, Flame, UtensilsCrossed } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATERING_PACKAGES } from '../../data/packageData';

export default function InstantEstimator({ onBookWithEstimate, isModal = false }) {
  const [eventType, setEventType] = useState('Grand Royal South Wedding');
  const [guestCount, setGuestCount] = useState(150);
  const [selectedPackageId, setSelectedPackageId] = useState('pkg-gold');
  const [mealType, setMealType] = useState('Banana Leaf Feast & Live Counters');
  
  // Optional add-ons
  const [addons, setAddons] = useState({
    mocktailBar: true,
    liveDosaBar: true,
    kaapiLounge: true,
    jigarthandaCounter: false
  });

  const eventTypes = [
    'Grand Royal South Wedding',
    'Corporate Gala Feast',
    'Sasthiabdhapoorthi (60th Birthday)',
    'Anniversary Soirée',
    'Traditional Tiffin Function',
    'Housewarming Ceremony'
  ];

  const mealTypes = [
    'Banana Leaf Feast & Live Counters',
    'Royal South Lunch Buffet',
    'Plated Imperial Dining',
    'High Tea & South Tiffin Snacks'
  ];

  const addonPrices = {
    mocktailBar: 40,
    liveDosaBar: 60,
    kaapiLounge: 30,
    jigarthandaCounter: 40
  };

  const selectedPkg = CATERING_PACKAGES.find(p => p.id === selectedPackageId) || CATERING_PACKAGES[1];

  const basePricePerHead = selectedPkg.pricePerGuest;
  const addonCostPerHead = Object.keys(addons).reduce((sum, key) => {
    return sum + (addons[key] ? addonPrices[key] : 0);
  }, 0);

  const totalPricePerHead = basePricePerHead + addonCostPerHead;
  const rawSubtotal = totalPricePerHead * guestCount;
  
  const discountRate = guestCount >= 300 ? 0.08 : guestCount >= 200 ? 0.05 : 0;
  const discountAmount = Math.round(rawSubtotal * discountRate);
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  
  const gstTax = Math.round(subtotalAfterDiscount * 0.18);
  const finalTotal = subtotalAfterDiscount + gstTax;

  // Total savings compared to original standard rates
  const totalSavings = Math.round(((selectedPkg.originalPrice - selectedPkg.pricePerGuest) * guestCount) + discountAmount);

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  const handleBook = () => {
    triggerConfetti();
    onBookWithEstimate({
      eventType,
      guestCount,
      packageId: selectedPkg.id,
      packageName: selectedPkg.name,
      mealType,
      estimatedCost: finalTotal,
      costPerHead: totalPricePerHead,
      addons
    });
  };

  const sliderPercent = Math.min(100, Math.max(0, ((guestCount - 25) / (2500 - 25)) * 100));

  return (
    <div className={`w-full bg-gradient-to-br from-white via-palette-lace to-palette-lilacLight/40 text-palette-eggplant rounded-3xl border-2 border-palette-lilac/40 shadow-2xl p-4 sm:p-8 relative overflow-hidden ${isModal ? '' : 'max-w-6xl mx-auto'}`}>
      
      {/* Background Animated Ambient Lilac & Shamrock Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-palette-lilac/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-palette-shamrock/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="mb-6 sm:mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-palette-lilac/30 pb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-palette-eggplant via-purple-900 to-palette-eggplant text-white px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2 shadow-md border border-palette-shamrock/40">
            <Calculator className="w-4 h-4 text-palette-shamrock animate-bounce" />
            <span>Interactive Dakshin Pricing Engine</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-palette-eggplant">
            Instant Catering Cost <span className="bg-gradient-to-r from-palette-eggplant via-palette-shamrock to-palette-eggplant bg-clip-text text-transparent">Estimator</span>
          </h2>
          <p className="text-palette-eggplant/80 text-xs sm:text-sm mt-1 font-medium">
            Customize your South Indian event parameters for an immediate itemized cost quotation.
          </p>
        </div>

        <div className="bg-gradient-to-r from-white to-palette-lilacLight px-4 py-3 rounded-2xl border border-palette-lilac/50 flex items-center gap-3 shadow-inner">
          <div className="w-9 h-9 rounded-xl bg-palette-shamrock/20 flex items-center justify-center border border-palette-shamrock/40 shrink-0">
            <Sparkles className="w-5 h-5 text-palette-shamrockDark animate-spin-slow" />
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase font-extrabold text-palette-eggplant/70 tracking-wider">Best Value Promise</p>
            <p className="text-xs text-palette-eggplant font-extrabold">100% Transparent & No Hidden Fees</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 relative z-10">
        
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Event Type */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-palette-eggplant mb-2.5 flex items-center gap-1.5">
              <UtensilsCrossed className="w-3.5 h-3.5 text-palette-shamrock" />
              <span>1. Select Event Type</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {eventTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setEventType(type)}
                  className={`p-2.5 sm:p-3 rounded-xl text-xs font-bold text-left transition-all duration-300 border ${
                    eventType === type
                      ? 'bg-gradient-to-r from-palette-eggplant to-palette-eggplantDark text-white border-palette-shamrock/50 shadow-md scale-[1.02] ring-2 ring-palette-shamrock/30 font-black'
                      : 'bg-white text-palette-eggplant/80 border-palette-laceBorder hover:border-palette-lilac hover:bg-palette-lilacLight/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Guest Count Selector & Animated Slider */}
          <div className="bg-gradient-to-br from-white via-palette-lilacLight/70 to-white p-4 sm:p-5 rounded-2xl border border-palette-lilac/40 shadow-inner space-y-3.5">
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-palette-eggplant flex items-center gap-2">
                <Users className="w-4 h-4 text-palette-shamrock" />
                <span>2. Select Guest Count</span>
              </label>
              <span className="font-sans text-xl sm:text-2xl font-extrabold text-palette-eggplant bg-palette-eggplant/5 px-4 py-1 rounded-xl border border-palette-lilac/40 shadow-inner">
                {guestCount.toLocaleString('en-IN')} <span className="text-xs font-bold text-palette-eggplant/70">Guests</span>
              </span>
            </div>

            {/* Quick Guest Count Presets */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] uppercase font-extrabold text-palette-eggplant/70">Presets:</span>
              {[50, 100, 250, 500, 1000, 2500].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setGuestCount(count)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all duration-200 border ${
                    guestCount === count
                      ? 'bg-palette-shamrock text-white border-palette-shamrock shadow-sm scale-105'
                      : 'bg-white text-palette-eggplant hover:bg-palette-lilac/20 border-palette-laceBorder'
                  }`}
                >
                  {count.toLocaleString('en-IN')}
                </button>
              ))}
            </div>

            {/* Animated Slider Track */}
            <div className="relative pt-2">
              <div className="h-2.5 w-full bg-palette-lilac/40 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-palette-lilac via-palette-shamrock to-palette-shamrockDark transition-all duration-300 rounded-full"
                  style={{ width: `${sliderPercent}%` }}
                />
              </div>
              <input
                type="range"
                min="25"
                max="2500"
                step="25"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            <div className="flex justify-between text-[10px] text-palette-eggplant/70 font-bold">
              <span>25 (Tiffin)</span>
              <span>250 (Wedding)</span>
              <span>1,000 (Hall Feast)</span>
              <span>2,500+ (Imperial)</span>
            </div>

            {discountRate > 0 && (
              <div className="mt-2 text-xs text-palette-shamrockDark font-extrabold flex items-center justify-between bg-palette-shamrock/15 p-2.5 rounded-xl border border-palette-shamrock/40 animate-pulse">
                <span className="flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-palette-shamrock" />
                  <span>Volume Discount Active: <strong>{(discountRate * 100)}% Off</strong> Total Subtotal</span>
                </span>
                <span className="font-sans text-sm font-black">-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>

          {/* 3. Package Tier Selection Cards */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-palette-eggplant mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-palette-shamrock" />
              <span>3. South Indian Catering Package Tier</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CATERING_PACKAGES.map((pkg) => {
                const isSelected = selectedPackageId === pkg.id;
                const savingsPct = Math.round((1 - pkg.pricePerGuest / pkg.originalPrice) * 100);
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-white via-palette-shamrock/15 to-white border-palette-shamrock shadow-lg scale-[1.02] ring-2 ring-palette-shamrock/30'
                        : 'bg-white border-palette-laceBorder hover:border-palette-shamrock/40 hover:shadow-md'
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-palette-shamrock to-palette-shamrockDark text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                        <Flame className="w-2.5 h-2.5 fill-white" />
                        <span>Most Popular</span>
                      </span>
                    )}

                    <div>
                      <h4 className="font-serif font-extrabold text-sm text-palette-eggplant">{pkg.name}</h4>
                      <div className="flex items-baseline gap-1.5 mt-1.5">
                        <span className="font-sans font-black text-xl text-palette-eggplant">
                          ₹{pkg.pricePerGuest}
                        </span>
                        <span className="font-sans text-xs text-palette-eggplant/50 line-through">
                          ₹{pkg.originalPrice}
                        </span>
                        <span className="text-[9px] font-black text-palette-shamrockDark bg-palette-shamrock/20 px-1.5 py-0.5 rounded-md">
                          {savingsPct}% OFF
                        </span>
                      </div>
                      <p className="text-[11px] text-palette-eggplant/75 mt-1.5 leading-tight">{pkg.tagline}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-palette-laceBorder flex items-center justify-between text-[10px] text-palette-eggplant/70 font-bold">
                      <span>Min. {pkg.minGuests} Guests</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-palette-shamrock fill-palette-shamrock" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Meal Format */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-palette-eggplant mb-2 flex items-center gap-1.5">
              <UtensilsCrossed className="w-3.5 h-3.5 text-palette-shamrock" />
              <span>4. Meal Service Format</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {mealTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setMealType(type)}
                  className={`p-2.5 sm:p-3 rounded-xl text-xs font-bold text-left transition-all border ${
                    mealType === type
                      ? 'bg-palette-eggplant text-white border-palette-eggplant shadow-sm font-extrabold'
                      : 'bg-white text-palette-eggplant/80 border-palette-laceBorder hover:border-palette-eggplant/40'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Add-On Experiences */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-palette-eggplant mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-palette-shamrock" />
              <span>5. Live Add-On Counters & Lounges</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { key: 'mocktailBar', label: 'Liquid Nitrogen Nannari Bar', price: 40 },
                { key: 'liveDosaBar', label: 'Interactive Mysuru Dosa Bar', price: 60 },
                { key: 'kaapiLounge', label: 'Kumbakonam Brass Filter Kaapi', price: 30 },
                { key: 'jigarthandaCounter', label: 'Madurai Jigarthanda Lounge', price: 40 },
              ].map((item) => (
                <label
                  key={item.key}
                  className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    addons[item.key]
                      ? 'bg-palette-shamrock/20 border-palette-shamrock text-palette-eggplant font-extrabold shadow-sm'
                      : 'bg-white border-palette-laceBorder text-palette-eggplant/70 hover:border-palette-shamrock/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={addons[item.key]}
                      onChange={(e) => setAddons({ ...addons, [item.key]: e.target.checked })}
                      className="w-4 h-4 accent-palette-shamrock rounded cursor-pointer"
                    />
                    <span>{item.label}</span>
                  </div>
                  <span className="font-extrabold text-palette-eggplant">+₹{item.price}/head</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: VIBRANT ANIMATED LIVE QUOTATION CARD */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-palette-eggplant via-palette-eggplantDark to-palette-eggplant text-white p-5 sm:p-7 rounded-3xl border-2 border-palette-shamrock/50 shadow-2xl relative overflow-hidden">
          
          {/* Animated Glow Backdrops */}
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-palette-shamrock/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-palette-lilac/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/15">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-palette-shamrock block">Executive Quotation</span>
                <span className="text-[11px] text-palette-lilac font-medium">The Royal Table Gourmet Services</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] bg-palette-shamrock/30 text-white px-3 py-1 rounded-full font-black border border-palette-shamrock/60 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-palette-shamrock animate-ping" />
                Live Calculator
              </span>
            </div>

            {/* Total Savings Callout Badge */}
            <div className="mt-4 bg-gradient-to-r from-palette-shamrock/30 via-palette-shamrock/20 to-palette-shamrock/30 border border-palette-shamrock/60 p-2.5 rounded-2xl flex items-center justify-between text-xs shadow-inner">
              <span className="font-extrabold text-palette-shamrock flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-palette-shamrock animate-bounce" />
                <span>Special Package Offer</span>
              </span>
              <span className="font-sans font-black text-white bg-palette-shamrock px-2.5 py-0.5 rounded-lg text-[11px] shadow-sm">
                Save ₹{totalSavings.toLocaleString('en-IN')} Today!
              </span>
            </div>

            {/* Itemized Calculation Breakdown */}
            <div className="space-y-3 py-4 text-xs sm:text-sm">
              <div className="flex justify-between text-palette-lilac/90">
                <span>Selected Event:</span>
                <span className="font-extrabold text-white">{eventType}</span>
              </div>

              <div className="flex justify-between text-palette-lilac/90">
                <span>Guest Count:</span>
                <span className="font-extrabold text-white">{guestCount.toLocaleString('en-IN')} Guests</span>
              </div>

              <div className="flex justify-between items-center text-palette-lilac/90">
                <span>Base Tier ({selectedPkg.name}):</span>
                <div className="text-right">
                  <span className="font-sans font-extrabold text-white">₹{basePricePerHead.toLocaleString('en-IN')} / guest</span>
                  <span className="text-[10px] text-palette-lilac/60 line-through block">₹{selectedPkg.originalPrice}</span>
                </div>
              </div>

              {addonCostPerHead > 0 && (
                <div className="flex justify-between text-palette-lilac/90">
                  <span>Selected Live Add-ons:</span>
                  <span className="font-sans font-extrabold text-palette-shamrock">+₹{addonCostPerHead} / guest</span>
                </div>
              )}

              <div className="border-t border-white/15 pt-2 flex justify-between text-palette-lilac font-medium">
                <span>Effective Rate per Guest:</span>
                <span className="font-sans font-black text-white text-base">₹{totalPricePerHead.toLocaleString('en-IN')} / guest</span>
              </div>
              
              <div className="flex justify-between text-palette-lilac/80 text-xs">
                <span>Subtotal ({guestCount.toLocaleString('en-IN')} × ₹{totalPricePerHead}):</span>
                <span className="font-sans font-extrabold text-white">₹{rawSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-palette-shamrock text-xs font-extrabold bg-palette-shamrock/15 p-2 rounded-xl border border-palette-shamrock/40">
                  <span>Volume Discount ({(discountRate * 100)}% Off):</span>
                  <span className="font-sans font-black">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-palette-lilac/80 text-xs">
                <span>Statutory GST Tax (18%):</span>
                <span className="font-sans font-bold text-white/90">+₹{gstTax.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* VIBRANT GLOWING TOTAL INVESTMENT BOX */}
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border-2 border-palette-shamrock text-center my-1 shadow-[0_0_30px_rgba(158,193,66,0.35)] relative overflow-hidden transform hover:scale-[1.02] transition-transform">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-palette-shamrock block mb-0.5">
                ESTIMATED TOTAL INVESTMENT
              </span>
              <div className="font-sans text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                ₹{finalTotal.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-palette-lilac mt-1.5 font-semibold">
                Approx. <span className="font-sans font-black text-palette-shamrock text-sm">₹{Math.round(finalTotal / guestCount)}</span> net per guest (Inclusive of Taxes)
              </p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 space-y-2.5 relative z-10">
            <button
              onClick={handleBook}
              className="w-full py-3.5 sm:py-4 rounded-2xl bg-palette-shamrock hover:bg-palette-shamrockDark text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-palette-shamrock/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>Book Event with this Estimate</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
            <p className="text-[10px] sm:text-[11px] text-center text-palette-lilac/80 font-semibold">
              * Guaranteed rate valid for 30 days. Includes complete staff & setup.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
