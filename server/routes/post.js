const post = async (req, res) => {
  const {params} = req
  return {
    message: 'This is the post page!',
    postId: params?.postId
  }
}

module.exports = post
