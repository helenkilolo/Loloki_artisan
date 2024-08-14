import express from 'express';
import Product from '../models/productModel.js';
import { adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new product
router.post('/', adminProtect, async (req, res) => {
  const { name, price, description, image } = req.body;
  try {
    const product = await Product.create({ name, price, description, image });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Read all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a product
router.put('/:id', adminProtect, async (req, res) => {
  const { name, price, description, image } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { name, price, description, image }, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a product
router.delete('/:id', adminProtect, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
