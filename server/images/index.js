const {getExtension, uuid} = require('../services/file')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

function createImagePath(name) {
  return path.join(__dirname, `/uploads/${name}`)
}

function createResizedImage(buffer, outputName, resolution) {
  const image = sharp(buffer)
  image
  .resize(resolution)
  .toFile(createImagePath(outputName), (err, info) => {
    if(err) return null
    return info
  })
}

async function uploader(file, resize=true) {
  const imageId = uuid()
  const {name, data} = file
  const filename = `image-${imageId}.${getExtension(name)}`
  const smallFilename = `image-resized-300-${imageId}.${getExtension(name)}`
  const mediumFilename = `image-resized-600-${imageId}.${getExtension(name)}`
  const image = sharp(data)
  const original = await image.toFile(createImagePath(filename))
  if (resize) {
    const small = await image.resize(300).toFile(createImagePath(smallFilename))
    const medium = await image.resize(600).toFile(createImagePath(mediumFilename))
    return {
      original: {
        name: filename,
        ...original
      },
      small: {
        name: smallFilename,
        ...small
      },
      medium: {
        name: mediumFilename,
        ...medium
      }
    }
  } else {
    return {
      name: filename,
      ...original
    }
  }
}

async function remover(filename) {
  const path = createImagePath(filename)
  return fs.unlinkSync(path)
}

module.exports = {uploader, remover}
