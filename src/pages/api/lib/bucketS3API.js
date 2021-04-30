const fsSync = require('fs');
const AWS = require('aws-sdk');
const { configS3 } = require('./config');

//AWS.config.update({region: configS3.region});

const s3 = new AWS.S3(configS3);

const uploadFileAsync = async (params) => {
    try {
      // Upload files with promises
      const res = await new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            err == null ? resolve(data) : reject(err)
        });
      });
          
      // 'https://mds-tyta.s3.amazonaws.com/<bucket>/file'
      return res.Location;
      
    } catch (error) {
      console.error(error);
      throw error;
    }
}

const uploadFile = (pathFile, nameFile, type='image', async=false) => {
    try {      
      // Read content from the file
    const fileContent = fsSync.readFileSync(pathFile);
    
    // Setting up S3 upload parameters
    const params = {
        Bucket: type ==='image' ? `${configS3.bucket}/photos` : `${configS3.bucket}/videos`,
        Key: nameFile, // File name to save as in S3
        Body: fileContent,
        ACL: 'public-read'
    };

    if (!async) {
        // Uploading files to the bucket
          s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }
            //console.log(`File uploaded successfully. ${data.Location}`);

            return data.Location;
        });

    } else {
      return uploadFileAsync(params);
    }

  } catch (error) {
      console.error(error);
      throw error;
  }
};

module.exports = {
  uploadFile,
};