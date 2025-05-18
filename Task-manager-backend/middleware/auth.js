const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get the token from headers
 console.log('Authorization Header:', req.headers.authorization);
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     console.log('Decoded JWT:', decoded); 
    req.userId = decoded.userId;  // Attach the userId to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
       