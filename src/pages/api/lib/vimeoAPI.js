const Vimeo = require('vimeo').Vimeo;
const { configVimeo } = require('../lib/config');

const client = new Vimeo(configVimeo.client_id, configVimeo.client_secret, configVimeo.access_token);

// const params = {
//   'name': 'Title video',
//   'description': 'The description goes here.'
// };

/***
 * 
 */
const uploadVideo = async (pathFile, params) => {
  return await new Promise((resolve, reject) => {
    try {
      client.upload(
        pathFile,
        params,
        uri => {
          //console.log(`Your video URI is: ${uri}`);
          resolve(uri);
        },
        (bytes_uploaded, bytes_total) => {
          const percentage = (bytes_uploaded / bytes_total * 100).toFixed(2);
          //console.log(bytes_uploaded, bytes_total, percentage + '%');
        },
        error => {
          //console.log(`Failed because: ${error}`);
          reject(error);
        }
      )

    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

exports.uploadVideo = uploadVideo;