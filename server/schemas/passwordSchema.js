const mongoose = require('mongoose')

const passwordSchema = new mongoose.Schema({
  _id: String,
  password: String,
  lastUpdate: {
    type: Date,
    default: Date.now
  }
})

module.exports = passwordSchema
