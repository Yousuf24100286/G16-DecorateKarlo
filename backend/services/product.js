const Sequelize = require('sequelize');
const logger = require('../utils/logger');
const sequelize = new Sequelize(process.env.DEV_PGDATABASE_URL);
const Products = require('../database/models/products')(sequelize, Sequelize.DataTypes)

class ProductService {
  async getProductByID(id) {
    try {
      logger.info('Service: Product - Call: getProductByID')
      const product = await Products.findOne({
        where: {
          id: id
        }
      })
      return product;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async getAllProducts() {
    try {
      logger.info('Service: Product - Call: getAllProducts')
      const products = await Products.findAll()
      return products;
    } catch(error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  async getAllProductsByCategory(category) {
    try {
      logger.info('Service: Product - Call: getAllProductsByCategory')
      const products = await Products.findAll({
        where: {
          category: category
        }
      })
      return products;
    } catch(error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

}


module.exports = new ProductService();