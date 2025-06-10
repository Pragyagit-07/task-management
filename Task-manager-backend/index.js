// index.js 
const express = require('express');
const mongoose = require('mongoose');
 const cors = require('cors');
 const dotenv = require('dotenv');
require('dotenv').config(); // load .env variables
const app = express();

app.use((req, res, next) => {
  console.log('Origin:', req.headers.origin); // Logs the origin of the request
  next();
});



// Allow frontend to access backend APIs with credentials 
const allowedOrigins = [
  'http://localhost:3000',
  'https://task-management-zf2n.vercel.app',

];



const corsOptions = {
  origin: function (origin, callback) {
     console.log('Origin:', origin);
      if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  
    


    // if (!origin || allowedOrigins.includes(origin)) {
    //   callback(null, true);
    // } else {
      
    //   console.log(' Blocked origin:', origin);
    //   callback(new Error('Not allowed by CORS'));
    // }
  },
  credentials: true,
  methods: ['GET', 'POST',  'PUT','PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  
};
app.use(cors(corsOptions)); // Apply CORS middleware globally 
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(200);
  }
  next();
});
// app.options('*', cors(corsOptions));
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
