const router = require('express').Router();
const cartController = require('../controllers/cart');

router.get('/:id', cartController.getCartByID);
router.post('/add/:id', cartController.addProductToCart);
router.delete('/remove/:id', cartController.removeProductFromCart);
router.put('/update/:id', cartController.updateProductQuantity);
router.get('/items/:id', cartController.getCartItems);
router.get('/total/:id', cartController.getCartTotal);
router.delete('/empty/:id', cartController.emptyCart);
router.post('/create/:id', cartController.createCartOfUser);

module.exports = router;