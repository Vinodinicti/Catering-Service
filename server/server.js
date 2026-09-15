import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import bookingRoutes from './routes/bookingRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import packageRoutes from './routes/packageRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// API Endpoints
app.use('/api/bookings', bookingRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/packages', packageRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'Royal Table Catering Backend API' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
