const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV !== 'production') {
  require('dotenv').config();
}

const configReface = {
  token: process.env.REFACE_TOKEN,
  url_base: process.env.REFACE_URL,
};

const configS3 = {
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_KEY_SECRET,
  bucket: process.env.AWS_BUCKET_NAME,
  region: process.env.AWS_REGION,
};

const configAdmin = {
  url_api: process.env.NEXT_PUBLIC_TYTA_API,
}

const configMozeus = {
  url_api: process.env.MOZEUS_URL_API,
  user_id: process.env.MOZEUS_USER_ID,
  even_id: process.env.MOZEUS_EVENT_ID,
  token: process.env.MOZEUS_TOKEN,
}

// const configVimeo = {
//   client_id: process.env.VIMEO_CLIENT_ID,
//   client_secret: process.env.VIMEO_CLIENT_SECRET,
//   access_token: process.env.VIMEO_ACCESS_TOKEN,
// };

exports.configReface = configReface;
exports.configS3 = configS3;
exports.configAdmin = configAdmin;
exports.configMozeus = configMozeus;
// exports.configVimeo = configVimeo;