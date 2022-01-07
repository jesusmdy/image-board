require('dotenv').config()
const fastify = require('fastify')({
  //logger: process.env.IS_DEVELOPMENT || false
})
const fileUpload = require('fastify-file-upload')

const {connectDb} = require('./config/mongodb')
const startServer = require('./start')

const index = require('./routes/index')
const post = require('./routes/post')
const register = require('./routes/auth/register')
const login = require('./routes/auth/login')

const createPost = require('./routes/posts/index')
const listPosts = require('./routes/posts/posts')
const showPost = require('./routes/posts/post')
const deletePost = require('./routes/posts/delete')

// Users
const showUser = require('./routes/users/user')
const showUserPosts = require('./routes/users/userPosts')

fastify.register(fileUpload)
fastify.get('/', index)
fastify.decorateRequest('user', '')

// Authentication
fastify.post('/auth/register', register)
fastify.post('/auth/login', login)

// Users
fastify.route(showUser)
fastify.route(showUserPosts)

// Posts
fastify.decorateRequest('uploaded', '')

fastify.route(showPost)
fastify.route(listPosts)
fastify.route(createPost)

fastify.decorateRequest('post', '')
fastify.route(deletePost)

async function InitializeServer() {
  await connectDb()
  await startServer(fastify)
}
InitializeServer()

module.exports = {fastify}
