
const validateUser = (email, password) => {
  const errors = {};
  const validEmail = typeof email === 'string' && email.trim() !== ""
  const validPassword = typeof password === 'string' && password.trim() !== "" && password.trim().length >= 8

  return validEmail && validPassword
}



module.exports.validateUser = validateUser