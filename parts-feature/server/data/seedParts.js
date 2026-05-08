const mongoose = require('mongoose');
const dotenv   = require('dotenv');
const Part     = require('../models/Part.model');
dotenv.config({ path: '../.env' });

const parts = [
  { name: 'Air Filter',     category: 'Engine',      price: 350,  compatibility: ['Honda Activa', 'Hero Splendor'], stock: 20 },
  { name: 'Brake Pad Set',  category: 'Brakes',      price: 550,  compatibility: ['Royal Enfield', 'Bajaj Pulsar'], stock: 15 },
  { name: 'Spark Plug',     category: 'Engine',      price: 180,  compatibility: ['Honda Activa', 'Bajaj Pulsar'],  stock: 50 },
  { name: 'Headlight Bulb', category: 'Electricals', price: 220,  compatibility: ['Hero Splendor', 'TVS Jupiter'],  stock: 30 },
  { name: 'Chain Kit',      category: 'Transmission',price: 1200, compatibility: ['Royal Enfield', 'Bajaj Pulsar'], stock: 10 },
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Part.deleteMany();
  await Part.insertMany(parts);
  console.log('Database seeded!');
  process.exit();
};

seed();