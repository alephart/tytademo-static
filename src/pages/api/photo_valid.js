const path = require('path');
const cuid = require('cuid');
const { uploadFile } = require('./lib/bucketS3API');
const { decodeBase64Image } = require ('./lib/utils');
const { createDirSync, removeFileSync, loadFileSync, writeFile } = require('./lib/fileActions');
const { uploadAsset, detectFacesInAsset } = require('./lib/refaceAPI');

const DIR_TEMP = './temp1';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
  },
};

export default async (req, res) => {
  try {
    const { photo = '', process, character } = JSON.parse(req.body);
    let userId, nameFilePhoto, pathFinalPhoto, ext, response, faceId;
    
    createDirSync(DIR_TEMP);

    /****************************************************************************
     * FIRST PART: PROCESS PHOTO AND REFACE RETURN FACEID
    ****************************************************************************/
    const imageBuffer = decodeBase64Image(photo);

    userId = cuid();
    ext = imageBuffer.ext;
    nameFilePhoto = `photo-${userId}.${ext}`;
    pathFinalPhoto = path.join(DIR_TEMP, nameFilePhoto);

    // 1. Get photo, convert to binary and upload to reface API
    await writeFile(pathFinalPhoto, imageBuffer.data);

    const binaryFile = loadFileSync(pathFinalPhoto);

    const uploadAsseUrlFile = await uploadAsset(binaryFile, `image/${ext}`);
    //console.log(uploadAsseUrlFile);

    if (!uploadAsseUrlFile) {
      // return 
      res.status(200).send({ success: false, message: 'Please, take you photo again' }); // 'ERROR - uploading to Google Storage Failed'
    }

    // 2. Get cant faces and faceId
    const faces = await detectFacesInAsset(uploadAsseUrlFile, `image/${ext}`);
    //console.log(faces);

    // Check faces for process
    if(faces.length === 0 || faces.length > 1) {
      removeFileSync(pathFinalPhoto);

      // return 
      response = { success: false, message: 'You must take your photo again.' };
      res.status(200).send(response);

    } else { // continue
      faceId = Object.values(faces[0])[1].id;

      // save image on cloud
      const photoLocation = await uploadFile(pathFinalPhoto, nameFilePhoto, 'image', true);
      
      //
      removeFileSync(pathFinalPhoto);
      
      const data = { 
        userId,
        faceId,
        nameFilePhoto,
        pathFinalPhoto: photoLocation,
        character,
      };

      response = { success: true, data };
      
      res.status(200).send(response);
    }

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
