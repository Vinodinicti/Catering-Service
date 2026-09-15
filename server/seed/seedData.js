import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from '../models/MenuItem.js';
import Package from '../models/Package.js';

dotenv.config();

const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/royal_table_catering';

const sampleSouthMenu = [
  {
    name: "Chettinad Mushroom Chukka",
    category: "appetizers",
    price: 360,
    dietary: "veg",
    spicyLevel: 2,
    isChefSpecial: true,
    rating: 4.9,
    description: "Button mushrooms sautéed in hand-ground Chettinad spices, curry leaves, crushed black pepper, and toasted coconut flakes.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600",
    tags: ["Chettinad", "Spicy", "Tamil Nadu"]
  },
  {
    name: "Chettinad Kozhi Pepper Fry",
    category: "appetizers",
    price: 480,
    dietary: "non-veg",
    spicyLevel: 3,
    isChefSpecial: true,
    rating: 4.9,
    description: "Tender chicken pieces tossed with freshly roasted coriander seeds, black pepper, fennel, and shallots.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=600",
    tags: ["Chettinad", "Fiery", "Popular"]
  },
  {
    name: "Malabar Paragon Mutton Dum Biryani",
    category: "mains-nonveg",
    price: 680,
    dietary: "non-veg",
    spicyLevel: 2,
    isChefSpecial: true,
    rating: 5.0,
    description: "Fragrant short-grain Kaima rice cooked with succulent Malabar mutton, fried shallots, cashew, and raisins.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600",
    tags: ["Malabar", "Kaima Rice", "Imperial"]
  }
];

const samplePackages = [
  {
    packageId: "pkg-silver",
    name: "Dakshin Silver Crown",
    tagline: "Ideal for traditional tiffin functions & intimate housewarmings",
    pricePerGuest: 699,
    minGuests: 30,
    popular: false,
    badge: "Budget Traditional",
    includes: ["2 Welcome Coolers", "3 South Appetizers", "4 Main Curries", "Appam & Parotta", "2 Desserts"]
  },
  {
    packageId: "pkg-gold",
    name: "Gold Regal Dakshin Feast",
    tagline: "Perfect for engagement galas & wedding celebrations",
    pricePerGuest: 1199,
    minGuests: 50,
    popular: true,
    badge: "Most Popular",
    includes: ["3 Welcome Drinks", "5 Gourmet Starters", "1 Live Counter", "6 South Mains", "3 Desserts"]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(connStr);
    console.log("Connected to MongoDB for Seeding...");

    await MenuItem.deleteMany({});
    await Package.deleteMany({});
    
    await MenuItem.insertMany(sampleSouthMenu);
    await Package.insertMany(samplePackages);

    console.log("Database Seeded Successfully with South Indian Menu!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

seedDB();
