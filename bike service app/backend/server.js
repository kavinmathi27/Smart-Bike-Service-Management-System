const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
const sparePartRoutes = require('./spare-parts/routes/sparePartRoutes');
const sparePartBookingRoutes = require('./spare-parts/routes/sparePartBookingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/spare-parts', sparePartRoutes);
app.use('/api/spare-part-bookings', sparePartBookingRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.log('Ensure you have replaced <db_password> in the .env file with the actual password.');
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
