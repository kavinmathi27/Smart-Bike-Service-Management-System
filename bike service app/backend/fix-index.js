const mongoose = require('mongoose');
require('dotenv').config();

async function fixIndex() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const collection = mongoose.connection.collection('bikes');
    const indexes = await collection.indexes();
    console.log('Current indexes:', indexes);
    
    if (indexes.find(idx => idx.name === 'registration_number_1')) {
      await collection.dropIndex('registration_number_1');
      console.log('Dropped registration_number_1');
    } else {
      console.log('Index registration_number_1 not found');
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

fixIndex();
