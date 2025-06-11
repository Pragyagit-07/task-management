// index.js 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
 
 //const dotenv = require('dotenv');
require('dotenv').config(); // load .env variables
const app = express();



// Allow frontend to access backend APIs with credentials 
const allowedOrigins = [
  'http://localhost:3000',
  'https://task-management-zf2n.vercel.app',

];




const corsOptions = {
  origin: function (origin, callback) {
     console.log('Origin:', origin);
      if (!origin || allowedOrigins.includes(origin)) {
     return callback(null, true);
    } 
      console.log('Blocked origin:', origin);
     return callback(null, false);
    },
  credentials: true,
  methods: ['GET', 'POST',  'PUT','PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
   optionsSuccessStatus: 200 
};
app.use(cors(corsOptions)); // Apply CORS middleware globally 
app.use(express.json());
// Log origin for debugging
app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin);
  next();
});
//  Basic Route (to check if server is working)
app.get('/', (req, res) => {
  res.send('API is live ');
});
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
