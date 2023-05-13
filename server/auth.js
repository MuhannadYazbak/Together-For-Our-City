const jwt = require('jsonwebtoken');
const User = require('./dataModels/userModel');
require('dotenv').config();

// const requireAuth = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "Missing token" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     console.log('User type:', req.user.userType);
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded = ', decoded);
    if (decoded.userType === 'Normal' || decoded.userType === 'Admin') {
      req.user = decoded;
      next();
    }
     else {
      res.status(402).json({ message: "Unauthorized Access!" });
    }
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};


const requireAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userType === "Admin") {
      req.user = decoded;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized Access!" });
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};


module.exports = { requireAuth, requireAdmin };


//  const requireAuth =  (req, res, next) => {
//   // Get the JWT token from the Authorization header
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   // If the token is not provided, return an error response
//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   // Verify the JWT token
//   jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
//     if (err) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     } else {
//       // Get the user ID from the decoded JWT token
//       const userId = decodedToken.sub;
//       console.log('userId', userId)

//       // Find the user in the database
//       const user = await User.findById(userId);

//       // If the user is not found, return an error response
//       if (!user) {
//         return res.status(401).json({ error: 'Unauthorized 3' });
//       }

//       // Set the user object on the request object for further use
//       req.user = user;// Call the next middleware function
//       next();
//     }
//   });
// };

// const checkRole = (requiredRole) => {
//   const user = localStorage.getItem('user');
//   return (req, res, next) => {
//     //console.log('CheckRole ', req);
//     if (user.userType === requiredRole) {
//       next();
//     } else {
//       res.status(401).json({ message: "Unauthorized" });
//     }
//   };
// };
