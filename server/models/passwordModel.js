const mongoose = require('mongoose')
const passwordSchema = require('../schemas/passwordSchema')

const passwordModel = mongoose.model('Password', passwordSchema)

module.exports = passwordModel
