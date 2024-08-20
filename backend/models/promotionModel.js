// /backend/models/promotionModel.js
import mongoose from 'mongoose';

const promotionSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  active: { type: Boolean, default: true },
});

const Promotion = mongoose.model('Promotion', promotionSchema);
export default Promotion;

