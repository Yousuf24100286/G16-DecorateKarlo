const logger = require('../utils/logger')
const cartService = require('../services/cart')

const getCartByID = async (req, res, id, next) => {
  logger.info('Controller: Cart - Call: getCartByID')
  const cart = await cartService.getCartByID(id)
  res.status(200).json(cart)
}
const addProductToCart = async (req, res, id, next) => {
  logger.info('Controller: Cart - Call: addProductToCart')
  const cartItem = await cartService.addProductToCart(id, req.body.product_id, req.body.quantity)
  res.status(200).json(cartItem)
}
const removeProductFromCart = async (req, res, id, next) => {
  logger.info('Controller: Cart - Call: removeProductFromCart')
  const cartItem = await cartService.removeProductFromCart(id, req.body.product_id)
  res.status(200).json(cartItem)
}
const updateProductQuantity = async (req, res, id, next) => {
  logger.info('Controller: Cart - Call: updateProductQuantity')
  const cartItem = await cartService.updateProductQuantity(id, req.body.product_id, req.body.quantity)
  res.status(200).json(cartItem)
}
const getCartItems = async (req, res, id, next) => {
  logger.info('Controller: Cart - Call: getCartItems')
  const cartItems = await cartService.getCartItems(id)
  res.status(200).json(cartItems)
}
const getCartTotal = async (req, res, id, next) => {
  logger.info('Controller: Cart - Call: getCartTotal')
  const cartTotal = await cartService.getCartTotal(id)
  res.status(200).json(cartTotal)
}
const emptyCart = async (req, res, id, next) => {
  logger.info('Controller: Cart - Call: emptyCart')
  const cart = await cartService.emptyCart(id)
  res.status(200).json(cart)
}
const createCartOfUser = async (req, res, id, next) => {
  logger.info('Controller: Cart - Call: createCartOfUser')
  const cart = await cartService.createCartOfUser(id)
  res.status(200).json(cart)
}

module.exports = {
  getCartByID,
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
  getCartItems,
  getCartTotal,
  emptyCart,
  createCartOfUser
}