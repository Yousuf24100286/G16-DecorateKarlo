const logger = require('../utils/logger');

authService = require('../services/auth');

const createUser = async (req, res) => {
  logger.info('createUser', req.body);
  const {token , user} = await authService.createUser(req.body);
  res.status(201).json({token, user});
}

const loginUser = async (req, res) => {
  logger.info('Controller: Auth - Call: loginUser');
  const {token , user} = await authService.loginUser(req.body);
  res.status(200).json({token, user});
}

module.exports = {
  createUser,
  loginUser
}