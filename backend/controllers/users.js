const logger = require('../utils/logger');
const userService = require('../services/user');

const getUserByID = async (req, res, next) => {
  logger.info('Controller: User - Call: getUserByID');
  const user =  await userService.getUserByID(req.params.id);
  res.status(200).json(user);
}

const updateEmail = async (req, res, next) => {
  logger.info('Controller: User - Call: updateEmail');
  const user = await userService.updateEmail(req.params.id, req.body.email);
  res.status(200).json(user);
}

const updateUsername = async (req, res, next) => {
  logger.info('Controller: User - Call: updateUsername')
  const user = await user.userService.updateUsername(req.params.id, req.body.email)
  res.status(200).json(user) ;
}

const updateFirstName = async (req, res, next) => {
  logger.info('Controller: User - Call: updateFirstName')
  const user = await userService.updateFirstName(req.params.id, req.body.first_name)
  res.status(200).json(user) ;
}

const updateLastName = async (req, res, next) => {
  logger.info('Controller: User - Call: updateLastName')
  const user = await userService.updateLastName(req.params.id, req.body.last_name)
  res.status(200).json(user) ;
}

const updateTelephone = async (req, res,  next) => {
  logger.info('Controller: User - Call: updateTelephone')
  const user = await userService.updateTelephone(req.params.id, req.body.telephone)
  res.status(200).json(user) ;
}

const updatePassword = async (req, res, next) => {
  logger.info('Controller: User - Call: updatePassword')
  const password_hash = await bcrypt.hash(req.body.password, process.env.HASH_SALT_KEY);
  const user = await userService.updatePassword(req.params.id, password_hash)
  res.status(200).json(user) ;
}

module.exports = {
  getUserByID,
  updateEmail,
  updateUsername,
  updateFirstName,
  updateLastName,
  updateTelephone,
  updatePassword
}


