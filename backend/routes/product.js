const upload = require('../config/cloudinaryConfig')

const router = require('express').Router();
const productController = require('../controllers/product');

router.get('/id/:id', productController.getProductByID);
router.get('/', productController.getAllProducts);
router.get('/category/:category', productController.getAllProductsByCategory);
router.post('/add', productController.createProduct);
router.post('/images/add/:id' , upload.single('image') ,productController.uploadProductImage);


module.exports = router;