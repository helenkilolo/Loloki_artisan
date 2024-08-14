// /models/taxSettingsModel.js
import mongoose from 'mongoose';

const taxSettingsSchema = new mongoose.Schema({
  country: { type: String, required: true },
  taxRate: { type: Number, required: true },
  active: { type: Boolean, default: true },
});

export default mongoose.model('TaxSettings', taxSettingsSchema);
