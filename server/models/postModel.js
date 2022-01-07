const mongoose = require('mongoose')
const postSchema = require('../schemas/postSchema')

const postModel = mongoose.model('Post', postSchema)

module.exports = postModel
