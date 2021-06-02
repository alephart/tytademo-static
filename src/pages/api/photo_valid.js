const path = require('path');
const cuid = require('cuid');
const { decodeBase64Image } = require ('./lib/utils');
const { createDirSync, removeFileSync, loadFileSync, writeFile } = require('./lib/fileActions');
const { uploadAsset, detectFacesInAsset } = require('./lib/refaceAPI');

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

    ////// this for now /////
    const data = { 
      userId,
      faceId: 'abcdef',
      nameFilePhoto,
      pathFinalPhoto,
      ext,
    };

    response = { success: true, data };
    console.log(response);
    
    res.status(200).send(response);
    ////// this for now /////

    // 1. Get photo, convert to binary and upload to reface API
    await writeFile(pathFinalPhoto, imageBuffer.data);

    const binaryFile = loadFileSync(pathFinalPhoto);

    const uploadAsseUrlFile = await uploadAsset(binaryFile, `image/${ext}`);

    if (!uploadAsseUrlFile) {
      // return 
      //res.status(200).send({ success: false, message: 'Please, take you photo again.' }); // 'ERROR - uploading to Google Storage Failed'
    }

    // 2. Get cant faces and faceId
    const faces = await detectFacesInAsset(uploadAsseUrlFile, `image/${ext}`);

    // Check faces for process
    if(faces.length === 0 || faces.length > 1) {
      removeFileSync(pathFinalPhoto);

      // return 
      response = { success: false, message: 'You must take your photo again.' };
      //res.status(200).send(response);

    } else { // continue
      faceId = Object.values(faces[0])[1].id;

      const data = { 
        userId,
        faceId,
        nameFilePhoto,
        pathFinalPhoto,
        ext,
      };

      response = { success: true, data };
      console.log(response);
      
      res.status(200).send(response);
    }

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
