const router = require('express').Router();


router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/product', require('./product'));
router.use('/cart', require('./cart'));


module.exports = router;