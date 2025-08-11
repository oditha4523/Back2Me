// 1. Import required packages
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

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

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// 7. Middleware
app.use(cors());              
app.use(express.json());      

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
