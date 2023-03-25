const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/models/users')

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/signup', (req, res) => {
  console.log(req.body);  
});


// @route   POST api/users/login
// @desc    Login user and return JWT token
// @access  Public
router.post('/signin', (req, res) => {
  console.log(req.body);
  
});


// export router
module.exports = router;