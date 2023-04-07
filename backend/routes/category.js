const router = require('express').Router();
const categoryController = require('../controllers/category');

router.post('/id/:id', categoryController.getCategoryByID);
router.get('/all', categoryController.getAllCategories);
router.post('/add', categoryController.createCategory);

module.exports = router;