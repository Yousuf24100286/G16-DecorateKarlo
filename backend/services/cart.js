const Sequelize = require('sequelize');
const logger = require('../utils/logger');
const sequelize = new Sequelize(process.env.DEV_PGDATABASE_URL);
const Products = require('../database/models/product')(sequelize, Sequelize.DataTypes)
const ProductVariants = require('../database/models/product_variant')(sequelize, Sequelize.DataTypes)
const ProductImages = require('../database/models/product_images')(sequelize, Sequelize.DataTypes)
const Cart = require('../database/models/cart_session')(sequelize, Sequelize.DataTypes)
const CartItems = require('../database/models/cart_item')(sequelize, Sequelize.DataTypes)



const ErrorHandler = require('../middlewares/errorHandler').ErrorHandler;

class CartService {
  constructor() {
    Cart.sync();
    CartItems.sync();
    Products.sync();
    ProductVariants.sync();
    ProductImages.sync();
    Cart.hasMany(CartItems, { foreignKey: 'session_id' });
    CartItems.belongsTo(Cart, { foreignKey: 'session_id' });
    CartItems.belongsTo(ProductVariants, { foreignKey: 'product_variant_id' });
    ProductVariants.hasMany(CartItems, { foreignKey: 'product_variant_id' });
    Products.hasMany(ProductVariants, { foreignKey: 'product_id' });
    ProductVariants.belongsTo(Products, { foreignKey: 'product_id' });
    Products.hasMany(ProductImages, { foreignKey: 'product_id' });
    ProductImages.belongsTo(Products, { foreignKey: 'product_id' });
  }

  async getCartByID(id) {
    try {
      logger.info('Service: Cart - Call: getCartByID')
      const cart = await Cart.findOne({
        where: {
          id: id
        },
        include: [{
          model: CartItems,
          include: [{
            model: ProductVariants,
            include: [{
              model: Products,
              include: [{
                model: ProductImages,
                where: {
                  main_image: true
                }
              }]
            }]
          }]
        }]

      })
      return cart;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async addProductToCart(session_id, body) {
    const { product_id, variant_id, quantity, price } = body;
    try {
      logger.info('Service: Cart - Call: addProductToCart')
      const cart = await Cart.findOne({
        where: {
          id: session_id
        }
      })
      const product_variant = await ProductVariants.findOne({
        where: {
          id: variant_id
        }
      })
      const cartItem = await CartItems.create({
        session_id: cart.id,
        product_variant_id: product_variant.id,
        quantity: quantity
      })
      //await cartItem.save();
      const totel = await this.getCartTotal(session_id);
      await Cart.update({
        total: totel
      }, {
        where: {
          id: session_id
        }
      })

      return cartItem;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  async removeProductFromCart(session_id, product_id) {
    try {
      logger.info('Service: Cart - Call: removeProductFromCart')
      const cart = await Cart.findOne({
        where: {
          id: session_id
        }
      })
      const product = await Products.findOne({
        where: {
          id: product_id
        }
      })
      const cartItem = await CartItems.destroy({
        where: {
          session_id: cart.id,
          product_id: product.id
        }
      })
      return cartItem;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  async updateProductQuantity(session_id, product_id, quantity) {
    try {
      logger.info('Service: Cart - Call: updateProductQuantity')
      const cart = await Cart.findOne({
        where: {
          id: session_id
        }
      })
      const product = await Products.findOne({
        where: {
          id: product_id
        }
      })
      const cartItem = await CartItems.update({
        quantity: quantity
      }, {
        where: {
          session_id: cart.id,
          product_id: product.id
        }
      })
      return cartItem;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  

  async getCartItems(session_id) {
    try {
      logger.info('Service: Cart - Call: getCartItems')
      const cartItems = await CartItems.findAll({
        where: {
          session_id: session_id
        }
      })
      return cartItems;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  async getCartTotal(session_id) {
    try {
      logger.info('Service: Cart - Call: getCartTotal')
      const cartItems = await CartItems.findAll({
        where: {
          session_id: session_id
        },
        include: [{
          model: ProductVariants,
          as: 'product_variant',
        }]
      })
      let total = 0;
      for (let i = 0; i < cartItems.length; i++) {
        total += cartItems[i].quantity * cartItems[i].product_variant.price;
      }
      return total;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async emptyCart(session_id) {
    try {
      logger.info('Service: Cart - Call: emptyCart')
      const cartItems = await CartItems.destroy({
        where: {
          session_id: session_id
        }
      })
      return cartItems;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async createCartOfUser(user_id) {
    try {
      logger.info('Service: Cart - Call: createCartOfUser')
      const cart = await Cart.create({
        user_id: user_id
      })
      return cart;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async getCartByUserID(user_id) {
    try {
      logger.info('Service: Cart - Call: getCartByUserID')
      const cart = await Cart.findOne({
        where: {
          user_id: user_id
        }
      })
      return cart;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
}


module.exports = new CartService();