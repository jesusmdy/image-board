const colors = require('colors/safe')
const start = async (fastify) => {
  fastify.listen(process.env.PORT || 5000)
  .then(address => {
    console.log(colors.blue.bold(`Server listening on ${address}`))
  })
  .catch(err => {
    console.log(colors.red.underline(`Error: ${err}`))
    fastify.log.error(err)
    process.exit(1)
  })
}

module.exports = start
