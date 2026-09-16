import React, { useState } from 'react';
import { LayoutDashboard, CalendarCheck, MessageSquare, Utensils, Package, Plus, Trash2, LogOut, ShieldCheck, CheckCircle2, XCircle, TrendingUp, Sparkles, Filter } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';
import { CATERING_PACKAGES } from '../data/packageData';

export default function AdminPage({ bookings, setBookings, enquiries, setEnquiries, onLogout }) {
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');
  
  const [adminMenu, setAdminMenu] = useState(MENU_ITEMS);
  const [adminPackages, setAdminPackages] = useState(CATERING_PACKAGES);

  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [newDish, setNewDish] = useState({
    name: '',
    category: 'appetizers',
    price: 350,
    dietary: 'veg',
    description: '',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600',
    isChefSpecial: false,
    rating: 4.8,
    tags: ['Chettinad', 'Special']
  });

  const getBookingPackageName = (b) => {
    if (b.packageName) return b.packageName;
    const pkg = CATERING_PACKAGES.find(p => p.id === b.packageId);
    return pkg ? pkg.name : 'South Indian Catering Package';
  };

  const getBookingCost = (b) => {
    if (b.estimatedCost && b.estimatedCost > 0) return b.estimatedCost;
    if (b.estimatedAmount && b.estimatedAmount > 0) return b.estimatedAmount;
    
    const pkg = CATERING_PACKAGES.find(p => p.id === b.packageId) || CATERING_PACKAGES[1];
    const guests = b.guestCount || 50;
    const baseRate = pkg ? pkg.pricePerGuest : 750;
    const rawSubtotal = baseRate * guests;
    const discountRate = guests >= 300 ? 0.08 : guests >= 200 ? 0.05 : 0;
    const subtotalAfterDiscount = rawSubtotal - (rawSubtotal * discountRate);
    const gstTax = Math.round(subtotalAfterDiscount * 0.18);
    return Math.round(subtotalAfterDiscount + gstTax);
  };

  const totalRevenueEstimated = bookings.reduce((sum, b) => sum + getBookingCost(b), 0);
  const totalBookingsCount = bookings.length;
  const pendingBookingsCount = bookings.filter(b => b.status === 'Pending').length;
  const unreadEnquiriesCount = enquiries.filter(e => e.status === 'Unread').length;

  const handleUpdateBookingStatus = (id, newStatus) => {
    setBookings((prev) => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handleUpdateEnquiryStatus = (id, newStatus) => {
    setEnquiries((prev) => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
  };

  const handleAddDish = (e) => {
    e.preventDefault();
    const createdDish = {
      id: `m-${Date.now()}`,
      ...newDish,
      price: Number(newDish.price)
    };
    setAdminMenu([createdDish, ...adminMenu]);
    setShowAddDishModal(false);
  };

  const handleDeleteDish = (id) => {
    setAdminMenu(adminMenu.filter(m => m.id !== id));
  };

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-palette-lace text-palette-eggplant relative overflow-hidden animate-fadeIn">
      
      {/* Background Glow Accents */}
      <div className="absolute top-12 right-12 w-96 h-96 bg-palette-lilac/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-12 left-12 w-96 h-96 bg-palette-shamrock/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border-2 border-palette-laceBorder shadow-xl relative z-10 transition-all">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-palette-eggplant text-white flex items-center justify-center shadow-md shrink-0 border border-palette-shamrock/40">
            <LayoutDashboard className="w-6 h-6 text-palette-shamrock animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-extrabold text-palette-eggplant tracking-tight">Royal Table Admin Portal</h1>
              <span className="bg-palette-shamrock/20 text-palette-shamrock border border-palette-shamrock/40 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase flex items-center gap-1 shadow-sm">
                <ShieldCheck className="w-3 h-3" />
                <span>Authenticated</span>
              </span>
            </div>
            <p className="text-xs text-palette-eggplant/75 font-medium">Manage South Indian Catering Services, Quotations, Enquiries & Menus</p>
          </div>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="px-4 py-2.5 rounded-xl bg-palette-lace hover:bg-red-50 text-red-600 font-extrabold text-xs flex items-center justify-center gap-2 border border-red-200 transition-all shadow-sm hover:scale-105 cursor-pointer self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4" />
            <span>Lock & Log Out</span>
          </button>
        )}
      </div>

      {/* Admin Tab Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-palette-laceBorder relative z-10">
        {[
          { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
          { id: 'bookings', label: `Manage Bookings (${totalBookingsCount})`, icon: CalendarCheck, badge: pendingBookingsCount },
          { id: 'enquiries', label: `Customer Enquiries (${enquiries.length})`, icon: MessageSquare, badge: unreadEnquiriesCount },
          { id: 'menu', label: `Food Menu Items (${adminMenu.length})`, icon: Utensils },
          { id: 'packages', label: 'Catering Packages', icon: Package }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                isActive
                  ? 'bg-palette-eggplant text-white border-palette-eggplant shadow-lg font-extrabold scale-[1.02]'
                  : 'bg-white text-palette-eggplant/80 hover:text-palette-eggplant hover:bg-palette-lilacLight/40 border-palette-laceBorder'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-palette-shamrock' : 'text-palette-eggplant/60'}`} />
              <span>{tab.label}</span>
              {tab.badge > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-palette-shamrock text-white font-black animate-pulse">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* --- TAB 1: DASHBOARD OVERVIEW --- */}
      {activeAdminTab === 'dashboard' && (
        <div className="space-y-8 relative z-10 animate-scaleUp">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border-2 border-palette-laceBorder hover:border-palette-shamrock/60 shadow-md hover:shadow-xl transition-all duration-300 space-y-2 group">
              <span className="text-[10px] font-black uppercase tracking-wider text-palette-eggplant/60 flex items-center justify-between">
                <span>Total Estimated Revenue</span>
                <TrendingUp className="w-4 h-4 text-palette-shamrock group-hover:scale-125 transition-transform" />
              </span>
              <div className="font-sans text-3xl font-black text-palette-eggplant tracking-tight">
                ₹{totalRevenueEstimated.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-palette-shamrock font-bold">Across all active catering requests</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border-2 border-palette-laceBorder hover:border-palette-shamrock/60 shadow-md hover:shadow-xl transition-all duration-300 space-y-2 group">
              <span className="text-[10px] font-black uppercase tracking-wider text-palette-eggplant/60 flex items-center justify-between">
                <span>Active Bookings</span>
                <CalendarCheck className="w-4 h-4 text-palette-eggplant group-hover:scale-125 transition-transform" />
              </span>
              <div className="font-sans text-3xl font-black text-palette-eggplant tracking-tight">
                {totalBookingsCount}
              </div>
              <p className="text-[11px] text-palette-shamrock font-bold">{pendingBookingsCount} pending confirmation</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border-2 border-palette-laceBorder hover:border-palette-shamrock/60 shadow-md hover:shadow-xl transition-all duration-300 space-y-2 group">
              <span className="text-[10px] font-black uppercase tracking-wider text-palette-eggplant/60 flex items-center justify-between">
                <span>Customer Inquiries</span>
                <MessageSquare className="w-4 h-4 text-palette-eggplant group-hover:scale-125 transition-transform" />
              </span>
              <div className="font-sans text-3xl font-black text-palette-eggplant tracking-tight">
                {enquiries.length}
              </div>
              <p className="text-[11px] text-palette-eggplant font-bold">{unreadEnquiriesCount} unread messages</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border-2 border-palette-laceBorder hover:border-palette-shamrock/60 shadow-md hover:shadow-xl transition-all duration-300 space-y-2 group">
              <span className="text-[10px] font-black uppercase tracking-wider text-palette-eggplant/60 flex items-center justify-between">
                <span>Menu Catalog Items</span>
                <Utensils className="w-4 h-4 text-palette-shamrock group-hover:scale-125 transition-transform" />
              </span>
              <div className="font-sans text-3xl font-black text-palette-eggplant tracking-tight">
                {adminMenu.length} Dishes
              </div>
              <p className="text-[11px] text-palette-shamrock font-bold">Across 6 South Indian categories</p>
            </div>
          </div>

          {/* Recent Event Bookings Table */}
          <div className="bg-white p-6 rounded-3xl border-2 border-palette-laceBorder shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-extrabold text-palette-eggplant">Recent Event Bookings</h3>
                <p className="text-xs text-palette-eggplant/70">Latest client catering requests and status</p>
              </div>
              <button
                onClick={() => setActiveAdminTab('bookings')}
                className="text-xs text-palette-shamrock font-extrabold hover:underline cursor-pointer"
              >
                View All Bookings →
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-palette-laceBorder">
              <table className="w-full text-left text-xs text-palette-eggplant">
                <thead className="bg-palette-eggplant text-white font-extrabold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Ref ID</th>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Event & Date</th>
                    <th className="p-3.5">Guests</th>
                    <th className="p-3.5">Est. Amount</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-palette-laceBorder bg-white">
                  {bookings.slice(0, 5).map((b) => (
                    <tr key={b.id} className="hover:bg-palette-shamrock/10 transition-colors duration-200">
                      <td className="p-3.5 font-mono font-black text-palette-eggplant">{b.id}</td>
                      <td className="p-3.5 font-extrabold text-palette-eggplant">{b.customerName}</td>
                      <td className="p-3.5 font-semibold">{b.eventType} ({b.eventDate || 'TBD'})</td>
                      <td className="p-3.5 font-extrabold text-palette-eggplant">{b.guestCount} Guests</td>
                      <td className="p-3.5 font-black text-palette-shamrock font-sans text-sm">₹{getBookingCost(b).toLocaleString('en-IN')}</td>
                      <td className="p-3.5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          b.status === 'Confirmed'
                            ? 'bg-palette-shamrock/20 text-palette-shamrock border border-palette-shamrock/40'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* --- TAB 2: MANAGE BOOKINGS --- */}
      {activeAdminTab === 'bookings' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-palette-laceBorder shadow-xl space-y-6 relative z-10 animate-scaleUp">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-palette-laceBorder pb-4">
            <div>
              <h2 className="font-serif text-2xl font-extrabold text-palette-eggplant">All Event Bookings & Quotations</h2>
              <p className="text-xs text-palette-eggplant/70">Review, confirm, or modify upcoming South Indian event bookings.</p>
            </div>
            <div className="text-xs text-palette-eggplant font-black bg-palette-lace px-3.5 py-1.5 rounded-xl border border-palette-laceBorder self-start sm:self-auto">
              Total {bookings.length} Requests
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-palette-laceBorder">
            <table className="w-full text-left text-xs text-palette-eggplant">
              <thead className="bg-palette-eggplant text-white font-extrabold uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Ref ID</th>
                  <th className="p-3.5">Customer Details</th>
                  <th className="p-3.5">Event & Date</th>
                  <th className="p-3.5">Guests & Package</th>
                  <th className="p-3.5">Est. Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-palette-laceBorder bg-white">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-palette-shamrock/10 transition-colors duration-200">
                    <td className="p-3.5 font-mono font-black text-palette-eggplant">{b.id}</td>
                    <td className="p-3.5 space-y-0.5">
                      <p className="font-extrabold text-palette-eggplant text-sm">{b.customerName}</p>
                      <p className="text-[11px] text-palette-eggplant/70 font-semibold">{b.phone} | {b.email}</p>
                    </td>
                    <td className="p-3.5 space-y-0.5">
                      <p className="font-bold text-palette-eggplant">{b.eventType}</p>
                      <p className="text-[11px] text-palette-shamrock font-black">{b.eventDate || 'Date pending'}</p>
                    </td>
                    <td className="p-3.5 space-y-0.5">
                      <p className="font-black text-palette-eggplant">{b.guestCount} Guests</p>
                      <p className="text-[11px] text-palette-eggplant/70 font-semibold">{getBookingPackageName(b)}</p>
                    </td>
                    <td className="p-3.5 font-black text-palette-shamrock font-sans text-sm">
                      ₹{getBookingCost(b).toLocaleString('en-IN')}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        b.status === 'Confirmed'
                          ? 'bg-palette-shamrock/20 text-palette-shamrock border border-palette-shamrock/40'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      {b.status !== 'Confirmed' ? (
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, 'Confirmed')}
                          className="px-3 py-1.5 rounded-xl bg-palette-shamrock hover:bg-palette-shamrockDark text-white text-xs font-black shadow-md transition-all hover:scale-105 cursor-pointer"
                        >
                          Confirm
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, 'Pending')}
                          className="px-3 py-1.5 rounded-xl bg-palette-lace hover:bg-palette-lilacLight text-palette-eggplant text-xs font-extrabold border border-palette-laceBorder transition-all cursor-pointer"
                        >
                          Set Pending
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- TAB 3: CUSTOMER ENQUIRIES --- */}
      {activeAdminTab === 'enquiries' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-palette-laceBorder shadow-xl space-y-6 relative z-10 animate-scaleUp">
          <div className="flex items-center justify-between border-b border-palette-laceBorder pb-4">
            <div>
              <h2 className="font-serif text-2xl font-extrabold text-palette-eggplant">Customer Enquiries</h2>
              <p className="text-xs text-palette-eggplant/70">General messages and catering custom requests.</p>
            </div>
            <div className="text-xs font-black text-palette-shamrock bg-palette-shamrock/15 px-3 py-1 rounded-xl border border-palette-shamrock/30">
              {unreadEnquiriesCount} Unread Messages
            </div>
          </div>

          <div className="space-y-4">
            {enquiries.map((e) => (
              <div
                key={e.id}
                className={`p-5 rounded-2xl border-2 transition-all ${
                  e.status === 'Unread'
                    ? 'bg-palette-lilacLight/40 border-palette-shamrock shadow-md'
                    : 'bg-white border-palette-laceBorder'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-palette-laceBorder/60 pb-3 mb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-palette-eggplant/60 block">{e.id}</span>
                    <h4 className="font-serif font-extrabold text-base text-palette-eggplant">{e.subject || e.name}</h4>
                    <p className="text-xs text-palette-eggplant/70 font-semibold">{e.name} • {e.phone} • {e.email}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase self-start sm:self-auto ${
                    e.status === 'Unread' ? 'bg-palette-shamrock text-white' : 'bg-palette-lace text-palette-eggplant'
                  }`}>
                    {e.status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-palette-eggplant/90 leading-relaxed font-medium">"{e.message || e.notes}"</p>
                <div className="mt-4 flex justify-end gap-2">
                  {e.status === 'Unread' && (
                    <button
                      onClick={() => handleUpdateEnquiryStatus(e.id, 'Responded')}
                      className="px-4 py-1.5 rounded-xl bg-palette-shamrock hover:bg-palette-shamrockDark text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer"
                    >
                      Mark Responded ✓
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 4: FOOD MENU ITEMS --- */}
      {activeAdminTab === 'menu' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-palette-laceBorder shadow-xl space-y-6 relative z-10 animate-scaleUp">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-palette-laceBorder pb-4">
            <div>
              <h2 className="font-serif text-2xl font-extrabold text-palette-eggplant">Manage Food Menu Catalog</h2>
              <p className="text-xs text-palette-eggplant/70">Add or edit dishes rendered on the Food Menu page.</p>
            </div>
            <button
              onClick={() => setShowAddDishModal(true)}
              className="px-5 py-2.5 rounded-2xl bg-palette-shamrock hover:bg-palette-shamrockDark text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-all cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Dish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminMenu.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl border border-palette-laceBorder bg-palette-lace/30 flex items-center justify-between gap-3 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover border border-palette-laceBorder" />
                  <div>
                    <h4 className="font-serif font-extrabold text-sm text-palette-eggplant">{item.name}</h4>
                    <span className="text-xs font-black text-palette-shamrock">₹{item.price}</span>
                    <p className="text-[10px] text-palette-eggplant/60 uppercase font-bold">{item.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteDish(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl border border-red-200 transition-colors cursor-pointer"
                  title="Delete dish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 5: CATERING PACKAGES --- */}
      {activeAdminTab === 'packages' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-palette-laceBorder shadow-xl space-y-6 relative z-10 animate-scaleUp">
          <div className="border-b border-palette-laceBorder pb-4">
            <h2 className="font-serif text-2xl font-extrabold text-palette-eggplant">South Indian Catering Packages</h2>
            <p className="text-xs text-palette-eggplant/70">Active tier pricing and included menu items.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {adminPackages.map((pkg) => (
              <div key={pkg.id} className="p-6 rounded-3xl border-2 border-palette-shamrock/40 bg-gradient-to-b from-palette-lilacLight/30 via-white to-palette-shamrock/10 shadow-md space-y-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-palette-shamrock bg-palette-shamrock/20 px-2.5 py-0.5 rounded-full border border-palette-shamrock/40">
                    {pkg.badge}
                  </span>
                  <h3 className="font-serif text-xl font-extrabold text-palette-eggplant mt-2">{pkg.name}</h3>
                  <p className="text-xs text-palette-eggplant/80 mt-1 font-medium">{pkg.tagline}</p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-sans text-3xl font-black text-palette-eggplant">₹{pkg.pricePerGuest}</span>
                  <span className="text-xs text-palette-eggplant/60 font-bold">/ guest</span>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-palette-laceBorder">
                  <span className="text-[10px] uppercase font-black text-palette-eggplant/70">Includes:</span>
                  {pkg.includes.map((inc, i) => (
                    <div key={i} className="text-xs text-palette-eggplant font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-palette-shamrock shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- ADD DISH MODAL POPUP --- */}
      {showAddDishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div onClick={() => setShowAddDishModal(false)} className="fixed inset-0 bg-palette-eggplant/80 backdrop-blur-md" />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 z-10 shadow-2xl border border-palette-laceBorder space-y-4">
            <h3 className="font-serif text-xl font-extrabold text-palette-eggplant">Add New Dish to Catalog</h3>
            <form onSubmit={handleAddDish} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase mb-1">Dish Name *</label>
                <input
                  type="text"
                  required
                  value={newDish.name}
                  onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                  className="w-full p-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm"
                  placeholder="e.g. Karaikudi Mutton Sukka"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase mb-1">Price per portion (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newDish.price}
                    onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                    className="w-full p-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase mb-1">Category</label>
                  <select
                    value={newDish.category}
                    onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                    className="w-full p-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm"
                  >
                    <option value="appetizers">Appetizers & Starters</option>
                    <option value="mains">Main Course Curries</option>
                    <option value="breads">Rice & Parottas</option>
                    <option value="desserts">Desserts & Sweets</option>
                    <option value="beverages">Beverages & Kaapi</option>
                    <option value="live">Live Counter Specialties</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Description</label>
                <textarea
                  rows="3"
                  value={newDish.description}
                  onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                  className="w-full p-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-sm"
                  placeholder="Short appetizing description..."
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddDishModal(false)}
                  className="px-4 py-2 rounded-xl bg-palette-lace font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-palette-shamrock text-white font-extrabold shadow-md"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
