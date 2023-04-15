const Sequelize = require('sequelize');
const logger = require('../utils/logger');
const sequelize = new Sequelize(process.env.DEV_PGDATABASE_URL);
const ProductImages = require('../database/models/product_images')(sequelize, Sequelize.DataTypes)
//const { uploadImage } = require('../utils/googleStorage');
const { ErrorHandler } = require('../middlewares/errorHandler');



class ProductImageService {
  async addProductImages(product_id, filePath) {
    try {
      logger.info('Service: Product - Call: addProductImages')

      console.log(product_id)
      logger.info('*********************************************************************************')

      //console.log(product_id, images)
      try {
        console.log('file upload here')        

        const productImages = await ProductImages.create({
          product_id: product_id,
          image_url: filePath,
          main_image: true
        })
        
        return productImages;

      } catch (error) {
        console.log(error)   
      }
      
      
    } catch(error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  
}


module.exports = new ProductImageService();
