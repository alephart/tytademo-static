const cloudinary = require('cloudinary').v2;
const { configCldnry } = require('./config');

cloudinary.config(configCldnry);

async function saveCloud(pathFile, nameFile, type = 'image') {
  const pathCloud =
    type === 'image'
      ? `MDS/toyota/${nameFile}`
      : `MDS/toyota/videos/${nameFile}`;

  try {

    if(type === 'video'){
      cloudinary.uploader.upload(
        pathFile, 
        { 
          resource_type: "video", 
          public_id: pathCloud,
          chunk_size: 6000000,
          eager: [
            { width: 300, height: 300, crop: "pad", audio_codec: "none" }, 
            { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],                                   
          eager_async: true,
          eager_notification_url: `${process.env.URL_SITE}/api/uploadvideo` 
        },
        function(error, result) {
          if (error) throw error;
          console.log(result, error);
        }
      );

    } else {
      await cloudinary.uploader.upload(
        pathFile,
        { public_id: pathCloud, tags: `demo` }, // directory and tags are optional
        function (err, result) {
          if (err) throw err;
          console.log(result, err);
          // return image details
          //res.json(result)
        }
      );

    }

  } catch (err) {
    if (err) throw err;
    console.error(`Got an error trying to upload cloud: ${err.message}`);
  }
}

exports.saveCloud = saveCloud;
