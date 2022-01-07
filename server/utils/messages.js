function accessError(replyInstance, message = null) {
  return replyInstance
  .code(403)
  .send({
    title: 'Denied',
    message: message
  })
}
function serverError(replyInstance, message = null) {
  return replyInstance
  .code(500)
  .send({
    title: 'Server Error',
    message: message
  })
}

function itemCreated(replyInstance, message = null) {
  return replyInstance
  .code(201)
  .send({
    title: 'Success',
    message: message
  })
}

function notFound(replyInstance, message = null) {
  return replyInstance
  .code(404)
  .send({
    title: 'Not Found',
    message: message
  })
}

module.exports = {
  accessError,
  serverError,
  itemCreated,
  notFound
}
