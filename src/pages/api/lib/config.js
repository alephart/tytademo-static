const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV !== 'production') {
  require('dotenv').config();
}

const configCldnry = {
  cloud_name: 'alephart-co',
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
};

const configS3 = {
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_KEY_SECRET,
  bucket: process.env.AWS_BUCKET_NAME,
  region: process.env.AWS_REGION,
};

const configVimeo = {
  client_id: process.env.VIMEO_CLIENT_ID,
  client_secret: process.env.VIMEO_CLIENT_SECRET,
  access_token: process.env.VIMEO_ACCESS_TOKEN,
};

exports.configS3 = configS3;
exports.configCldnry = configCldnry;
exports.configVimeo = configVimeo;