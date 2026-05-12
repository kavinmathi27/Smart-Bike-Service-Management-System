const mongoose = require('mongoose');
require('dotenv').config();
const SparePart = require('./spare-parts/models/SparePart');

const sampleParts = [
  {
    name: "Full Synthetic Engine Oil 10W-40",
    brand: "Honda",
    model: "Activa 6G",
    price: 850,
    description: "Premium synthetic oil designed for high-performance scooter engines. Provides excellent lubrication and cooling.",
    imageUrl: "http://localhost:5173/parts/oil.png",
    stock: 50
  },
  {
    name: "Ceramic Disc Brake Pads",
    brand: "Yamaha",
    model: "R15 V4",
    price: 1200,
    description: "High-friction ceramic brake pads for superior stopping power and low noise. Long-lasting performance.",
    imageUrl: "http://localhost:5173/parts/brakes.png",
    stock: 30
  },
  {
    name: "Gold Series Chain & Sprocket Kit",
    brand: "Royal Enfield",
    model: "Classic 350",
    price: 3500,
    description: "Heavy-duty O-ring gold chain and high-strength steel sprockets. Designed for durability and smooth power delivery.",
    imageUrl: "http://localhost:5173/parts/chain.png",
    stock: 15
  },
  {
    name: "LED Headlight Bulb H4",
    brand: "TVS",
    model: "Apache RTR 160",
    price: 1500,
    description: "Bright white LED headlight with 6000K color temperature. Plug and play installation.",
    imageUrl: "https://images.unsplash.com/photo-1599256621730-535171e28e50?auto=format&fit=crop&q=80&w=400", // Fallback URL
    stock: 25
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await SparePart.deleteMany({});
    console.log('Cleared existing parts');
    
    await SparePart.insertMany(sampleParts);
    console.log('Sample parts inserted successfully');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
