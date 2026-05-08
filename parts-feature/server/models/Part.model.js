const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  category:      { type: String, required: true },  // Engine, Brakes, Electricals
  price:         { type: Number, required: true },
  compatibility: [String],                           // ["Honda Activa", "Royal Enfield"]
  stock:         { type: Number, default: 0 },
  imageUrl:      { type: String, default: '' },
  description:   { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Part', partSchema);