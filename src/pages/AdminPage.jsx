import React, { useState } from 'react';
import { LayoutDashboard, CalendarCheck, MessageSquare, Utensils, Package, Plus, Trash2, LogOut, ShieldCheck } from 'lucide-react';
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

  const totalRevenueEstimated = bookings.reduce((sum, b) => sum + (b.estimatedCost || 0), 0);
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
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-palette-lace text-palette-eggplant">
      
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-palette-laceBorder shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-palette-eggplant text-white flex items-center justify-center shadow-md">
            <LayoutDashboard className="w-6 h-6 text-palette-shamrock" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-extrabold text-palette-eggplant">Royal Table Admin Portal</h1>
              <span className="bg-palette-shamrock/20 text-palette-shamrock border border-palette-shamrock/40 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Authenticated</span>
              </span>
            </div>
            <p className="text-xs text-palette-eggplant/70">Manage South Indian Services, Bookings, Enquiries & Menus</p>
          </div>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-palette-lace hover:bg-red-50 text-red-600 font-extrabold text-xs flex items-center justify-center gap-2 border border-red-200 transition-colors shadow-sm self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4" />
            <span>Lock & Log Out</span>
          </button>
        )}
      </div>

      {/* Admin Tab Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-palette-laceBorder">
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
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-palette-eggplant text-white border-palette-eggplant shadow-sm font-extrabold'
                  : 'bg-white text-palette-eggplant/80 hover:text-palette-eggplant border-palette-laceBorder'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-palette-shamrock text-white font-extrabold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* --- TAB 1: DASHBOARD OVERVIEW --- */}
      {activeAdminTab === 'dashboard' && (
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-palette-laceBorder shadow-sm space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-palette-eggplant/60">Total Estimated Revenue</span>
              <div className="font-sans text-3xl font-extrabold text-palette-eggplant tracking-tight">
                ₹{totalRevenueEstimated.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-palette-shamrock font-bold">Across all active catering requests</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-palette-laceBorder shadow-sm space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-palette-eggplant/60">Active Bookings</span>
              <div className="font-sans text-3xl font-extrabold text-palette-eggplant tracking-tight">
                {totalBookingsCount}
              </div>
              <p className="text-[11px] text-palette-shamrock font-bold">{pendingBookingsCount} pending confirmation</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-palette-laceBorder shadow-sm space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-palette-eggplant/60">Customer Inquiries</span>
              <div className="font-sans text-3xl font-extrabold text-palette-eggplant tracking-tight">
                {enquiries.length}
              </div>
              <p className="text-[11px] text-palette-eggplant font-bold">{unreadEnquiriesCount} unread messages</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-palette-laceBorder shadow-sm space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-palette-eggplant/60">Menu Catalog Items</span>
              <div className="font-sans text-3xl font-extrabold text-palette-eggplant tracking-tight">
                {adminMenu.length} Dishes
              </div>
              <p className="text-[11px] text-palette-shamrock font-bold">Across 6 South Indian categories</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-palette-laceBorder shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-extrabold text-palette-eggplant">Recent Event Bookings</h3>
              <button
                onClick={() => setActiveAdminTab('bookings')}
                className="text-xs text-palette-shamrock font-bold hover:underline"
              >
                View All Bookings →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-palette-eggplant">
                <thead className="bg-palette-lilacLight text-palette-eggplant font-extrabold uppercase text-[10px] border-b border-palette-laceBorder">
                  <tr>
                    <th className="p-3">Ref ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Event & Date</th>
                    <th className="p-3">Guests</th>
                    <th className="p-3">Est. Amount</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-palette-laceBorder">
                  {bookings.slice(0, 5).map((b) => (
                    <tr key={b.id} className="hover:bg-palette-lace">
                      <td className="p-3 font-mono font-bold text-palette-eggplant">{b.id}</td>
                      <td className="p-3 font-semibold text-palette-eggplant">{b.customerName}</td>
                      <td className="p-3">{b.eventType} ({b.eventDate || 'TBD'})</td>
                      <td className="p-3 font-bold text-palette-eggplant">{b.guestCount}</td>
                      <td className="p-3 font-bold text-palette-shamrock">₹{(b.estimatedCost || 0).toLocaleString('en-IN')}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          b.status === 'Confirmed' ? 'bg-palette-shamrock/20 text-palette-shamrock border border-palette-shamrock/40' : 'bg-palette-lilac/30 text-palette-eggplant border border-palette-lilac/50'
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
        <div className="bg-white p-6 rounded-3xl border border-palette-laceBorder shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-serif text-xl font-extrabold text-palette-eggplant">All Event Bookings & Quotations</h2>
            <div className="text-xs text-palette-eggplant/70 font-semibold">
              Total {bookings.length} Requests
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-palette-eggplant">
              <thead className="bg-palette-lilacLight text-palette-eggplant font-extrabold uppercase text-[10px] border-b border-palette-laceBorder">
                <tr>
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Customer Details</th>
                  <th className="p-3">Event & Date</th>
                  <th className="p-3">Guests & Package</th>
                  <th className="p-3">Est. Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-palette-laceBorder">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-palette-lace">
                    <td className="p-3 font-mono font-bold text-palette-eggplant">{b.id}</td>
                    <td className="p-3 space-y-0.5">
                      <p className="font-bold text-palette-eggplant">{b.customerName}</p>
                      <p className="text-[11px] text-palette-eggplant/60">{b.phone} | {b.email}</p>
                    </td>
                    <td className="p-3 space-y-0.5">
                      <p className="font-semibold text-palette-eggplant">{b.eventType}</p>
                      <p className="text-[11px] text-palette-shamrock font-bold">{b.eventDate || 'Date pending'}</p>
                    </td>
                    <td className="p-3 space-y-0.5">
                      <p className="font-bold text-palette-eggplant">{b.guestCount} Guests</p>
                      <p className="text-[11px] text-palette-eggplant/60">{b.packageName || 'Standard Package'}</p>
                    </td>
                    <td className="p-3 font-bold text-palette-shamrock font-sans text-sm">
                      ₹{(b.estimatedCost || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        b.status === 'Confirmed' ? 'bg-palette-shamrock/20 text-palette-shamrock border border-palette-shamrock/40' : 'bg-palette-lilac/30 text-palette-eggplant border border-palette-lilac/50'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      {b.status !== 'Confirmed' && (
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, 'Confirmed')}
                          className="px-2.5 py-1 rounded-lg bg-palette-shamrock hover:bg-palette-shamrockDark text-white text-[11px] font-extrabold"
                        >
                          Confirm
                        </button>
                      )}
                      {b.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, 'Cancelled')}
                          className="px-2.5 py-1 rounded-lg bg-palette-eggplant/10 text-palette-eggplant hover:bg-palette-eggplant/20 text-[11px] border border-palette-eggplant/30 font-bold"
                        >
                          Cancel
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
        <div className="bg-white p-6 rounded-3xl border border-palette-laceBorder shadow-md space-y-6">
          <h2 className="font-serif text-xl font-extrabold text-palette-eggplant">Customer Enquiries & Messages</h2>

          <div className="space-y-4">
            {enquiries.map((enq) => (
              <div key={enq.id} className="p-5 rounded-2xl bg-palette-lace border border-palette-laceBorder space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold bg-palette-eggplant text-white px-2.5 py-1 rounded-lg">
                      {enq.id}
                    </span>
                    <div>
                      <h4 className="font-bold text-palette-eggplant text-sm">{enq.name}</h4>
                      <p className="text-xs text-palette-eggplant/60">{enq.email} | {enq.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      enq.status === 'Responded' ? 'bg-palette-shamrock/20 text-palette-shamrock' : 'bg-palette-eggplant/20 text-palette-eggplant'
                    }`}>
                      {enq.status}
                    </span>
                    {enq.status !== 'Responded' && (
                      <button
                        onClick={() => handleUpdateEnquiryStatus(enq.id, 'Responded')}
                        className="px-3 py-1 bg-palette-shamrock text-white font-bold text-xs rounded-lg"
                      >
                        Mark Responded
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-palette-laceBorder text-xs text-palette-eggplant space-y-1">
                  <p className="font-bold text-palette-eggplant">Subject: {enq.subject}</p>
                  <p className="leading-relaxed">{enq.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 4: MANAGE FOOD MENU --- */}
      {activeAdminTab === 'menu' && (
        <div className="bg-white p-6 rounded-3xl border border-palette-laceBorder shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-extrabold text-palette-eggplant">Food Menu Items Management</h2>
            <button
              onClick={() => setShowAddDishModal(true)}
              className="px-4 py-2 bg-palette-shamrock hover:bg-palette-shamrockDark text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Gourmet Dish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminMenu.map((dish) => (
              <div key={dish.id} className="bg-palette-lace p-4 rounded-2xl border border-palette-laceBorder flex items-center gap-4">
                <img src={dish.image} alt={dish.name} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1 space-y-1">
                  <h4 className="font-bold text-palette-eggplant text-sm">{dish.name}</h4>
                  <p className="text-xs text-palette-eggplant font-bold">₹{dish.price}</p>
                  <span className="text-[10px] text-palette-eggplant/60 capitalize font-medium">{dish.category}</span>
                </div>
                <button
                  onClick={() => handleDeleteDish(dish.id)}
                  className="p-2 text-palette-eggplant hover:bg-palette-eggplant/10 rounded-lg"
                >
                  <Trash2 className="w-4 h-4 text-palette-eggplant" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 5: MANAGE PACKAGES --- */}
      {activeAdminTab === 'packages' && (
        <div className="bg-white p-6 rounded-3xl border border-palette-laceBorder shadow-md space-y-6">
          <h2 className="font-serif text-xl font-extrabold text-palette-eggplant">Catering Packages & Per-Head Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {adminPackages.map((pkg) => (
              <div key={pkg.id} className="bg-palette-lace p-6 rounded-2xl border border-palette-laceBorder space-y-3">
                <h3 className="font-serif text-lg font-bold text-palette-eggplant">{pkg.name}</h3>
                <p className="text-palette-eggplant font-sans text-2xl font-extrabold tracking-tight">₹{pkg.pricePerGuest} / head</p>
                <p className="text-xs text-palette-eggplant/70">{pkg.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Dish Modal */}
      {showAddDishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div onClick={() => setShowAddDishModal(false)} className="fixed inset-0 bg-palette-eggplant/80 backdrop-blur-md" />
          <div className="relative w-full max-w-md max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-white p-5 sm:p-6 rounded-3xl border border-palette-laceBorder shadow-2xl z-10 space-y-4 text-palette-eggplant my-auto">
            <button
              onClick={() => setShowAddDishModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-palette-eggplant/60 hover:text-palette-eggplant hover:bg-palette-lace transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-xl font-extrabold text-palette-eggplant pr-8">Add New Dish to Catalog</h3>

            <form onSubmit={handleAddDish} className="space-y-3 text-xs text-palette-eggplant">
              <div>
                <label className="block font-bold text-palette-eggplant/80 mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  value={newDish.name}
                  onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                  className="w-full px-3 py-2 bg-palette-lace border border-palette-laceBorder rounded-xl text-palette-eggplant"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-palette-eggplant/80 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newDish.price}
                    onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                    className="w-full px-3 py-2 bg-palette-lace border border-palette-laceBorder rounded-xl text-palette-eggplant"
                  />
                </div>

                <div>
                  <label className="block font-bold text-palette-eggplant/80 mb-1">Category</label>
                  <select
                    value={newDish.category}
                    onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                    className="w-full px-3 py-2 bg-palette-lace border border-palette-laceBorder rounded-xl text-palette-eggplant"
                  >
                    <option value="appetizers">Starters</option>
                    <option value="mains-veg">South Mains Veg</option>
                    <option value="mains-nonveg">South Mains Non-Veg</option>
                    <option value="breads">Parottas & Rice</option>
                    <option value="desserts">Payasam & Sweets</option>
                    <option value="beverages">Kaapi & Beverages</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-palette-eggplant/80 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={newDish.description}
                  onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                  className="w-full p-2 bg-palette-lace border border-palette-laceBorder rounded-xl text-palette-eggplant"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  checked={newDish.isChefSpecial}
                  onChange={(e) => setNewDish({ ...newDish, isChefSpecial: e.target.checked })}
                  className="w-4 h-4 accent-palette-shamrock"
                />
                <span>Chef's Special Badge</span>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-palette-shamrock text-white font-extrabold rounded-xl shadow-md"
                >
                  Save Dish
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddDishModal(false)}
                  className="px-4 py-2.5 bg-palette-lace text-palette-eggplant rounded-xl border border-palette-laceBorder font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
