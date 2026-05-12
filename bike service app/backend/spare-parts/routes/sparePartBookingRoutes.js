const express = require('express');
const router = express.Router();
const SparePartBooking = require('../models/SparePartBooking');
const auth = require('../../middleware/auth');

// Create a new spare part booking
router.post('/', auth, async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      userId: req.user.id // from auth middleware
    };
    const booking = new SparePartBooking(bookingData);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all bookings for the logged-in user
router.get('/user', auth, async (req, res) => {
  try {
    const bookings = await SparePartBooking.find({ userId: req.user.id })
      .populate('partId')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings (Admin)
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await SparePartBooking.find()
      .populate('userId', 'name email')
      .populate('partId')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status (Admin)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const booking = await SparePartBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('userId', 'name email').populate('partId');
    
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
