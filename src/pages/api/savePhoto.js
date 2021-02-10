const path = require('path');
const fs = require('fs').promises;
const fsSycn = require('fs');
const cuid = require('cuid');
const cloudinary = require('cloudinary').v2;

//const DIR_TEMP = path.join(__dirname,  './temp');
const DIR_TEMP = './temp';

// console.log('. = %s', path.resolve(DIR_TEMP));
// console.log('__dirname = %s', path.resolve(__dirname, DIR_TEMP));

const DUMMY_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
  },
};

cloudinary.config({
  cloud_name: 'alephart-co',
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

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
};

async function writeFile(pathFile, dataFile) {
  try {
    await fs.writeFile(pathFile, dataFile);
  } catch (err) {
    if (err) throw err;
    console.error(`Got an error trying to write to a file: ${err.message}`);
  }
}

async function moveFile(source, destination) {
  try {
    await fs.rename(source, destination);
    console.log(`Moved file from ${source} to ${destination}`);
  } catch (err) {
    if (err) throw err;
    console.error(`Got an error trying to move the file: ${err.message}`);
  }
}

async function saveDummy(dummyBuffer) {
  try {
    //const dummyBuffer = decodeBase64Image(DUMMY_IMAGE);
    const nameCuid = cuid();
    const nameDummy = `image-${nameCuid.substring(0, 10)}.${dummyBuffer.ext}`;
    const pathDummy = path.join('./public/photos/', nameDummy);
    await writeFile(pathDummy, dummyBuffer.data);
  } catch (err) {
    if (err) throw err;
    console.error(`Got an error trying to crate dummy image: ${err.message}`);
  }
}

async function saveCloud(pathPhoto, namePhoto) {
  try {
    await cloudinary.uploader.upload(
      pathPhoto,
      { public_id: `MDS/toyota/${namePhoto}`, tags: `demo` }, // directory and tags are optional
      function (err, image) {
        if (err) return res.send(err);
        console.log('file uploaded to Cloudinary');
        // remove file from server
        fsSycn.unlinkSync(pathPhoto);
        // return image details
        //res.json(image)
      }
    );
  } catch (err) {
    if (err) throw err;
    console.error(`Got an error trying to upload cloud: ${err.message}`);
  }
}

export default async (req, res) => {
  try {
    const photoData = req.body;

    if (!fsSycn.existsSync(DIR_TEMP)) {
      fs.mkdir(DIR_TEMP, { recursive: true }, (err) => {
        if (err) throw err;
      });
    }

    const imageBuffer = decodeBase64Image(photoData);
    const nameCuid = cuid();
    const nameFilePhoto = `photo-${nameCuid.substring(10)}`;
    const pathFinalFile = path.join('./public/photos/', `${nameFilePhoto}.${imageBuffer.ext}`);

    await writeFile(pathFinalFile, imageBuffer.data);
    await saveCloud(pathFinalFile, nameFilePhoto);

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

    res.status(200).json({ response: 'success', photo: `${nameFilePhoto}.${imageBuffer.ext}` });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
