const Sequelize = require('sequelize');
const logger = require('../utils/logger');
const sequelize = new Sequelize(process.env.DEV_PGDATABASE_URL);
const Products = require('../database/models/product')(sequelize, Sequelize.DataTypes)
const ProductVariant = require('../database/models/product_variant')(sequelize, Sequelize.DataTypes)
const ProductImages = require('../database/models/product_images')(sequelize, Sequelize.DataTypes)
const uploadImage = require('../utils/googleStorage');

const { ErrorHandler } = require('../middlewares/errorHandler');

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
          category_id: category
        }
      })
      return products;
    } catch(error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async createProduct(name, description, category, variant, levels ) {
    try {


      logger.info('Service: Product - Call: createProduct')
      console.log(name, description, category, variant, levels)
      
      const product = await Products.create({
        product_name: name,
        product_description: description,
        category_id: category,
      })


      for(var i = 0; i < levels.length; i++){
        const productVariant = await ProductVariant.create({
          product_id: product.id,
          variant_attribute: variant,
          variant_level: levels[i].name,
          variant_price: levels[i].price,
          variant_quantity: levels[i].quantity,
        })
      }
      
      return product;
    } catch(error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

}


module.exports = new ProductService();