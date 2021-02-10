const path = require('path');
const fs = require('fs').promises;
const cuid = require('cuid');

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
  },
};

const decodeBase64Image = (dataString) => {
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

async function writeFile(pathFile, dataFile) {
  try {
    await fs.writeFile(pathFile, dataFile);
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}

export default async (req, res) => {
  try {
    const photoData = req.body;

    const imageBuffer = decodeBase64Image(photoData);
    const nameCuid = cuid();
    const nameFilePhoto = `${nameCuid}.${imageBuffer.ext}`;
    const pathFinalFile = path.join('./public/photos/', nameFilePhoto);

    await writeFile(pathFinalFile, imageBuffer.data);

    // fs.writeFile(
    //   pathFinalFile,
    //   imageBuffer.data,
    //   //{ mode: 0o755 },
    //  (err) => {
    //     if (!err) {
    //       console.log('file is created');
    //     }
    //     return;
    //   }
    // );

    res.status(200).json({ response: 'success', photo: nameFilePhoto });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
