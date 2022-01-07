const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const POST_STATUS = require('../consts/POST_STATUS')
const POST_RATING = require('../consts/POST_RATING')
const POST_REACTION_TYPE = require('../consts/POST_REACTION_TYPE')

const postSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  approverId: Number,
  parent: String,
  source: String,
  tags: {
    type: Array,
    default: ['tagme']
  },
  status: {
    type: Number,
    default: POST_STATUS.ACTIVE
  },
  rating: {
    type: Number,
    default: POST_RATING.SAFE
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  modifiedAt: {
    type: Date,
    default: null
  },
  file: {
    original: Object,
    small: Object,
    medium: Object
  },
  isIndexed: {
    type: Boolean,
    default: true
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  reactions: [
    {
      reactionType: {
        type: Number,
        default: POST_REACTION_TYPE.LIKE,
      },
      userId: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

postSchema.plugin(mongoosePaginate)

module.exports = postSchema
