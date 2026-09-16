import React, { useState } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuData';
import Card3DTilt from '../components/3d/Card3DTilt';
import { Search, Star, Utensils, X, SlidersHorizontal, ArrowUpDown, Filter, RotateCcw, Sparkles, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MenuPage({ onOpenBooking }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'rating' | 'name'
  const [selectedDishModal, setSelectedDishModal] = useState(null);

  // Filter Dishes
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

  // Sort Filtered Dishes
  const sortedDishes = [...filteredDishes].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // 'featured' retains original catalog order
  });

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || dietaryFilter !== 'all' || sortBy !== 'featured';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setDietaryFilter('all');
    setSortBy('featured');
  };

  return (
    <div className="pt-28 pb-16 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-palette-lace text-palette-eggplant">
      
      {/* Page Header Banner with Background Image & Medium Opacity Overlay */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative text-center max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 rounded-3xl overflow-hidden shadow-2xl border border-palette-lilac/40 text-white group"
      >
        {/* Background Image Slow Pulse Zoom */}
        <motion.div 
          animate={{ 
            scale: [1, 1.07, 1],
            y: [0, -8, 0]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/dishes/appam_avial.jpg')` }}
        />
        
        {/* Medium Opacity Eggplant Overlay */}
        <div className="absolute inset-0 bg-palette-eggplant/75 backdrop-blur-[2px] transition-opacity duration-500 group-hover:bg-palette-eggplant/70" />

        <div className="relative z-10 space-y-3.5 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-lg border border-white/30"
          >
            <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-palette-shamrock animate-pulse" />
            <span>Gourmet South Indian Menu Catalog</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight drop-shadow-md"
          >
            Our Royal <span className="bg-gradient-to-r from-palette-shamrock via-white to-palette-shamrock bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">Dakshin Culinary Catalog</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-white/95 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-sm"
          >
            Explore our handcrafted South Indian delicacies prepared with authentic spices and master craftsmanship.
          </motion.p>
        </div>
      </motion.section>

      {/* Modern Filter & Sort Control Toolbar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-palette-laceBorder shadow-lilac-md space-y-4">
        
        {/* Top Row: Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-4 top-3.5 sm:top-4 text-palette-eggplant/50" />
          <input
            type="text"
            placeholder="Search dishes by name, spice, or tag (e.g. Biryani, Dosa, Chettinad, Appam)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 sm:pl-12 pr-10 py-3 sm:py-3.5 bg-palette-lace border border-palette-laceBorder rounded-2xl text-xs sm:text-sm text-palette-eggplant font-medium placeholder-palette-eggplant/40 focus:outline-none focus:border-palette-shamrock focus:ring-2 focus:ring-palette-shamrock/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 sm:top-3.5 p-1 rounded-full text-palette-eggplant/50 hover:bg-palette-lilacLight hover:text-palette-eggplant transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdowns Row: Filter by Category, Filter by Dietary, Sort By */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Category Dropdown */}
          <div className="relative">
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-palette-eggplant/70 mb-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-palette-shamrock" />
              <span>Category</span>
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-xs font-bold text-palette-eggplant focus:outline-none focus:border-palette-shamrock cursor-pointer transition-all hover:bg-white"
            >
              <option value="all">All Categories ({MENU_ITEMS.length})</option>
              {MENU_CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dietary Dropdown */}
          <div className="relative">
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-palette-eggplant/70 mb-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-palette-shamrock" />
              <span>Dietary Preference</span>
            </label>
            <select
              value={dietaryFilter}
              onChange={(e) => setDietaryFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-xs font-bold text-palette-eggplant focus:outline-none focus:border-palette-shamrock cursor-pointer transition-all hover:bg-white"
            >
              <option value="all">All Dietary Types</option>
              <option value="veg">Pure Veg 🌱</option>
              <option value="non-veg">Royal Non-Veg 🍗</option>
              <option value="special">Chef Specials 👑</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-palette-eggplant/70 mb-1 flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3 text-palette-shamrock" />
              <span>Sort By</span>
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-palette-lace border border-palette-laceBorder rounded-xl text-xs font-bold text-palette-eggplant focus:outline-none focus:border-palette-shamrock cursor-pointer transition-all hover:bg-white"
            >
              <option value="featured">Featured (Default)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated ⭐</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

        </div>

        {/* Active Filters Summary & Reset Button */}
        <div className="pt-2 border-t border-palette-laceBorder flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-extrabold text-[11px] text-palette-eggplant/70 uppercase tracking-wider">
              Dishes Found: <span className="text-palette-shamrock font-black text-sm">{sortedDishes.length}</span>
            </span>

            {/* Active Chips */}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-palette-shamrock/15 text-palette-shamrockDark font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                Category: {MENU_CATEGORIES.find(c => c.id === selectedCategory)?.label}
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setSelectedCategory('all')} />
              </span>
            )}

            {dietaryFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-palette-lilac/30 text-palette-eggplant font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                Diet: {dietaryFilter === 'veg' ? 'Pure Veg 🌱' : dietaryFilter === 'non-veg' ? 'Royal Non-Veg 🍗' : 'Chef Specials 👑'}
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setDietaryFilter('all')} />
              </span>
            )}

            {sortBy !== 'featured' && (
              <span className="inline-flex items-center gap-1 bg-palette-eggplant/10 text-palette-eggplant font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                Sorted: {sortBy === 'price-low' ? 'Price Low-High' : sortBy === 'price-high' ? 'Price High-Low' : sortBy === 'rating' ? 'Highest Rated' : 'A-Z'}
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setSortBy('featured')} />
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[11px] font-extrabold text-palette-eggplant/70 hover:text-palette-eggplant hover:underline cursor-pointer ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

      </div>

      {/* Dish Catalog Grid */}
      {sortedDishes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-palette-laceBorder space-y-3 shadow-lilac-sm">
          <Utensils className="w-12 h-12 text-palette-eggplant/40 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-palette-eggplant">No Dishes Found</h3>
          <p className="text-xs text-palette-eggplant/70">Try adjusting your filter or search criteria.</p>
          <button
            onClick={handleResetFilters}
            className="mt-2 px-4 py-2 bg-palette-shamrock text-white text-xs font-bold rounded-xl shadow-sm hover:bg-palette-shamrockDark transition-all"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sortedDishes.map((dish) => (
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div onClick={() => setSelectedDishModal(null)} className="fixed inset-0 bg-palette-eggplant/80 backdrop-blur-md" />
          <div className="relative w-full max-w-md sm:max-w-lg max-h-[85vh] sm:max-h-[90vh] bg-white text-palette-eggplant rounded-3xl border border-palette-laceBorder shadow-2xl overflow-y-auto z-10 animate-scaleUp flex flex-col my-auto">
            
            {/* Top Close Button (Always visible on mobile & desktop) */}
            <button
              onClick={() => setSelectedDishModal(null)}
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-palette-eggplant/90 text-white hover:bg-palette-eggplant shadow-xl border border-white/40 backdrop-blur-md transition-transform active:scale-95 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Dish Image Banner */}
            <div className="relative h-40 sm:h-52 w-full shrink-0 overflow-hidden rounded-t-3xl">
              <img
                src={selectedDishModal.image}
                alt={selectedDishModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-palette-eggplant/70 via-transparent to-transparent" />
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-palette-eggplant leading-snug">{selectedDishModal.name}</h3>
                  <p className="text-xs text-palette-shamrock font-bold mt-0.5">
                    {selectedDishModal.dietary === 'veg' ? 'Pure Vegetarian Delicacy' : 'Royal Non-Vegetarian Special'}
                  </p>
                </div>
                <span className="font-sans text-xl sm:text-2xl font-extrabold text-palette-eggplant shrink-0">
                  ₹{selectedDishModal.price} <span className="text-xs font-semibold text-palette-eggplant/70">/ portion</span>
                </span>
              </div>

              <p className="text-palette-eggplant/80 text-xs sm:text-sm leading-relaxed">
                {selectedDishModal.description}
              </p>

              {/* Tag Chips */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
                {selectedDishModal.tags.map(tag => (
                  <span key={tag} className="bg-palette-lilac/30 text-palette-eggplant px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] font-bold border border-palette-lilac/50">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2 sm:pt-3">
                <button
                  onClick={() => {
                    setSelectedDishModal(null);
                    onOpenBooking();
                  }}
                  className="w-full py-3 bg-palette-shamrock hover:bg-palette-shamrockDark text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md hover:scale-[1.01] active:scale-95 transition-all"
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
