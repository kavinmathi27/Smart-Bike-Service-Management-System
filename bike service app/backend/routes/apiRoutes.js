const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Bike = require('../models/Bike');
const Booking = require('../models/Booking');

// Create a new bike
router.post('/bikes', async (req, res) => {
  try {
    const bike = new Bike(req.body);
    await bike.save();
    res.status(201).json(bike);
  } catch (error) {
    console.error('Error creating bike:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get a bike by ID
router.get('/bikes/:id', async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ message: 'Bike not found' });
    res.json(bike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a booking
router.post('/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get booking details
router.get('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('bikeId');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings for a specific bike
router.get('/bookings/bike/:bikeId', async (req, res) => {
  try {
    const { bikeId } = req.params;
    
    // Validate ObjectId to prevent CastError
    if (!mongoose.Types.ObjectId.isValid(bikeId)) {
      console.warn(`Invalid bikeId provided: ${bikeId}`);
      return res.status(400).json({ message: 'Invalid bike ID format' });
    }

    const bookings = await Booking.find({ bikeId })
      .populate('bikeId')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error(`Error fetching bookings for bike ${req.params.bikeId}:`, error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings (Admin)
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('bikeId')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status (Admin)
router.patch('/bookings/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: 'after' }
    ).populate('bikeId');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update technician details (Admin)
router.patch('/bookings/:id/technician', async (req, res) => {
  try {
    const { technician } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { technician },
      { returnDocument: 'after' }
    ).populate('bikeId');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
