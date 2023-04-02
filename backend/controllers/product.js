const logger = require('../utils/logger')
const productService = require('../services/product')
const ProductImageService = require('../services/product_images')

const getProductByID = async (req, res, next) => {
  logger.info('Controller: Product - Call: getProductByID')
  const product = await productService.getProductByID(req.params.id)
  res.status(200).json(product)
}

const getAllProducts = async (req, res, next) => {
  logger.info('Controller: Product - Call: getAllProducts')
  const products = await productService.getAllProducts()
  res.status(200).json(products)
}

const getAllProductsByCategory = async (req, res, next) => {
  logger.info('Controller: Product - Call: getAllProductsByCategory')
  const products = await productService.getAllProductsByCategory(req.params.category)
  res.status(200).json(products)
}

const createProduct = async (req, res) => {
  logger.info('Controller: Product - Call: createProduct')
  const product = await productService.createProduct(
    req.body.name , req.body.description, req.body.category,
    req.body.variant, req.body.levels, req.body.images
  )
  res.status(201).json(product)
}

const uploadProductImage = async (req, res) => {
  logger.info('Controller: Product - Call: uploadProductImage')
  //console.log(req.body)
  console.log(req.files)
  const productImage = await ProductImageService.addProductImages(req.params.id, req.file.path)
  res.status(201).json(productImage)
}

module.exports = {
  getProductByID,
  getAllProducts,
  getAllProductsByCategory,
  createProduct,
  uploadProductImage
}