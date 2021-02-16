const cloudinary = require('cloudinary').v2;
const { configCldnry } = require('./config');

cloudinary.config(configCldnry);

async function saveCloud(pathPhoto, namePhoto) {
  try {
    await cloudinary.uploader.upload(
      pathPhoto,
      { public_id: `MDS/toyota/${namePhoto}`, tags: `demo` }, // directory and tags are optional
      function (err, image) {
        if (err) return res.send(err);
        console.log('file uploaded to Cloudinary');
        // return image details
        //res.json(image)
      }
    );
  } catch (err) {
    if (err) throw err;
    console.error(`Got an error trying to upload cloud: ${err.message}`);
  }
}

exports.saveCloud = saveCloud;