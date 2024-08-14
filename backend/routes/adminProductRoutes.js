// /routes/adminProductRoutes.js
import express from 'express';
import Product from '../models/productModel.js';
import { adminProtect } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Create a new product
router.post('/products', adminProtect, async (req, res) => {
  const { name, price, category, description, stock } = req.body;

  try {
    const product = new Product({ name, price, category, description, stock });
    await product.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit an existing product
router.put('/products/:id', adminProtect, async (req, res) => {
  const { id } = req.params;
  const { name, price, category, description, stock } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.name = name;
    product.price = price;
    product.category = category;
    product.description = description;
    product.stock = stock;
    await product.save();
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a product
router.delete('/products/:id', adminProtect, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.remove();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product stock
router.put('/products/:id/stock', adminProtect, async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.stock = stock;
    await product.save();
    res.status(200).json({ message: 'Stock updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

