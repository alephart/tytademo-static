const fs = require('fs');
const cuid = require('cuid');

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
  },
};

function decodeBase64Image(dataString) {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.ext = matches[1].match(/jpeg|png|gif/)[0];
  response.data = Buffer.from(matches[2], 'base64');

  return response;
}

export default (req, res) => {
  const photoData = req.body;

  try {
    const imageBuffer = decodeBase64Image(photoData);

    const pathSave = './public/photos/';
    const namePhoto = cuid();
    const imageFinalPath = `${pathSave}${namePhoto}.${imageBuffer.ext}`;
    fs.writeFile(
      imageFinalPath,
      imageBuffer.data,
      { mode: 0o755 },
      function (err) {
        if (!err) {
          console.log('file is created');
        }
      }
    );

    res.status(200).json({ response: 'success', photo: `${namePhoto}.${imageBuffer.ext}` });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};