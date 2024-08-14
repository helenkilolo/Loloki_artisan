import mongoose from 'mongoose';

const taxSchema = new mongoose.Schema({
  country: { type: String, required: true },
  rate: { type: Number, required: true },
  applicableFrom: { type: Date, required: true },
});

export default mongoose.model('Tax', taxSchema);
