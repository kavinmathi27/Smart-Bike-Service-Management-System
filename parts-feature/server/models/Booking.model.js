const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName:  { type: String, required: true },
  phone:         { type: String, required: true },
  bikeModel:     { type: String, required: true },
  serviceType:   { type: String, required: true, enum: ['General', 'Engine', 'Brakes', 'Full'] },
  preferredDate: { type: String, required: true },
  notes:         { type: String, default: '' },
  status:        { type: String, default: 'Pending', enum: ['Pending', 'Confirmed', 'Completed'] }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
