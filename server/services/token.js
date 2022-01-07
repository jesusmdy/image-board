const jwt = require("jsonwebtoken")
const {TOKEN_PRIVATE_KEY} = process.env

const signToken = (payload) => {
  return jwt.sign(payload, TOKEN_PRIVATE_KEY)
}

const verifyToken = (token) => {
  return jwt.verify(token, TOKEN_PRIVATE_KEY)
}

module.exports = {signToken, verifyToken}
