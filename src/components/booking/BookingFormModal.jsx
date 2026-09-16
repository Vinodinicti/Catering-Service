import React, { useState, useEffect } from 'react';
import { X, UtensilsCrossed, Calendar, Users, Mail, Phone, User, CheckCircle, MessageCircle, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATERING_PACKAGES } from '../../data/packageData';

export default function BookingFormModal({ isOpen, onClose, initialData = null, onBookingSubmitted }) {
  const [activeFormType, setActiveFormType] = useState('booking');
  const [submittedSuccess, setSubmittedSuccess] = useState(null);
  const [estimateDetails, setEstimateDetails] = useState(null);

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    eventType: 'Grand Royal South Wedding',
    eventDate: '',
    guestCount: 150,
    packageId: 'pkg-gold',
    mealType: 'Banana Leaf Feast & Live Counters',
    address: '',
    notes: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setEstimateDetails(initialData);
      
      let addonSummary = '';
      if (initialData.addons) {
        const activeAddons = Object.keys(initialData.addons)
          .filter(k => initialData.addons[k])
          .map(k => k === 'mocktailBar' ? 'Nannari Bar' : k === 'liveDosaBar' ? 'Live Mysuru Dosa Bar' : k === 'kaapiLounge' ? 'Filter Kaapi Lounge' : 'Jigarthanda Counter')
          .join(', ');
        if (activeAddons) addonSummary = ` | Live Add-ons: ${activeAddons}`;
      }
      
      const autoNotes = initialData.estimatedCost
        ? `[Estimator Quote] Package: ${initialData.packageName || 'Selected Package'} | Guests: ${initialData.guestCount} | Meal Format: ${initialData.mealType}${addonSummary} | Total Estimated Investment: ₹${initialData.estimatedCost.toLocaleString('en-IN')} (Incl. 18% GST)`
        : '';

      setFormData((prev) => ({
        ...prev,
        eventType: initialData.eventType || 'Grand Royal South Wedding',
        guestCount: initialData.guestCount || 150,
        packageId: initialData.packageId || 'pkg-gold',
        mealType: initialData.mealType || 'Banana Leaf Feast & Live Counters',
        notes: autoNotes
      }));
    } else if (isOpen && !initialData) {
      setEstimateDetails(null);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const referenceId = activeFormType === 'booking'
      ? `RTB-${Math.floor(1000 + Math.random() * 9000)}`
      : `ENQ-${Math.floor(100 + Math.random() * 900)}`;

    const selPkg = CATERING_PACKAGES.find(p => p.id === formData.packageId) || CATERING_PACKAGES[1];
    const baseRate = selPkg?.pricePerGuest || 0;
    
    let addonPerGuest = 0;
    if (estimateDetails?.addons) {
      const addonPrices = { mocktailBar: 40, liveDosaBar: 60, kaapiLounge: 30, jigarthandaCounter: 40 };
      addonPerGuest = Object.keys(estimateDetails.addons).reduce((sum, key) => {
        return sum + (estimateDetails.addons[key] ? addonPrices[key] : 0);
      }, 0);
    }

    const effectiveRate = baseRate + addonPerGuest;
    const rawSubtotal = effectiveRate * (formData.guestCount || 0);
    const discountRate = formData.guestCount >= 300 ? 0.08 : formData.guestCount >= 200 ? 0.05 : 0;
    const discountAmount = Math.round(rawSubtotal * discountRate);
    const subtotalAfterDiscount = rawSubtotal - discountAmount;
    const gstTax = Math.round(subtotalAfterDiscount * 0.18);
    const calculatedTotal = subtotalAfterDiscount + gstTax;

    const finalEstimatedCost = estimateDetails?.estimatedCost && formData.guestCount === estimateDetails.guestCount && formData.packageId === estimateDetails.packageId
      ? estimateDetails.estimatedCost
      : calculatedTotal;

    const newRecord = {
      id: referenceId,
      ...formData,
      packageName: selPkg.name,
      estimatedCost: finalEstimatedCost,
      costPerHead: effectiveRate,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
      formType: activeFormType
    };

    onBookingSubmitted(newRecord);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setSubmittedSuccess(newRecord);
  };

  const handleShareWhatsApp = () => {
    if (!submittedSuccess) return;
    const text = activeFormType === 'booking'
      ? `*Royal Table South Indian Catering Booking Request*\n\n` +
        `*Ref ID:* ${submittedSuccess.id}\n` +
        `*Name:* ${submittedSuccess.customerName}\n` +
        `*Event:* ${submittedSuccess.eventType}\n` +
        `*Date:* ${submittedSuccess.eventDate}\n` +
        `*Guests:* ${submittedSuccess.guestCount}\n` +
        `*Phone:* ${submittedSuccess.phone}\n` +
        `*Notes:* ${submittedSuccess.notes || 'None'}`
      : `*Royal Table South Indian Enquiry*\n\n` +
        `*Ref ID:* ${submittedSuccess.id}\n` +
        `*Name:* ${submittedSuccess.customerName}\n` +
        `*Subject:* ${submittedSuccess.subject}\n` +
        `*Message:* ${submittedSuccess.message}`;

    const url = `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-palette-eggplant/80 backdrop-blur-md transition-opacity animate-fadeIn" 
      />

      <div className="relative w-full max-w-xl max-h-[85vh] sm:max-h-[90vh] bg-white text-palette-eggplant rounded-3xl border border-palette-laceBorder shadow-2xl overflow-hidden z-10 animate-scaleUp flex flex-col my-auto">
        
        {/* Top Header */}
        <div className="bg-palette-eggplant p-4 sm:p-5 border-b border-white/15 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-palette-shamrock flex items-center justify-center shadow-md shrink-0">
              <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-xl font-extrabold text-white leading-tight">
                {activeFormType === 'booking' ? 'Book South Indian Catering' : 'Submit General Enquiry'}
              </h3>
              <p className="text-[10px] sm:text-xs text-palette-lilac font-medium">The Royal Table Gourmet Services</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Form Type Switcher */}
        {!submittedSuccess && (
          <div className="flex border-b border-palette-laceBorder bg-palette-lilacLight p-1.5 sm:p-2 gap-2 shrink-0">
            <button
              onClick={() => setActiveFormType('booking')}
              className={`flex-1 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
                activeFormType === 'booking'
                  ? 'bg-palette-eggplant text-white shadow-sm'
                  : 'text-palette-eggplant/70 hover:text-palette-eggplant'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Event Booking Form</span>
            </button>
            <button
              onClick={() => setActiveFormType('enquiry')}
              className={`flex-1 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
                activeFormType === 'enquiry'
                  ? 'bg-palette-eggplant text-white shadow-sm'
                  : 'text-palette-eggplant/70 hover:text-palette-eggplant'
              }`}
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>General Inquiry Form</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto bg-white flex-1">
          
          {submittedSuccess ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-20 h-20 bg-palette-shamrock/20 rounded-full border-2 border-palette-shamrock flex items-center justify-center mx-auto animate-bounce-subtle">
                <CheckCircle className="w-10 h-10 text-palette-shamrock" />
              </div>
              <div>
                <span className="bg-palette-shamrock/20 text-palette-shamrock px-3 py-1 rounded-full text-xs font-extrabold border border-palette-shamrock/40">
                  Ref ID: {submittedSuccess.id}
                </span>
                <h3 className="font-serif text-2xl font-extrabold text-palette-eggplant mt-3">
                  {activeFormType === 'booking' ? 'Booking Request Submitted!' : 'Enquiry Received!'}
                </h3>
                <p className="text-sm text-palette-eggplant/75 mt-2 max-w-md mx-auto">
                  Thank you, <span className="font-bold text-palette-eggplant">{submittedSuccess.customerName}</span>. Our royal concierge team will contact you within 2 business hours to confirm availability and menu customization.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleShareWhatsApp}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-palette-shamrock hover:bg-palette-shamrockDark text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Confirmation to WhatsApp</span>
                </button>
                <button
                  onClick={() => {
                    setSubmittedSuccess(null);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-palette-lace hover:bg-palette-lilacLight text-palette-eggplant font-extrabold text-sm border border-palette-laceBorder"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-palette-eggplant/80 uppercase mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3 text-palette-eggplant/40" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kalyanaraman S"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-palette-eggplant/80 uppercase mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3 text-palette-eggplant/40" />
                    <input
                      type="text"
                      required
                      placeholder="+91 98400 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-palette-eggplant/80 uppercase mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-palette-eggplant/40" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock"
                  />
                </div>
              </div>

              {activeFormType === 'booking' ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-palette-eggplant/80 uppercase mb-1">
                        Event Category
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full px-4 py-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant focus:outline-none focus:border-palette-shamrock"
                      >
                        <option value="Grand Royal South Wedding">Grand Royal South Wedding</option>
                        <option value="Corporate Gala Feast">Corporate Gala Feast</option>
                        <option value="Sasthiabdhapoorthi (60th Birthday)">Sasthiabdhapoorthi (60th Birthday)</option>
                        <option value="Anniversary Soirée">Anniversary Soirée</option>
                        <option value="Traditional Tiffin Function">Traditional Tiffin Function</option>
                        <option value="Housewarming Ceremony">Housewarming Ceremony</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-palette-eggplant/80 uppercase mb-1">
                        Event Date *
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3.5 top-3 text-palette-eggplant/40" />
                        <input
                          type="date"
                          required
                          value={formData.eventDate}
                          onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant focus:outline-none focus:border-palette-shamrock"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-palette-eggplant/80 uppercase mb-1">
                        Estimated Guest Count
                      </label>
                      <div className="relative">
                        <Users className="w-4 h-4 absolute left-3.5 top-3 text-palette-eggplant/40" />
                        <input
                          type="number"
                          min="20"
                          max="3000"
                          value={formData.guestCount}
                          onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                          className="w-full pl-10 pr-4 py-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant focus:outline-none focus:border-palette-shamrock"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-palette-eggplant/80 uppercase mb-1">
                        Selected Package
                      </label>
                      <select
                        value={formData.packageId}
                        onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                        className="w-full px-4 py-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant focus:outline-none focus:border-palette-shamrock"
                      >
                        {CATERING_PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.name} (₹{pkg.pricePerGuest} / guest)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Live Cost Preview Card */}
                  {(() => {
                    const selPkg = CATERING_PACKAGES.find(p => p.id === formData.packageId) || CATERING_PACKAGES[1];
                    const baseRate = selPkg?.pricePerGuest || 0;
                    
                    let addonPerGuest = 0;
                    if (estimateDetails?.addons) {
                      const addonPrices = { mocktailBar: 40, liveDosaBar: 60, kaapiLounge: 30, jigarthandaCounter: 40 };
                      addonPerGuest = Object.keys(estimateDetails.addons).reduce((sum, key) => {
                        return sum + (estimateDetails.addons[key] ? addonPrices[key] : 0);
                      }, 0);
                    }

                    const effectiveRate = baseRate + addonPerGuest;
                    const rawSubtotal = effectiveRate * (formData.guestCount || 0);
                    const discountRate = formData.guestCount >= 300 ? 0.08 : formData.guestCount >= 200 ? 0.05 : 0;
                    const discountAmount = Math.round(rawSubtotal * discountRate);
                    const subtotalAfterDiscount = rawSubtotal - discountAmount;
                    const gstTax = Math.round(subtotalAfterDiscount * 0.18);
                    const calculatedTotal = subtotalAfterDiscount + gstTax;

                    const displayTotal = estimateDetails?.estimatedCost && formData.guestCount === estimateDetails.guestCount && formData.packageId === estimateDetails.packageId
                      ? estimateDetails.estimatedCost
                      : calculatedTotal;

                    return (
                      <div className="bg-gradient-to-r from-palette-lilacLight via-white to-palette-shamrock/10 p-4 rounded-2xl border-2 border-palette-shamrock/40 space-y-2 shadow-inner">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-extrabold uppercase text-[10px] text-palette-eggplant/70 block">
                              {estimateDetails ? '✨ Forwarded Estimator Cost Quote' : 'Estimated Total Investment'}
                            </span>
                            <span className="font-sans font-black text-2xl text-palette-eggplant tracking-tight">
                              ₹{displayTotal.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-palette-shamrockDark font-black block text-sm">₹{effectiveRate} / guest</span>
                            <span className="text-[10px] text-palette-eggplant/70 font-semibold">(Incl. 18% GST & Add-ons)</span>
                          </div>
                        </div>

                        {estimateDetails && (
                          <div className="pt-2 border-t border-palette-lilac/40 flex items-center justify-between text-[11px] font-bold text-palette-eggplant/80">
                            <span>Quote Locked: <strong>{formData.guestCount} Guests</strong> ({selPkg.name})</span>
                            <span className="text-palette-shamrockDark font-extrabold">✓ Breakdown Auto-Filled Below</span>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  <div>
                    <label className="block text-xs font-bold text-palette-eggplant/80 uppercase mb-1">
                      Venue Address & Special Requests
                    </label>
                    <textarea
                      rows="3"
                      placeholder="e.g. Royal Palace Marriage Hall, Chennai. Special requests: Banana leaf feast, Live Dosa counter..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full p-3 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold text-palette-eggplant/80 uppercase mb-1">
                      Inquiry Subject *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. South Indian Wedding Banana Leaf Feast Quote"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-palette-eggplant/80 uppercase mb-1">
                      Your Message / Question *
                    </label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Tell us about your catering requirements, date preferences, or custom South Indian dish desires..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm text-palette-eggplant placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock"
                    />
                  </div>
                </>
              )}

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-palette-shamrock hover:bg-palette-shamrockDark text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] transition-all"
                >
                  <Send className="w-5 h-5 text-white" />
                  <span>Submit {activeFormType === 'booking' ? 'Catering Booking Request' : 'Enquiry Now'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
