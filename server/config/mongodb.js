const mongoose = require('mongoose')
const colors = require('colors/safe')
const {MONGODB_URL} = process.env

if(!MONGODB_URL) {
  console.log(colors.red.underline('Error: MongoDB connection URI is not defined.'))
  process.exit(1)
}

async function connectDb() {
  try {
    await mongoose.connect(MONGODB_URL)
    console.log(colors.bgGreen.black(`Success: connected to database`))
  } catch(err) {
    console.log(colors.red.underline(`Error: ${err}`))
    process.exit(1)
  }
}

module.exports = {connectDb}
