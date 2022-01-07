const mongoose = require('mongoose')
const USER_ROLES = require('../consts/USER_ROLES')
const USER_STATUS = require('../consts/USER_STATUS')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  displayName: String,
  email: String,
  description: String,
  joinDate: {
    type: Date,
    default: Date.now
  },
  avatar: {
    small: String,
    medium: String,
    large: String
  },
  links: [{
    title: String,
    url: String
  }],
  role: {
    type: Number,
    default: USER_ROLES.USER
  },
  status: {
    type: Number,
    default: USER_STATUS.ACTIVE
  }
})

userSchema.methods.exists = function(cb) {
  return mongoose
  .model('User')
  .findOne({
    username: this.username,
    email: this.email
  }, cb)
}

module.exports = userSchema
