// /models/discountCodeModel.js
import mongoose from 'mongoose';

const discountCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  percentageOff: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('DiscountCode', discountCodeSchema);
