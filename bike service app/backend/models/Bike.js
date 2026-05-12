const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  cc: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Bike', bikeSchema);
