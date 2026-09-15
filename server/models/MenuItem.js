import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    dietary: { type: String, enum: ['veg', 'non-veg'], required: true },
    spicyLevel: { type: Number, default: 1 },
    isChefSpecial: { type: Boolean, default: false },
    rating: { type: Number, default: 4.8 },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model('MenuItem', menuItemSchema);
