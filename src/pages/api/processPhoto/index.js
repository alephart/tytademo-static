const path = require('path');
const cuid = require('cuid');
const { uploadFile } = require('../lib/bucketAWS');
const { uploadVimeo } = require('../lib/vimeoAPI');
const { decodeBase64Image } = require ('../lib/utils');
const { placeWatermarkOnVideo, concatVideosDemuxer } = require('../lib/ffmpegActions');
const { createDirSync, removeFileSync, loadFileSync, writeFileSync, writeFile } = require('../lib/fileActions');
const { uploadAsset, detectFaceInAsset } = require('../lib/refaceAPI');
const { swapDataVideos, downloadSwapVideos, formatFileVideos } = require('../lib/refaceActions');

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
    let responseReface;

    createDirSync(DIR_TEMP);

    const imageBuffer = decodeBase64Image(photoData);
    const nameCuid = cuid();
    const subName = nameCuid.substring(10);
    const nameFilePhoto = `photo-${subName}.${imageBuffer.ext}`;
    const pathFinalPhoto = path.join(DIR_TEMP, nameFilePhoto);
  
    /**
     * SWAP VIDEOS PROCESS
     */
    
    // 1. Get photo conver to binary and: upload to S3, upload to reface API
    await writeFile(pathFinalPhoto, imageBuffer.data);
    const binaryFile = loadFileSync(pathFinalPhoto);
    const uploadReface = await uploadAsset(binaryFile, `image/${imageBuffer.ext}`);

    responseReface = JSON.parse(uploadReface);

    console.log(responseReface);

    // 2. preprocess the upload image (get de faceId)
    const faceId = await detectFaceInAsset(responseReface.urlFile, `image/${imageBuffer.ext}`);
    console.log(faceId);

    // 3. Swap videos and get urls
    const dataVideos = await swapDataVideos(faceId);
    console.log({dataVideos});

    // 4. Download videos, save in temp
    const dowloadVideos = await downloadSwapVideos(dataVideos);
    console.log({dowloadVideos});

    // 5. write file .txt with info videos
    const fileVideosToTxt = formatFileVideos(dowloadVideos);
    const nameFileVideos = `videos-${subName}.txt`;
    writeFileSync(path.join(DIR_TEMP, nameFileVideos), fileVideosToTxt);

    // 6. Merge videos (get final video)
    const nameFileVideo = `video-${subName}.mp4`;

    let dataFinal = {
      output: `${DIR_TEMP}/${nameFileVideo}`,
      fileVideos: `${DIR_TEMP}/${nameFileVideos}`,
    };

    await concatVideosDemuxer(dataFinal);

    // // create watermark into video 
    // let videoTemp = dataFinal.output;

    // dataFinal = {
    //   output: `${DIR_TEMP}/temp-${videoTemp}`,
    //   video: videoTemp,
    //   watermark: `${DIR_TEMP}/FeaturingYou.png`,
    // };

    // // remove posible video exists 
    // // removeFileSync(dataFinal.output);

    // await placeWatermarkOnVideo(dataFinal);
    
    const photoLocation = uploadFile(pathFinalPhoto, nameFilePhoto, 'image');
    console.log(photoLocation);

    // 7. upload video to VIMEO and get url
    const params = {
      'name': `Video ${subName}`, // Here get name from data form
      'description': 'description video!!!.' // Here create description from data form
    };

    const videoLocation = await uploadVimeo(dataFinal.output, params);


    // remove files (image, videos, txt) from server
    removeFileSync(pathFinalPhoto);
    //removeFileSync(videoTemp);
    removeFileSync(dataFinal.output);
    //removeFileSync(pathFileVideos);

    removeFileSync(dowloadVideos);
    
    res.status(200).json({ success: true, photo: photoLocation, video: videoLocation });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};
