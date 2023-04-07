const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');

router.post('/signup', auth.createUser);
router.post('/signin', auth.loginUser);
router.post('/update', auth.updateUser);
router.post('/updatePassword', auth.updatePassword);
//router.post('/delete', auth.deleteUser);


module.exports = router;