// /routes/adminSessionRoutes.js
import express from 'express';
import { adminProtect } from '../middleware/adminMiddleware.js';
import session from 'express-session'; // Assuming you're using express-session

const router = express.Router();

// Get active sessions
router.get('/sessions', adminProtect, (req, res) => {
  // Assuming you store sessions in a DB and can query them
  res.json({ sessions: 'List active sessions here' });
});

// Terminate a session
router.delete('/sessions/:sessionId', adminProtect, (req, res) => {
  // Assuming you can delete a session by its ID
  req.sessionStore.destroy(req.params.sessionId, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to terminate session' });
    }
    res.json({ message: 'Session terminated' });
  });
});

export default router;
