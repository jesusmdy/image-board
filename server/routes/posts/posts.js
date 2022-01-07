const { getPosts, getPostsByTags } = require("../../services/post")
const { serverError } = require("../../utils/messages")

async function handler(request, reply) {
  const {page, limit, tags: _tags} = request.query
  let posts
  try {
    if (!!_tags) {
      const tags = _tags.trim().split(' ')
      posts = await getPostsByTags({page, limit, tags})
    } else {
      posts = await getPosts({page, limit})
    }
    reply
    .code(200)
    .send(posts)
  } catch(e) {
    console.log(e)
    return serverError(reply, 'Error while fetching posts')
  }
}

module.exports = {
  path: '/posts',
  method: 'GET',
  handler
}