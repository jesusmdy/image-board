const authRouteHandler = require("../../handlers/authRouteHandler")
const {userCanPost} = require("../../services/user")
const {accessError, serverError} = require("../../utils/messages")
const {isValidFile} = require('../../services/file')
const {uploader} = require('../../images')
const {createPost, serializeNewPost} = require("../../services/post")

function postPermissionHandler(request, reply, done) {
  const {user} = request
  if(!userCanPost(user)) return accessError(reply, 'You are restricted to create posts.')
  done()
}

async function handler(request, reply) {
  const {file: upload} = request?.raw?.files
  const {body: unserializedPost, user} = request
  try {
    const file = await uploader(upload)
    const post = createPost({...serializeNewPost(unserializedPost, user), file})
    try {
      post.save()
      reply
      .code(201)
      .send(post)
    } catch(e) {
      console.log(e);
      return serverError(reply, 'Error while saving post...')
    }
  } catch(e) {
    console.log(e);
    return serverError(reply, 'Error while processing image')
  }
}

function fileHandler(request, reply, done) {
  const {file: upload} = request?.raw?.files
  if(!upload) return accessError(reply, 'Image file is required')
  if(!isValidFile(upload)) return accessError(reply, 'File type or size is invalid')
  done()
}

module.exports = {
  path: '/posts',
  method: 'POST',
  preHandler: [
    authRouteHandler,
    postPermissionHandler,
    fileHandler
  ],
  handler
}