const {validPassword} = require("./password")
const {signToken} = require("./token")
const {getUserByEmail} = require("./user")

const authWithEmail = async (userEmail, password) => {
  const user = await getUserByEmail(userEmail)
  if(!user) return {user: null}
  const {
    id,
    username,
    displayName,
    email,
    avatar,
    joinDate,
    links,
    role,
    status
  } = user
  const isValidPassword = await validPassword(id, password)
  const token = user && signToken({id, role, status})
  return {
    user: {
      username,
      displayName,
      email,
      avatar,
      joinDate,
      links
    },
    status,
    isValidPassword,
    token
  }
}

module.exports = {authWithEmail}
