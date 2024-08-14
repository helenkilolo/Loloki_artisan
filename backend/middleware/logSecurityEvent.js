// /middleware/logSecurityEvent.js
import SecurityLog from '../models/securityLogModel.js';

export const logSecurityEvent = async (action, userId) => {
  await SecurityLog.create({ action, user: userId });
};
