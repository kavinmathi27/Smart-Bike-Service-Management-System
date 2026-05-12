const express = require('express');
const router = express.Router();
const SparePart = require('../models/SparePart');
const auth = require('../../middleware/auth');

// Get all spare parts
router.get('/', async (req, res) => {
  try {
    const { brand, model } = req.query;
    const filter = {};
    if (brand) filter.brand = brand;
    if (model) filter.model = model;
    
    const parts = await SparePart.find(filter);
    res.json(parts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific spare part by ID
router.get('/:id', async (req, res) => {
  try {
    const part = await SparePart.findById(req.params.id);
    if (!part) return res.status(404).json({ message: 'Spare part not found' });
    res.json(part);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new spare part (Admin usually)
router.post('/', auth, async (req, res) => {
  try {
    // In a real app, you might check if user is admin here
    const part = new SparePart(req.body);
    await part.save();
    res.status(201).json(part);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
