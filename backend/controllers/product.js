const logger = require('../utils/logger')
const productService = require('../services/product')

const getProductByID = async (req, res, id, next) => {
  logger.info('Controller: Product - Call: getProductByID')
  const product = await productService.getProductByID(id)
  res.status(200).json(product)
}

const getAllProducts = async (req, res, next) => {
  logger.info('Controller: Product - Call: getAllProducts')
  const products = await productService.getAllProducts()
  res.status(200).json(products)
}

const getAllProductsByCategory = async (req, res, category, next) => {
  logger.info('Controller: Product - Call: getAllProductsByCategory')
  const products = await productService.getAllProductsByCategory(category)
  res.status(200).json(products)
}

module.exports = {
  getProductByID,
  getAllProducts,
  getAllProductsByCategory
}