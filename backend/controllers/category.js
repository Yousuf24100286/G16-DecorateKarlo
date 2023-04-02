const logger = require('../utils/logger')
const categoryService = require('../services/category')

const getCategoryByID = async (req, res, next) => {
  logger.info('Controller: Category - Call: getCategoryByID')
  const category = await categoryService.getCategoryByID(req.params.id)
  res.status(200).json(category)
}

const getAllCategories = async (req, res, next) => {
  logger.info('Controller: Category - Call: getAllCategories')
  const categories = await categoryService.getAllCategories()
  res.status(200).json(categories)
}

const createCategory = async (req, res) => {
  logger.info('Controller: Category - Call: createCategory')
  const category = await categoryService.createCategory(req.body.name , req.body.description)
  res.status(201).json(category)
}

module.exports = {
  getCategoryByID,
  getAllCategories,
  createCategory
}
