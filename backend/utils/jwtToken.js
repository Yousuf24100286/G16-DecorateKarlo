// create utility functions for json web token creation and authentications
import jwt from 'jsonwebtoken';

// write a function to create json web token for 3 hrs for user sign in data that is email username and password
function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '3h' }
  );
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