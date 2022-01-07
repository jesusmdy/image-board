const authRouteHandler = require('../../handlers/authRouteHandler')
const {getPostById, removePostById} = require('../../services/post')
const {notFound, accessError, serverError} = require('../../utils/messages')
const {remover} = require('../../images')

async function postVerify(request, reply) {
  const {postId} = request.params
  if(!postId) return notFound(reply, 'Post id is missing')
  const post = await getPostById({postId})
  if(!post) return notFound(reply, 'Post not found')
  request.post = post
}

function postOwnerHandler(request, reply, done) {
  const {user, post} = request
  const {_id: userId} = user
  const {author: postAuthor} = post
  if (postAuthor != userId) return accessError(reply, 'You cannot modify this post.')
  done()
}

async function handler(request, reply) {
  const {_id: postId, file} = request.post
  const {original, small, medium} = file
  try {
    await removePostById({postId})
    await remover(original.name)
    await remover(small.name)
    await remover(medium.name)
    reply
    .code(204)
    .send({})
  } catch(e) {
    console.log(e);
    return serverError(reply, 'Error deleting post')
  }
}

module.exports = {
  path: '/posts/:postId',
  method: 'DELETE',
  preHandler: [
    authRouteHandler,
    postVerify,
    postOwnerHandler
  ],
  handler
}