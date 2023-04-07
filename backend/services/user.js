const Sequelize = require('sequelize');
const logger = require('../utils/logger');
const sequelize = new Sequelize(process.env.DEV_PGDATABASE_URL);
const Users = require('../database/models/users')(sequelize, Sequelize.DataTypes)

class UserService {
  async getUserByID(id) {
    try {
      logger.info('Service: User - Call: getUserByID')
      const user = await Users.findOne({
        where: {
          id: id
        }
      })
      return user;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async getUserByUserName(username) {
    try {
      logger.info('Service: User - Call: getUserByUserName')
      const user = await Users.findOne({
        where: {
          username: username
        }
      })
      return user;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  async getUserByEmail(email) {
    try {
      logger.info('Service: User - Call: getUserByEmail')
      const user = await Users.findOne({
        where: {
          email: email
        }
      })
      return user;
    }
    catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  async addUser(user) {
    logger.info('Service: User - Call: addUser')
    const newUser = await Users.create({
      username: user.username,
      password_hash: user.password_hash,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      telephone: user.telephone,
      priv: 'Customer'
    })
    return newUser;
  }

  async updateUser(id, user) {
    logger.info('Service: User - Call: updateUser')
    const newUser = await Users.update({
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      telephone: user.telephone,
      priv: 'Customer'
    }, {
      where: {
        id: id
      }
    })
    return newUser;
  }

    
  async updateEmail(id, email) {
    logger.info('Service: User - Call: updateEmail')
    const user = await Users.update({
      email: email
    }, {
      where: {
        id: id
      }
    })
    return user;
  }

  async updateUsername(id, username) {
    logger.info('Service: User - Call: updateUsername')
    const user = await Users.update({
      username: username
      }, {
        where: {
          id: id
        }
      })
    return user;
  }

  async updateFirstName(id, first_name) {
    logger.info('Service: User - Call: updateFirstName')
    const user = await Users.update({
      first_name: first_name
    }, {
      where: {
        id: id
      }
    })
    return user;
  }

  async updateLastName(id, last_name) {
    logger.info('Service: User - Call: updateLastName')
    const user = await Users.update({
      last_name: last_name
    }, {
      where: {
        id: id
      }
    })
    return user;
  }

  async updateTelephone(id, telephone) {
    logger.info('Service: User - Call: updateTelephone')
    const user = await Users.update({
      telephone: telephone
    }, {
      where: {
        id: id
      }
    })
    return user;
  }

  async updatePassword(id, password_hash) {
    logger.info('Service: User - Call: updatePassword')
    const user = await Users.update({
      password_hash: password_hash
    }, {
      where: {
        id: id
      }
    })
    return user;
  }

}


module.exports = new UserService();