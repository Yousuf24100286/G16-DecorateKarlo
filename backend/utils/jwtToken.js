// create utility functions for json web token creation and authentications
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../middlewares/errorHandler').ErrorHandler;

// write a function to create json web token for 3 hrs for user sign in data that is email username and password
function createToken(data) {
  try {
    return jwt.sign(
      data,
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
}

// write a function to authenticate given token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}


module.exports = { createToken, authenticateToken };