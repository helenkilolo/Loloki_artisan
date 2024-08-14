// /routes/adminCategoryRoutes.js
import express from 'express';
import Category from '../models/categoryModel.js';
import { adminProtect } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Create a new category
router.post('/categories', adminProtect, async (req, res) => {
  const { name, subcategories } = req.body;

  try {
    const category = new Category({ name, subcategories });
    await category.save();
    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an existing category
router.put('/categories/:id', adminProtect, async (req, res) => {
  const { id } = req.params;
  const { name, subcategories } = req.body;

  try {
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    category.name = name;
    category.subcategories = subcategories;
    await category.save();
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all categories
router.get('/categories', adminProtect, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a category
router.delete('/categories/:id', adminProtect, async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
