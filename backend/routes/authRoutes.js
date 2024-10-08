// /routes/authRoutes.js
import express from 'express';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  const { firstName, surname, email, password, phoneNumber, country } = req.body;

  console.log("Received registration data:", { firstName, surname, email, password, phoneNumber, country });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ firstName, surname, email, password, phoneNumber, country });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log("User created successfully:", user);
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.banned) {
      return res.status(403).json({ message: 'User is banned.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user: { firstName: user.firstName, surname: user.surname, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
  
});

// Logout route
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out' });
});

router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Forgot Password route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send the reset token via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      http://${req.headers.host}/reset-password/${resetToken}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset Password route
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }

    user.password = password;

    // Ensure that token and expiry are only cleared if the user is found
    if (user.resetPasswordToken && user.resetPasswordExpires) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
    }

    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', protect, async (req, res) => {
  const { firstName, surname, email, password } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.firstName = firstName || user.firstName;
      user.surname = surname || user.surname;
      user.email = email || user.email;

      if (password) {
        user.password = password;
      }

      const updatedUser = await user.save();
      res.json({
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        surname: updatedUser.surname,
        email: updatedUser.email,
        token: jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' }),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Email verification route
router.get('/verify-email/:token', async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;


