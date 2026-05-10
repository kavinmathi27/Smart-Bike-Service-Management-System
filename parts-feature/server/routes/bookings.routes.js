const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings } = require('../controllers/bookings.controller');

router.post('/', createBooking);
router.get('/', getAllBookings);

module.exports = router;
