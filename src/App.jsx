import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CateringPage from './pages/CateringPage';
import MenuPage from './pages/MenuPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import InstantEstimator from './components/estimator/InstantEstimator';
import BookingFormModal from './components/booking/BookingFormModal';
import AdminAuthModal from './components/admin/AdminAuthModal';
import { INITIAL_BOOKINGS, INITIAL_ENQUIRIES } from './data/initialBookings';
import { X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState(null);

  // Admin Session State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('royal_admin_auth') === 'true';
  });

  // Persistent Bookings State
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('royal_table_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  // Persistent Enquiries State
  const [enquiries, setEnquiries] = useState(() => {
    const saved = localStorage.getItem('royal_table_enquiries');
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });

  useEffect(() => {
    localStorage.setItem('royal_table_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('royal_table_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  const handleOpenBooking = (estimatorData = null) => {
    setModalInitialData(estimatorData);
    setIsEstimateModalOpen(false);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmitted = (record) => {
    if (record.formType === 'enquiry') {
      setEnquiries([record, ...enquiries]);
    } else {
      setBookings([record, ...bookings]);
    }
  };

  const handleOpenAdminPortal = () => {
    if (isAdminAuthenticated) {
      setActiveTab('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsAdminAuthModalOpen(true);
    }
  };

  const handleAdminAuthenticate = () => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem('royal_admin_auth', 'true');
    setIsAdminAuthModalOpen(false);
    setActiveTab('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('royal_admin_auth');
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-palette-lace text-palette-eggplant font-sans flex flex-col justify-between selection:bg-palette-shamrock selection:text-white">
      
      {/* Sticky Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'admin') {
            handleOpenAdminPortal();
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenEstimate={() => setIsEstimateModalOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            onOpenEstimate={() => setIsEstimateModalOpen(true)}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {activeTab === 'catering' && (
          <CateringPage
            onOpenEstimate={() => setIsEstimateModalOpen(true)}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {activeTab === 'menu' && (
          <MenuPage
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage />
        )}

        {activeTab === 'admin' && (
          isAdminAuthenticated ? (
            <AdminPage
              bookings={bookings}
              setBookings={setBookings}
              enquiries={enquiries}
              setEnquiries={setEnquiries}
              onLogout={handleAdminLogout}
            />
          ) : (
            <div className="pt-32 pb-20 text-center space-y-4 max-w-md mx-auto px-4">
              <div className="p-8 bg-white rounded-3xl border border-palette-laceBorder shadow-xl space-y-4">
                <h3 className="font-serif text-2xl font-extrabold text-palette-eggplant">Admin Access Protected</h3>
                <p className="text-xs text-palette-eggplant/80">Please authenticate with your passcode to access the Royal Table Admin Portal.</p>
                <button
                  onClick={handleOpenAdminPortal}
                  className="px-6 py-3 bg-palette-shamrock hover:bg-palette-shamrockDark text-white font-extrabold text-xs rounded-xl shadow-md"
                >
                  Enter Admin Passcode 🔐
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* Floating Action Concierge Button */}
      <WhatsAppButton />

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenEstimate={() => setIsEstimateModalOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={handleOpenAdminPortal}
      />

      {/* --- MODAL 1: BOOKING & ENQUIRY FORM --- */}
      <BookingFormModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialData={modalInitialData}
        onBookingSubmitted={handleBookingSubmitted}
      />

      {/* --- MODAL 2: ADMIN AUTHENTICATION POPUP --- */}
      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onAuthenticate={handleAdminAuthenticate}
      />

      {/* --- MODAL 3: STANDALONE ESTIMATOR POPUP --- */}
      {isEstimateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div onClick={() => setIsEstimateModalOpen(false)} className="fixed inset-0 bg-palette-eggplant/80 backdrop-blur-md" />
          <div className="relative w-full max-w-5xl z-10 my-8">
            <button
              onClick={() => setIsEstimateModalOpen(false)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-palette-shamrock bg-palette-eggplant rounded-full border border-white/20 shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>
            <InstantEstimator
              isModal={true}
              onBookWithEstimate={(estData) => handleOpenBooking(estData)}
            />
          </div>
        </div>
      )}

    </div>
  );
}
