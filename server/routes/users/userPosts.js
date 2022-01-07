const {getPostByUser} = require("../../services/post")
const {getUserByUsername, normalizeUser} = require("../../services/user")
const {notFound, serverError} = require('../../utils/messages')

async function handler(request, reply) {
  const {userName} = request.params
  const {page} = request.query
  try {
    const user = await getUserByUsername(userName)
    if(!user) return notFound(reply, 'User not found')
    const {_id: author} = user
    console.log(user);
    const posts = await getPostByUser({author, page})
    reply
    .code(200)
    .send({user: normalizeUser(user), posts})
  } catch(e) {
    console.log(e)
    return serverError(reply, 'Server error')
  }
}

module.exports = {
  path: '/users/:userName/posts',
  method: 'GET',
  handler
}
