const {getPostById} = require("../../services/post")
const {notFound} = require("../../utils/messages")

async function handler(request, reply) {
  const {postId} = request.params
  try {
    const post = await getPostById({postId})
    if(!post) throw new Error()
    reply
    .code(200)
    .send(post)
  } catch(e) {
    return notFound(reply, 'Post not found')
  }
}

module.exports = {
  path: '/posts/:postId',
  method: 'GET',
  handler
}