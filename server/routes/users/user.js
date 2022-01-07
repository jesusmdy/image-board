const {normalizeUser, getUserByUsername} = require("../../services/user")
const {notFound} = require("../../utils/messages")

async function handler(request, reply) {
  const {userName} = request.params
  try {
    const user = await getUserByUsername(userName)
    return normalizeUser(user)
  } catch(e) {
    return notFound(reply, 'User not found')
  }
}

module.exports = {
  path: '/users/:userName',
  method: 'GET',
  handler
}
