import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    packageId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    pricePerGuest: { type: Number, required: true },
    minGuests: { type: Number, default: 30 },
    popular: { type: Boolean, default: false },
    badge: { type: String },
    includes: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model('Package', packageSchema);
