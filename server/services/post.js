const POST_STATUS = require('../consts/POST_STATUS')
const Post = require('../models/postModel')

function serializeNewPost(post = {}, user = {}) {
  const {
    parent,
    source: _source,
    tags: _tags,
    status,
    rating,
    file,
    isIndexed,
    allowComments
  } = post
  const author = user._id
  const tags = _tags?.trim().split(' ') || null
  const source = _source?.trim() || null
  return {
    author,
    parent,
    source,
    tags,
    status,
    file,
    isIndexed,
    allowComments,
    rating
  }
}

function getPosts({page = 1, limit = 10, query = {}}) {
  return Post.paginate({
    ...query,
    status: POST_STATUS.ACTIVE
  }, {page, limit})
}

function getPostById({postId}) {
  return Post.findById(postId)
}

function getPostsByTags({page, limit, tags}) {
  const query = {
    tags: {'$in': tags}
  }
  return getPosts({page, limit, query})
}

function removePostById({postId}) {
  return Post.findByIdAndDelete(postId)
}

function createPost(serializedPost) {
  return new Post(serializedPost)
}

module.exports = {
  serializeNewPost,
  createPost,
  getPosts,
  getPostsByTags,
  getPostById,
  removePostById
}