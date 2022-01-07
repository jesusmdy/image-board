const User = require('../models/userModel')
const USER_STATUS = require('../consts/USER_STATUS')

const getUserByEmail = email => {
  return User.findOne({email}).exec()
}

const getUserById = userId => {
  return User.findById(userId).exec()
}

const userCanPost = user => {
  return user.status == USER_STATUS.ACTIVE
}

module.exports = {getUserByEmail, userCanPost, getUserById}
