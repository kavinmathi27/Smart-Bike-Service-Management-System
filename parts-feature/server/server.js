const express = require('express');
const dotenv  = require('dotenv');
const cors    = require('cors');

dotenv.config({ path: '../.env' });   // ← fix here

const connectDB    = require('./config/db');
const partsRoutes  = require('./routes/parts.routes');
const errorHandler = require('./middleware/errorHandler');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/parts', partsRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));