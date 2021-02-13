const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');
const cuid = require('cuid');
const { writeFile } = require('./lib/fileActions');
const { saveCloud } = require('./lib/savePhotoCloud');
const decodeBase64Image = require ('./lib/decodeBase64');

//const DIR_TEMP = path.join(__dirname,  './temp');
const DIR_TEMP = './temp';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
  },
};

export default async (req, res) => {
  try {
    const photoData = req.body;

    if (!fsSync.existsSync(DIR_TEMP)) {
      fs.mkdir(DIR_TEMP, { recursive: true }, (err) => {
        if (err) throw err;
      });
    }

    const imageBuffer = decodeBase64Image(photoData);
    const nameCuid = cuid();
    const nameFilePhoto = `photo-${nameCuid.substring(10)}`;
    const pathFinalFile = path.join(DIR_TEMP, `${nameFilePhoto}.${imageBuffer.ext}`);

    await writeFile(pathFinalFile, imageBuffer.data);
    await saveCloud(pathFinalFile, nameFilePhoto);

    // remove file from server
    fsSync.unlinkSync(pathFinalFile);

    res.status(200).json({ response: 'success', photo: `${nameFilePhoto}.${imageBuffer.ext}` });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
