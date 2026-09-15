import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingRef: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    eventType: { type: String, required: true },
    eventDate: { type: String },
    guestCount: { type: Number, required: true },
    packageId: { type: String },
    packageName: { type: String },
    mealType: { type: String },
    estimatedCost: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    address: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
