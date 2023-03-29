const router = require('express').Router();
const productController = require('../controllers/product');

router.post('/:id', productController.getProductByID);
router.get('/', productController.getAllProducts);
router.get('/:category', productController.getAllProductsByCategory);


module.exports = router;