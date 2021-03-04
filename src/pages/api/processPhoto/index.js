const path = require('path');
const cuid = require('cuid');
const {decodeBase64Image} = require ('../lib/imageBase64');
const { transitionMergeVideos, placeWatermarkOnVideo } = require('../lib/ffmpegActions');
const { createDirSync, removeFileSync, writeFile } = require('../lib/fileActions');
const { saveCloud } = require('../lib/saveFileCloud');
const { uploadFile } = require('../lib/bucketMedia');

const media = path.join(__dirname,  '../media');
console.log({media});
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

    createDirSync(DIR_TEMP);

    const imageBuffer = decodeBase64Image(photoData);
    const nameCuid = cuid();
    const nameFilePhoto = `photo-${nameCuid.substring(10)}`;
    const pathFinalPhoto = path.join(DIR_TEMP, `${nameFilePhoto}.${imageBuffer.ext}`);

    // save photo in /temp
    await writeFile(pathFinalPhoto, imageBuffer.data);
    
    const nameFileVideo = `video-${nameCuid.substring(10)}`;
    console.log(nameFileVideo);
    
    // generate video from 2 videos
    let data = {
      output: `${DIR_TEMP}/output.mp4`,
      videos: [
        `${DIR_TEMP}/video3.mp4`,
        `${DIR_TEMP}/video4.mp4`,
      ],
      transition: {
        name: 'directionalWipe',
        duration: 300
      }
    };

    console.log('data1', data);

    removeFileSync(data.output);

    await transitionMergeVideos(data);

    // create watermark into video 
    const videoTemp = data.output;

    data = {
      output: `${DIR_TEMP}/${nameFileVideo}.mp4`,
      video: videoTemp,
      watermark: `${DIR_TEMP}/MDS.png`,
    };

    console.log('data2', data);

    await placeWatermarkOnVideo(data);

    // save image on cloud
    const imageLocation = await uploadFile(pathFinalPhoto, nameFilePhoto, 'image', true);

    // save final video on cloud
    const videoLocation = await uploadFile(data.output, nameFileVideo, 'video', true);

    // remove files (image and videos) from server
    removeFileSync(pathFinalPhoto);
    //removeFileSync(videoTemp);
    //removeFileSync(data.output);

    res.status(200).json({ response: 'success', photo: imageLocation, video: videoLocation });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
