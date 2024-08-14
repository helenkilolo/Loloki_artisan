// /server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminProductRoutes from './routes/adminProductRoutes.js';
import productRoutes from './routes/productRoutes.js';
import adminUserRoutes from './routes/adminUserRoutes.js';
import adminCategoryRoutes from './routes/adminCategoryRoutes.js';  // Import category routes
import adminAnalyticsRoutes from './routes/adminAnalyticsRoutes.js';
import adminOrderRoutes from './routes/adminOrderRoutes.js';
import adminReviewRoutes from './routes/adminReviewRoutes.js';
import adminPromotionRoutes from './routes/adminPromotionRoutes.js';
import adminSecurityRoutes from './routes/adminSecurityRoutes.js';
import taxSettingsRoutes from './routes/taxSettingsRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminProductRoutes);
app.use('/api/admin', adminUserRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminCategoryRoutes);
app.use('/api/admin', adminAnalyticsRoutes); 
app.use('/api/admin', adminOrderRoutes); 
app.use('/api/admin', adminReviewRoutes);
app.use('/api/admin/promotions', adminPromotionRoutes);
app.use('/api/admin/security-logs', adminSecurityRoutes);
app.use('/api/admin/tax-settings', taxSettingsRoutes);
app.use('/api/payments', paymentRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
