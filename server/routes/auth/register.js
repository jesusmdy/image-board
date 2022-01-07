const User = require('../../models/userModel')
const Password = require('../../models/passwordModel')
const {
  accessError,
  serverError,
  itemCreated
} = require('../../utils/messages')
const normalizeUser = require('../../utils/normalizeUser')
const {hashPassword} = require('../../services/password')

const register = async (request, reply) => {
  const {username, displayName, email, password} = request.body
  if(username && displayName && email && password) {
    const user = new User(normalizeUser({username, displayName, email}))
    try {
      user.exists((_, existingUser) => {
        if(!!existingUser) accessError(reply, 'User already exist')
        else {
          user.save(async (_, newUser) => {
            const {id} = newUser
            const hash = hashPassword(password)
            const passwordDoc = new Password({_id: id, password: hash})
            await passwordDoc.save()
            itemCreated(reply, 'User registered')
          })
        }
      })
    } catch(err) {
      console.log(err);
      serverError(reply, 'Error while registering, try again...')
    }
  }
  else accessError(reply, 'Username, display name, email and password are required.')
}

module.exports = register
