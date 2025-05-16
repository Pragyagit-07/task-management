// index.js 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config(); // load .env variables
const app = express();
// Middleware



// Allow frontend to access backend APIs with credentials 
const allowedOrigins = [
  'http://localhost:3000',
  'https://task-management-orcin-one.vercel.app'
];
app.use(cors({
  origin: allowedOrigins,  // your frontend origin
  credentials: true,
}));
app.use(express.json());
//Import routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); 
app.use('/api/users', userRoutes);


 
// MongoDB Connection (for Task Management System DB)
console.log('Loaded MONGO_URI:', process.env.MONGO_URI);
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected to Task Management System DB successfully'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
