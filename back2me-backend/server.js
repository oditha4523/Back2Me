// 1. Import required packages
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 2. Load environment variables from .env
dotenv.config();

// 3. Import database connection function
const connectDB = require('./config/db');

// 4. Import routes
const itemRoutes = require('./routes/itemRoutes');

// 5. Create the express app
const app = express();

// 6. Connect to MongoDB
connectDB();

// 7. Middleware
app.use(cors());              // Enables Cross-Origin requests
app.use(express.json());      // Parses JSON bodies from incoming requests

// 8. Mount routes
app.use('/api/items', itemRoutes); // All item-related routes will start with /api/items

// 9. Default route (optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 10. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
