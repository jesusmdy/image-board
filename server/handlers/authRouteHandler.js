const {verifyToken} = require("../services/token")
const {getUserById } = require("../services/user")
const {accessError} = require("../utils/messages")

async function authRouteHandler(request, reply) {
  const {authorization} = request.headers
  if (!authorization) return accessError(reply, 'You are not authorized')
  try {
    const {id} = verifyToken(authorization)
    const user = await getUserById(id)
    request.user = user
  } catch(e) {
    return accessError(reply, 'You are not authorized')
  }
}

module.exports = authRouteHandler
