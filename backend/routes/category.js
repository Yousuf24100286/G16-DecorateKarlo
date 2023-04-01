const router = require('express').Router();
const categoryController = require('../controllers/category');

router.post('/:id', categoryController.getCategoryByID);
router.get('/', categoryController.getAllCategories);
router.post('/add', categoryController.createCategory);

module.exports = router;