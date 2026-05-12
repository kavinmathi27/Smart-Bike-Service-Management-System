const mongoose = require('mongoose');

const sparePartBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  partId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SparePart',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    street: String,
    city: String,
    zipCode: String,
    phone: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  }
}, { timestamps: true });

module.exports = mongoose.model('SparePartBooking', sparePartBookingSchema);
