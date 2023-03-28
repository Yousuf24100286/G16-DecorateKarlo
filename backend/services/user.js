const Users = require('../database/models/users')


exports.getUserByUserName = async(username) => {
  const user = await Users.findOne({
    where: {
      username: username
    }
  })
  return user;
}

exports.getUserByEmail = async(email) => {
  const user = await Users.findOne({
    where: {
      email: email
    }
  })
  return user;
}


exports.addUser = async(user) => {
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