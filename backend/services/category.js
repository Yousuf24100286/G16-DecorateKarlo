const Sequelize = require('sequelize');
const logger = require('../utils/logger');
const sequelize = new Sequelize(process.env.DEV_PGDATABASE_URL);
const Category = require('../database/models/category')(sequelize, Sequelize.DataTypes)
const { ErrorHandler } = require('../middlewares/errorHandler');


class CategoryService {
  async getCategoryByID(id) {
    try {
      logger.info('Service: Category - Call: getCategoryByID')
      const category = await Category.findOne({
        where: {
          id: id
        }
      })
      return category;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async getAllCategories() {
    try {
      logger.info('Service: Category - Call: getAllCategories')
      const categories = await Category.findAll()
      return categories;
    } catch(error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }


  async createCategory(name, description) {
    try {
      logger.info('Service: Category - Call: addCategory')
      
      
      const category = await Category.create({
        category_name: name,
        category_description: description
      })
      return category;
    } catch(error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

}

module.exports = new CategoryService();