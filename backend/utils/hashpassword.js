const bcrypt = require('bcrypt');
require('dotenv').config()

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(process.env.HASH_SALT_KEY);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

module.exports = hashPassword ;