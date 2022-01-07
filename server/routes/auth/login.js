const {authWithEmail} = require('../../services/auth')
const {notFound, accessError} = require('../../utils/messages')
const isEmail = require('../../utils/isEmail')
const USER_STATUS = require('../../consts/USER_STATUS')

const login = async (req, reply) => {
  const {identifier, password} = req.body
  let data
  if(isEmail(identifier)) data = await authWithEmail(identifier, password)
  const {user, isValidPassword, status, token} = data
  if(!user) return notFound(reply, 'User cannot be found')
  if(!isValidPassword) return accessError(reply, 'Password is incorrect')
  if(status == USER_STATUS.DISABLED) return accessError(reply, 'Your account is disabled')
  return {user, token}
}

module.exports = login
