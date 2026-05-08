const Part = require('../models/Part.model');

// GET all parts
const getAllParts = async (req, res) => {
  try {
    const { category, bike } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (bike) filter.compatibility = bike;
    const parts = await Part.find(filter);
    res.json(parts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single part
const getPartById = async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) return res.status(404).json({ message: 'Part not found' });
    res.json(part);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create part
const createPart = async (req, res) => {
  try {
    const part = await Part.create(req.body);
    res.status(201).json(part);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update part
const updatePart = async (req, res) => {
  try {
    const part = await Part.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!part) return res.status(404).json({ message: 'Part not found' });
    res.json(part);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE part
const deletePart = async (req, res) => {
  try {
    const part = await Part.findByIdAndDelete(req.params.id);
    if (!part) return res.status(404).json({ message: 'Part not found' });
    res.json({ message: 'Part removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET cost estimate
const estimateCost = async (req, res) => {
  try {
    const ids = req.query.ids.split(',');
    const parts = await Part.find({ _id: { $in: ids } });
    const total = parts.reduce((sum, p) => sum + p.price, 0);
    res.json({ parts, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllParts, getPartById, createPart, updatePart, deletePart, estimateCost };