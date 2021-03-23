const fs = require('fs');

const encodeBinaryFromBase64 = (fileBase64) => {
  return Buffer(fileBase64, 'base64').toString('binary');
}

module.exports = {
  encodeBinaryFromBase64,
}