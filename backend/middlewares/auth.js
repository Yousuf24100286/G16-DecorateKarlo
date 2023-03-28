// import necessary modules for authentication middleware
const jwt = require('jsonwebtoken');
const User = require('../database/models/users');


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).send("Token Does Not Exist") ;

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Token is Invalid");
    req.user = user;
    next();
  });
}