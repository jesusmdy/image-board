const bcrypt = require('bcrypt')
const Password = require('../models/passwordModel')
const {SALT_ROUNDS} = process.env

const hashPassword = plainTextPassword => {
  return bcrypt.hashSync(plainTextPassword, parseInt(SALT_ROUNDS))
}

const verifyPassword = (plainTextPassword, hashedPassword) => {
  return bcrypt.compare(plainTextPassword, hashedPassword)
}

const getUserPassword = userId => {
  return Password.findById(userId).exec()
}

const validPassword = async (userId, plainTextPassword) => {
  const {password} = await getUserPassword(userId)
  return await verifyPassword(plainTextPassword, password)
}

module.exports = {hashPassword, verifyPassword, validPassword}
