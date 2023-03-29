const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router.post('/:id',user.getUserByID);
router.post('/update/email/:id', user.updateEmail);
router.post('/update/username/:id', user.updateUsername);
router.post('/update/first_name/:id', user.updateFirstName);
router.post('/update/last_name/:id', user.updateLastName);
router.post('/update/telephone/:id', user.updateTelephone);
router.post('/update/password/:id', user.updatePassword);


module.exports = router;