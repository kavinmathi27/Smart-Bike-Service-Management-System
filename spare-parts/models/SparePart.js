const mongoose = require('mongoose');

const sparePartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model('SparePart', sparePartSchema);
