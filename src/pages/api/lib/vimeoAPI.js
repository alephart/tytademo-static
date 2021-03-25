const Vimeo = require('vimeo').Vimeo;
const { configVimeo } = require('../lib/config');


const clientVimeo = new Vimeo(
  configVimeo.client_id, 
  configVimeo.client_secret, 
  configVimeo.access_token
);

/**
 * Process the upload video on VIMEO
 * @param {string} pathFile   Path of the file name to uploadVimeo
 * @param {object} params     Params to vimeo metadata (view API Vimeo)
 * @returns promise: resolve: url 
 */
const uploadVimeo = (pathFile, params) => {
  return new Promise((resolve, reject) => {
    try {
      clientVimeo.upload(
        pathFile,
        params,
        uri => {
          console.log(`Your video URI is: ${uri}`);
          resolve(uri);
        },
        (bytes_uploaded, bytes_total) => {
          const percentage = (bytes_uploaded / bytes_total * 100).toFixed(2);
          console.log(bytes_uploaded, bytes_total, percentage + '%');
        },
        error => {
          console.log(`Failed because: ${error}`);
          reject(error);
        }
      )

    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

exports.uploadVimeo = uploadVimeo;