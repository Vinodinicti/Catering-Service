import React, { useState } from 'react';
import { Calculator, Users, Sparkles, ArrowRight } from 'lucide-react';
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
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
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

  return (
    <div className={`w-full bg-white text-palette-eggplant rounded-3xl border border-palette-laceBorder shadow-2xl p-6 sm:p-8 relative overflow-hidden ${isModal ? '' : 'max-w-6xl mx-auto'}`}>
      
      {/* Background Palette Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-palette-lilac/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-palette-shamrock/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-palette-laceBorder pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-palette-eggplant text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <Calculator className="w-4 h-4 text-palette-shamrock" />
            <span>Real-Time Dakshin Pricing Engine</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-palette-eggplant">
            Instant Catering Cost Estimator
          </h2>
          <p className="text-palette-eggplant/75 text-sm mt-1">
            Customize your South Indian event parameters for an immediate itemized cost quotation.
          </p>
        </div>

        <div className="bg-palette-lilacLight px-4 py-3 rounded-2xl border border-palette-lilac/40 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-palette-eggplant animate-spin-slow" />
          <div className="text-left">
            <p className="text-[10px] uppercase font-extrabold text-palette-eggplant/70">Best Value Promise</p>
            <p className="text-xs text-palette-eggplant font-extrabold">Transparent & No Hidden Fees</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Event Type */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-palette-eggplant mb-2">
              1. Select Event Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {eventTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setEventType(type)}
                  className={`p-3 rounded-xl text-xs font-bold text-left transition-all border ${
                    eventType === type
                      ? 'bg-palette-eggplant text-white border-palette-eggplant shadow-md'
                      : 'bg-palette-lace text-palette-eggplant/80 border-palette-laceBorder hover:border-palette-eggplant/40'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Guest Count Selector & Preset Buttons */}
          <div className="bg-palette-lilacLight/60 p-5 rounded-2xl border border-palette-lilac/30 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-palette-eggplant flex items-center gap-2">
                <Users className="w-4 h-4 text-palette-eggplant" />
                <span>2. Select Expected Guests</span>
              </label>
              <span className="font-sans text-xl sm:text-2xl font-extrabold text-palette-eggplant bg-white px-4 py-1 rounded-xl border border-palette-laceBorder shadow-sm">
                {guestCount.toLocaleString('en-IN')} Guests
              </span>
            </div>

            {/* Quick Guest Count Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-palette-eggplant/70">Quick Select:</span>
              {[50, 100, 250, 500, 1000, 2500].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setGuestCount(count)}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all border ${
                    guestCount === count
                      ? 'bg-palette-eggplant text-white border-palette-eggplant shadow-sm scale-105'
                      : 'bg-white text-palette-eggplant hover:bg-palette-lilac/20 border-palette-laceBorder'
                  }`}
                >
                  {count.toLocaleString('en-IN')}
                </button>
              ))}
            </div>

            <input
              type="range"
              min="25"
              max="2500"
              step="25"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full h-2 bg-palette-lilac/40 rounded-lg appearance-none cursor-pointer accent-palette-eggplant"
            />
            <div className="flex justify-between text-[10px] text-palette-eggplant/70 font-bold">
              <span>25 (Intimate Tiffin)</span>
              <span>250 (Standard Wedding)</span>
              <span>1,000 (Grand Hall Feast)</span>
              <span>2,500+ (Imperial Royal)</span>
            </div>

            {discountRate > 0 && (
              <p className="mt-2 text-xs text-palette-shamrockDark font-bold flex items-center gap-1 bg-white/70 p-2 rounded-xl border border-palette-shamrock/40">
                <Sparkles className="w-3.5 h-3.5 text-palette-shamrock" />
                <span>Volume Discount Applied! ({(discountRate * 100)}% Off Total Catering Subtotal)</span>
              </p>
            )}
          </div>

          {/* 3. Package Selection with Price Drop Badges */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-palette-eggplant mb-2">
              3. South Indian Catering Package Tier
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CATERING_PACKAGES.map((pkg) => {
                const isSelected = selectedPackageId === pkg.id;
                const savingsPct = Math.round((1 - pkg.pricePerGuest / pkg.originalPrice) * 100);
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-palette-shamrock/15 border-palette-shamrock shadow-md ring-2 ring-palette-shamrock/40'
                        : 'bg-palette-lace border-palette-laceBorder hover:border-palette-shamrock/40'
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-2.5 right-3 bg-palette-shamrock text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-sm">
                        ★ Most Popular
                      </span>
                    )}

                    <div>
                      <h4 className="font-extrabold text-sm text-palette-eggplant">{pkg.name}</h4>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-sans font-extrabold text-lg text-palette-eggplant">
                          ₹{pkg.pricePerGuest}
                        </span>
                        <span className="font-sans text-xs text-palette-eggplant/50 line-through">
                          ₹{pkg.originalPrice}
                        </span>
                        <span className="text-[10px] font-extrabold text-palette-shamrockDark bg-palette-shamrock/20 px-1.5 py-0.5 rounded">
                          {savingsPct}% OFF
                        </span>
                      </div>
                      <p className="text-[11px] text-palette-eggplant/70 mt-1 line-clamp-2">{pkg.tagline}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-palette-laceBorder text-[10px] text-palette-eggplant/70 font-semibold">
                      Min. {pkg.minGuests} Guests
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Meal Format */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-palette-eggplant mb-2">
              4. Meal Format
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {mealTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setMealType(type)}
                  className={`p-3 rounded-xl text-xs font-bold text-left transition-all border ${
                    mealType === type
                      ? 'bg-palette-eggplant text-white border-palette-eggplant shadow-sm font-extrabold'
                      : 'bg-palette-lace text-palette-eggplant/80 border-palette-laceBorder hover:border-palette-eggplant/40'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Add-On Experiences */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-palette-eggplant mb-2">
              5. Premium Add-On Experiences (Lowered Rates)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { key: 'mocktailBar', label: 'Liquid Nitrogen Nannari Bar', price: 40 },
                { key: 'liveDosaBar', label: 'Interactive Mysuru Dosa Bar', price: 60 },
                { key: 'kaapiLounge', label: 'Kumbakonam Brass Filter Kaapi', price: 30 },
                { key: 'jigarthandaCounter', label: 'Madurai Jigarthanda Lounge', price: 40 },
              ].map((item) => (
                <label
                  key={item.key}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    addons[item.key]
                      ? 'bg-palette-shamrock/20 border-palette-shamrock text-palette-eggplant font-bold'
                      : 'bg-palette-lace border-palette-laceBorder text-palette-eggplant/70 hover:border-palette-laceBorder'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={addons[item.key]}
                      onChange={(e) => setAddons({ ...addons, [item.key]: e.target.checked })}
                      className="w-4 h-4 accent-palette-shamrock rounded"
                    />
                    <span>{item.label}</span>
                  </div>
                  <span className="font-extrabold text-palette-eggplant">+₹{item.price}/head</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: IMPRESSIVE EXECUTIVE LIVE QUOTATION CARD */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-palette-eggplant via-palette-eggplantDark to-palette-eggplant text-white p-6 sm:p-7 rounded-3xl border border-palette-shamrock/40 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Glow backdrop */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-palette-shamrock/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-palette-lilac/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/15">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-palette-lilac block">Executive Quotation</span>
                <span className="text-[11px] text-white/70">The Royal Table Catering</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] bg-palette-shamrock/25 text-palette-shamrock px-3 py-1 rounded-full font-extrabold border border-palette-shamrock/40 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-palette-shamrock animate-pulse" />
                Live Calculator
              </span>
            </div>

            {/* Total Savings Callout Badge */}
            <div className="mt-4 bg-palette-shamrock/20 border border-palette-shamrock/50 p-2.5 rounded-2xl flex items-center justify-between text-xs">
              <span className="font-extrabold text-palette-shamrock flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-palette-shamrock" />
                <span>Special Package Offer</span>
              </span>
              <span className="font-sans font-extrabold text-white bg-palette-shamrock px-2 py-0.5 rounded-lg text-[11px]">
                Save ₹{totalSavings.toLocaleString('en-IN')} Today!
              </span>
            </div>

            {/* Itemized Calculation Breakdown */}
            <div className="space-y-3.5 py-5 text-xs sm:text-sm">
              <div className="flex justify-between text-palette-lilac/80">
                <span>Selected Event:</span>
                <span className="font-extrabold text-white">{eventType}</span>
              </div>

              <div className="flex justify-between text-palette-lilac/80">
                <span>Guest Count:</span>
                <span className="font-extrabold text-white">{guestCount.toLocaleString('en-IN')} Guests</span>
              </div>

              <div className="flex justify-between items-center text-palette-lilac/80">
                <span>Base Tier ({selectedPkg.name}):</span>
                <div className="text-right">
                  <span className="font-sans font-extrabold text-white">₹{basePricePerHead.toLocaleString('en-IN')} / guest</span>
                  <span className="text-[10px] text-palette-lilac/50 line-through block">₹{selectedPkg.originalPrice}</span>
                </div>
              </div>

              {addonCostPerHead > 0 && (
                <div className="flex justify-between text-palette-lilac/80">
                  <span>Selected Live Add-ons:</span>
                  <span className="font-sans font-extrabold text-palette-shamrock">+₹{addonCostPerHead} / guest</span>
                </div>
              )}

              <div className="border-t border-white/15 pt-2.5 flex justify-between text-palette-lilac/90 font-medium">
                <span>Effective Rate per Guest:</span>
                <span className="font-sans font-black text-white text-base">₹{totalPricePerHead.toLocaleString('en-IN')} / guest</span>
              </div>
              
              <div className="flex justify-between text-palette-lilac/80 text-xs">
                <span>Subtotal ({guestCount.toLocaleString('en-IN')} × ₹{totalPricePerHead}):</span>
                <span className="font-sans font-extrabold text-white">₹{rawSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-palette-shamrock text-xs font-bold bg-palette-shamrock/10 p-2 rounded-xl border border-palette-shamrock/30">
                  <span>Volume Discount ({(discountRate * 100)}% Off):</span>
                  <span className="font-sans font-extrabold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-palette-lilac/70 text-xs">
                <span>Statutory GST Tax (18%):</span>
                <span className="font-sans font-bold text-white/90">+₹{gstTax.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* IMPRESSIVE TOTAL INVESTMENT HIGHLIGHT CARD */}
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border-2 border-palette-shamrock text-center my-1 shadow-2xl relative">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-palette-shamrock block mb-0.5">
                ESTIMATED TOTAL INVESTMENT
              </span>
              <div className="font-sans text-3xl sm:text-4xl font-black text-white tracking-tight">
                ₹{finalTotal.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-palette-lilac/90 mt-1.5 font-medium">
                Approx. <span className="font-sans font-extrabold text-palette-shamrock text-sm">₹{Math.round(finalTotal / guestCount)}</span> net per guest (Inclusive of All Taxes)
              </p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-5 space-y-3 relative z-10">
            <button
              onClick={handleBook}
              className="w-full py-4 rounded-2xl bg-palette-shamrock hover:bg-palette-shamrockDark text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-palette-shamrock/40 hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              <span>Book Event with this Estimate</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
            <p className="text-[11px] text-center text-palette-lilac/70 font-semibold">
              * Guaranteed rate valid for 30 days. Includes complete staff & setup.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
