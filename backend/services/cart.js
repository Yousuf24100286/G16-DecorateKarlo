const Sequelize = require('sequelize');
const logger = require('../utils/logger');
const sequelize = new Sequelize(process.env.DEV_PGDATABASE_URL);
const Products = require('../database/models/product')(sequelize, Sequelize.DataTypes)
const ProductVariants = require('../database/models/product_variant')(sequelize, Sequelize.DataTypes)
const Cart = require('../database/models/cart_session')(sequelize, Sequelize.DataTypes)
const CartItems = require('../database/models/cart_item')(sequelize, Sequelize.DataTypes)

const ErrorHandler = require('../middlewares/errorHandler').ErrorHandler;

class CartService {
  async getCartByID(id) {
    try {
      logger.info('Service: Cart - Call: getCartByID')
      const cart = await Cart.findOne({
        where: {
          id: id
        }
      })
      return cart;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async addProductToCart(cart_id, body) {
    const { product_id, variant_id, quantity, price } = body;
    try {
      logger.info('Service: Cart - Call: addProductToCart')
      const cart = await Cart.findOne({
        where: {
          id: cart_id
        }
      })
      const product_variant = await ProductVariants.findOne({
        where: {
          id: variant_id
        }
      })
      const cartItem = await CartItems.create({
        cart_id: cart.id,
        product_id: product_variant.id,
        quantity: quantity
      })
      await cartItem.save();
      const totel = await this.getCartTotal(cart_id);
      await Cart.update({
        total: totel
      }, {
        where: {
          id: cart_id
        }
      })

      return cartItem;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  async removeProductFromCart(cart_id, product_id) {
    try {
      logger.info('Service: Cart - Call: removeProductFromCart')
      const cart = await Cart.findOne({
        where: {
          id: cart_id
        }
      })
      const product = await Products.findOne({
        where: {
          id: product_id
        }
      })
      const cartItem = await CartItems.destroy({
        where: {
          cart_id: cart.id,
          product_id: product.id
        }
      })
      return cartItem;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  async updateProductQuantity(cart_id, product_id, quantity) {
    try {
      logger.info('Service: Cart - Call: updateProductQuantity')
      const cart = await Cart.findOne({
        where: {
          id: cart_id
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
          cart_id: cart.id,
          product_id: product.id
        }
      })
      return cartItem;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  

  async getCartItems(cart_id) {
    try {
      logger.info('Service: Cart - Call: getCartItems')
      const cartItems = await CartItems.findAll({
        where: {
          cart_id: cart_id
        }
      })
      return cartItems;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  async getCartTotal(cart_id) {
    try {
      logger.info('Service: Cart - Call: getCartTotal')
      const cartItems = await CartItems.findAll({
        where: {
          cart_id: cart_id
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

  async emptyCart(cart_id) {
    try {
      logger.info('Service: Cart - Call: emptyCart')
      const cartItems = await CartItems.destroy({
        where: {
          cart_id: cart_id
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