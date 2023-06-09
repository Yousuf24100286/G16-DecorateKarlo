const Sequelize = require('sequelize');
const logger = require('../utils/logger');
const sequelize = new Sequelize(process.env.DEV_PGDATABASE_URL);
const Products = require('../database/models/product')(sequelize, Sequelize.DataTypes)
const ProductVariant = require('../database/models/product_variant')(sequelize, Sequelize.DataTypes)
const ProductImages = require('../database/models/product_images')(sequelize, Sequelize.DataTypes)
const ProductReview = require('../database/models/review')(sequelize, Sequelize.DataTypes)
const Users = require('../database/models/users')(sequelize, Sequelize.DataTypes)

//const uploadImage = require('../utils/googleStorage');

const { ErrorHandler } = require('../middlewares/errorHandler');

class ProductService {
  constructor() {
    Products.sync()
    ProductVariant.sync()
    ProductImages.sync()
    ProductReview.sync()
    Users.sync()
    Products.hasMany(ProductVariant, {foreignKey: 'product_id'})
    ProductVariant.belongsTo(Products, {foreignKey: 'product_id'})
    Products.hasMany(ProductImages, {foreignKey: 'product_id'})
    ProductImages.belongsTo(Products, {foreignKey: 'product_id'})
    Products.hasMany(ProductReview, {foreignKey: 'product_id'})
    ProductReview.belongsTo(Products, {foreignKey: 'product_id'})
    Users.hasMany(ProductReview, {foreignKey: 'user_id'})
    ProductReview.belongsTo(Users, {foreignKey: 'user_id'})
  }


  async getProductByID(id) {
    try {
      logger.info('Service: Product - Call: getProductByID')
      const product = await Products.findOne({
        where: {
          id: id
        },
        include: [
          {
            model: ProductVariant
          },
          {
            model: ProductImages
          }
        ]
      })
      return product;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async getAllProducts() {
    try {
      logger.info('Service: Product - Call: getAllProducts')
      // get all products with their main image urls from product image model
      const products = await Products.findAll({
        include: [
          {
            model: ProductImages,
            where: {
              main_image: true
            }
          }
        ]
      })
      return products;


      //const products = await Products.findAll()
      //return products;
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

  async addProductReview(product_id, user_id, review, rating) {
    try {
      logger.info('Service: Product - Call: addProductReview')
      const productReview = await ProductReview.create({
        product_id: product_id,
        comment: review,
        user_id: user_id,
        rating: rating
      })
      return productReview;
    } catch(error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }


  async getProductReviews(product_id) {
    try {
      logger.info('Service: Product - Call: getProductReviews')
      const productReviews = await ProductReview.findAll({
        where: {
          product_id: product_id
        },
        include: [
          {
            model: Users,
            attributes: ['id', 'first_name', 'last_name']
          }
        ]
      })
      return productReviews;
    } catch(error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

}


module.exports = new ProductService();
