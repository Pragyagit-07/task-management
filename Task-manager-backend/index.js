// index.js 
const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
 const dotenv = require('dotenv');
require('dotenv').config(); // load .env variables
const app = express();
// Middleware



// Allow frontend to access backend APIs with credentials 
const allowedOrigins = [
  'http://localhost:3000',
  'https://task-management-zf2n.vercel.app',

];
// CORS middleware (manual)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Preflight success
  }

  next();
});


// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// };
// app.use(cors(corsOptions)); // Apply CORS middleware globally 


  

app.use(express.json());
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
