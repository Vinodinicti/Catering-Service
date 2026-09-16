import React, { useState } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuData';
import Card3DTilt from '../components/3d/Card3DTilt';
import { Search, Star, Utensils, X } from 'lucide-react';

export default function MenuPage({ onOpenBooking }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [selectedDishModal, setSelectedDishModal] = useState(null);

  const filteredDishes = MENU_ITEMS.filter((dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dish.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory;

    let matchesDietary = true;
    if (dietaryFilter === 'veg') matchesDietary = dish.dietary === 'veg';
    if (dietaryFilter === 'non-veg') matchesDietary = dish.dietary === 'non-veg';
    if (dietaryFilter === 'special') matchesDietary = dish.isChefSpecial;

    return matchesSearch && matchesCategory && matchesDietary;
  });

  return (
    <div className="pt-28 pb-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-palette-lace text-palette-eggplant">
      
      {/* Page Header with Background Image & Eggplant Opacity Overlay */}
      <section className="relative text-center max-w-5xl mx-auto px-6 py-14 rounded-3xl overflow-hidden shadow-2xl border border-palette-lilac/30 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url('/images/dishes/appam_avial.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-palette-eggplant/95 via-palette-eggplantDark/90 to-palette-eggplant/95 backdrop-blur-xs" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 shadow-inner border border-palette-shamrock/40">
            <Utensils className="w-4 h-4 text-palette-shamrock" />
            <span>Gourmet South Indian Menu Catalog</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-white">
            Our Royal <span className="bg-gradient-to-r from-white via-palette-shamrock to-white bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">Dakshin Culinary Catalog</span>
          </h1>
          <p className="text-palette-lilac/90 text-sm sm:text-base max-w-2xl mx-auto">
            Explore our handcrafted South Indian delicacies prepared with authentic spices and master craftsmanship.
          </p>
        </div>
      </section>

      {/* Search Bar & Dietary Filters */}
      <div className="bg-white p-6 rounded-3xl border border-palette-laceBorder shadow-lilac-md space-y-4">
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-palette-eggplant/40" />
            <input
              type="text"
              placeholder="Search dishes by name, spice, or tag (e.g. Biryani, Dosa, Chettinad, Appam)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-palette-lace border border-palette-laceBorder rounded-2xl text-sm text-palette-eggplant placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock"
            />
          </div>

          {/* Dietary Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {[
              { id: 'all', label: 'All South Dishes' },
              { id: 'veg', label: 'Pure Veg 🌱' },
              { id: 'non-veg', label: 'Non-Veg 🍗' },
              { id: 'special', label: 'Chef Specials 👑' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setDietaryFilter(filter.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  dietaryFilter === filter.id
                    ? 'bg-palette-eggplant text-white border-palette-eggplant shadow-sm font-extrabold'
                    : 'bg-palette-lace text-palette-eggplant/80 border-palette-laceBorder hover:border-palette-eggplant/30'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 no-scrollbar">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-palette-shamrock text-white shadow-sm font-extrabold'
                  : 'bg-palette-lilacLight text-palette-eggplant/80 hover:text-palette-eggplant border border-palette-laceBorder'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* Dish Catalog Grid */}
      {filteredDishes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-palette-laceBorder space-y-3 shadow-lilac-sm">
          <Utensils className="w-12 h-12 text-palette-eggplant/40 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-palette-eggplant">No Dishes Found</h3>
          <p className="text-xs text-palette-eggplant/70">Try adjusting your search criteria or dietary filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredDishes.map((dish) => (
            <Card3DTilt key={dish.id} className="bg-white border border-palette-laceBorder group cursor-pointer shadow-lilac-md hover:shadow-xl rounded-2xl flex flex-col justify-between overflow-hidden" onClick={() => setSelectedDishModal(dish)}>
              <div>
                <div 
                  onClick={() => setSelectedDishModal(dish)}
                  className="relative h-40 sm:h-52 overflow-hidden rounded-t-2xl"
                >
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

              {/* Footer Rating & Action */}
              <div className="p-4 sm:p-5 pt-0">
                <div className="pt-2 flex items-center justify-between text-xs font-bold text-palette-eggplant border-t border-palette-laceBorder">
                  <div className="inline-flex items-center gap-1 bg-palette-shamrock/15 text-palette-shamrockDark px-2.5 py-1 rounded-md font-black text-xs">
                    <Star className="w-3.5 h-3.5 fill-palette-shamrockDark text-palette-shamrockDark" />
                    <span>{dish.rating} Rating</span>
                  </div>
                  <button 
                    onClick={() => setSelectedDishModal(dish)}
                    className="text-palette-eggplant group-hover:text-palette-shamrock font-black text-xs hover:underline flex items-center gap-1"
                  >
                    <span>View Details</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      )}

      {/* Dish Detail Modal */}
      {selectedDishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setSelectedDishModal(null)} className="fixed inset-0 bg-palette-eggplant/70 backdrop-blur-md" />
          <div className="relative w-full max-w-lg bg-white text-palette-eggplant rounded-3xl border border-palette-laceBorder shadow-lilac-lg overflow-hidden z-10 animate-scaleUp">
            
            <div className="relative h-64">
              <img
                src={selectedDishModal.image}
                alt={selectedDishModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-palette-eggplant/60 via-transparent to-transparent" />
              <button
                onClick={() => setSelectedDishModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-palette-eggplant/80 text-white hover:bg-palette-eggplant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-extrabold text-palette-eggplant">{selectedDishModal.name}</h3>
                  <p className="text-xs text-palette-shamrock font-bold mt-0.5">
                    {selectedDishModal.dietary === 'veg' ? 'Pure Vegetarian Delicacy' : 'Royal Non-Vegetarian Special'}
                  </p>
                </div>
                <span className="font-sans text-2xl font-extrabold text-palette-eggplant">
                  ₹{selectedDishModal.price} <span className="text-xs font-semibold text-palette-eggplant/70">/ portion</span>
                </span>
              </div>

              <p className="text-palette-eggplant/80 text-sm leading-relaxed">
                {selectedDishModal.description}
              </p>

              {/* Lilac Tag Chips */}
              <div className="flex items-center gap-2 pt-2">
                {selectedDishModal.tags.map(tag => (
                  <span key={tag} className="bg-palette-lilac/30 text-palette-eggplant px-3 py-1 rounded-full text-xs font-bold border border-palette-lilac/50">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedDishModal(null);
                    onOpenBooking();
                  }}
                  className="flex-1 py-3 bg-palette-shamrock hover:bg-palette-shamrockDark text-white font-extrabold rounded-2xl shadow-md"
                >
                  Book Catering with this Dish
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
