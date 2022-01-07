const User = require('../models/userModel')
const USER_STATUS = require('../consts/USER_STATUS')

const getUserByEmail = email => {
  return User.findOne({email}).exec()
}

const getUserById = userId => {
  return User.findById(userId).exec()
}

const getUserByUsername = username => {
  return User.findOne({username}).exec()
}

const userCanPost = user => {
  return user.status == USER_STATUS.ACTIVE
}

const normalizeUser = user => {
  const {
    username,
    displayName,
    avatar,
    joinDate,
    links
  } = user
  return {username, displayName, avatar, joinDate, links}
}

module.exports = {
  getUserByEmail,
  userCanPost,
  getUserById,
  getUserByUsername,
  normalizeUser
}
