const mongoose = require('mongoose');
require('dotenv').config();

async function clearBikes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const res = await mongoose.connection.collection('bikes').deleteMany({});
    console.log(`Deleted ${res.deletedCount} bikes`);
    
    const res2 = await mongoose.connection.collection('bookings').deleteMany({});
    console.log(`Deleted ${res2.deletedCount} bookings`);
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

clearBikes();
