import mongoose from 'mongoose';

const securityLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ipAddress: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('SecurityLog', securityLogSchema);
