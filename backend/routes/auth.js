const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');

router.post('/signup', auth.createUser);
router.post('/signin', auth.loginUser);

module.exports = router;