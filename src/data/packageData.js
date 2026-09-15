export const CATERING_PACKAGES = [
  {
    id: "pkg-silver",
    name: "Dakshin Silver Crown",
    tagline: "Ideal for traditional tiffin functions, intimate housewarmings & birthdays",
    pricePerGuest: 450,
    originalPrice: 699,
    minGuests: 30,
    popular: false,
    color: "from-burgundy to-royal-dark",
    badge: "Budget Traditional",
    includes: [
      "2 Welcome Coolers (Nannari & Rose Milk)",
      "3 South Indian Appetizers (2 Veg + 1 Non-Veg)",
      "Traditional Banana Leaf / Buffet Service",
      "4 Main Course Curries (Sambar, Rasam, Avial, Chicken Chettinad)",
      "Malabar Parotta, Appam & Steamed Sona Masoori Rice",
      "2 Desserts (Elaneer Payasam & Mysore Pak)",
      "Uniformed Service Waitstaff & Setup"
    ]
  },
  {
    id: "pkg-gold",
    name: "Gold Regal Dakshin Feast",
    tagline: "Perfect for engagement galas, corporate meets & wedding celebrations",
    pricePerGuest: 750,
    originalPrice: 1199,
    minGuests: 50,
    popular: true,
    color: "from-royal-gold to-wine",
    badge: "Most Popular",
    includes: [
      "3 Welcome Signature Drinks (Filter Kaapi & Tender Coconut)",
      "5 Gourmet Starters (3 Veg + 2 Non-Veg)",
      "1 Live Counter (Live Mysuru Dosa Bar or Tandoor)",
      "6 South Indian Gourmet Mains (Malabar Mutton Biryani, Meen Curry)",
      "Coin Parottas, Appam, Curd Rice & Crispy Appalam",
      "3 Signature Desserts + Live Jigarthanda Counter",
      "Traditional Brass Davarah & Royal Banana Leaf Setup",
      "On-Site Culinary Captain & Butler Staff"
    ]
  },
  {
    id: "pkg-platinum",
    name: "Imperial Royal South Platinum",
    tagline: "The ultimate luxury grand wedding experience with live 5-State South Indian Counters",
    pricePerGuest: 1250,
    originalPrice: 1899,
    minGuests: 100,
    popular: false,
    color: "from-amber-600 via-royal-wine to-burgundy",
    badge: "Imperial Luxury",
    includes: [
      "Unlimited Artisanal South Indian Lounge & Tender Coconut Bar",
      "7 Executive Starters (Chettinad Pepper Fry, Anjal Fish, Podi Idli)",
      "3 Interactive Live Cooking Stations (Live Dosa, Live Appam, Live Grill)",
      "8 Grand Main Course Dishes (Karnataka, Kerala, Tamil, Andhra, Telangana)",
      "Malabar Paragon Mutton Biryani Live Handi Counter",
      "4 Royal Sweets + Elaneer Payasam & Belgian Chocolate Fountain",
      "Royal Brass & Gold-Plated Traditional Dinnerware",
      "Executive Master Chef On-Site + Dedicated Captain & Butler Service"
    ]
  }
];

export const LIVE_STATIONS = [
  {
    id: "ls-1",
    name: "Live Mysuru Dosa & Podi Tawa Bar",
    description: "Chef prepares crispy paper dosa, ghee podi dosa, and cheese onion dosa live to order.",
    image: "/images/dishes/dosa_bar.jpg",
    color: "border-amber-500"
  },
  {
    id: "ls-2",
    name: "Live Kerala Fluffy Appam & Stew Station",
    description: "Lacy coconut rim appams cooked live on traditional appam chatty with vegetable or chicken stew.",
    image: "/images/dishes/appam_stew.jpg",
    color: "border-red-500"
  },
  {
    id: "ls-3",
    name: "Chettinad Tawa Fish & Kebab Grill",
    description: "Sizzling Anjal fish fry, Kozhi chukka, and prawn roast cooked live over charcoal grill.",
    image: "/images/dishes/tawa_fish.jpg",
    color: "border-emerald-500"
  },
  {
    id: "ls-4",
    name: "Live Kumbakonam Kaapi & Jigarthanda Lounge",
    description: "Foamy authentic brass filter coffee and cooling Madurai Jigarthanda served live.",
    image: "/images/dishes/kaapi_lounge.jpg",
    color: "border-purple-500"
  }
];
