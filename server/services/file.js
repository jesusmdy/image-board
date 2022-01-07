const {uuid} = require('uuidv4')
const {fileTypes, maxFileSize} = require('../config/files')

const getExtension = filename => (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined

function fileTypeIsValid(mimetype, filetypes) {
  return filetypes.includes(mimetype)
}
function isValidFile(file) {
  const {mimetype, size} = file
  return fileTypeIsValid(mimetype, fileTypes) && size <= maxFileSize
}


module.exports = {isValidFile, getExtension, uuid}