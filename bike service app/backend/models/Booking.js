const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bikeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bike',
    required: true,
  },
  serviceType: {
    type: String,
    enum: ['Emergency', 'General', 'Specific Repair'],
    required: true,
  },
  serviceDetails: {
    type: Object,
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  cost: {
    type: Number,
    required: true,
  },
  technician: {
    type: Object,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
