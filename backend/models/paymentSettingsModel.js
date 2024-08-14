// /models/paymentSettingsModel.js
import mongoose from 'mongoose';

const paymentSettingsSchema = new mongoose.Schema({
  gateway: { type: String, required: true },
  apiKey: { type: String, required: true },
  active: { type: Boolean, default: true },
});

export default mongoose.model('PaymentSettings', paymentSettingsSchema);
