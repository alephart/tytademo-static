const path = require('path');
const cuid = require('cuid');
const { uploadFile } = require('../lib/bucketAWS');
const { uploadVimeo } = require('../lib/vimeoAPI');
const { decodeBase64Image } = require ('../lib/utils');
const { placeWatermarkOnVideo, concatVideosDemuxer } = require('../lib/ffmpegActions');
const { createDirSync, removeFileSync, writeFile, loadFileBinarySync } = require('../lib/fileActions');
const { uploadAsset, detectFaceInAsset } = require('../lib/refaceAPI');
const { swapDataVideos, DownloadSwapAndGetVideoList } = require('../lib/refaceActions');

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
    const nameFilePhoto = `photo-${nameCuid.substring(10)}.${imageBuffer.ext}`;
    const pathFinalPhoto = path.join(DIR_TEMP, nameFilePhoto);

    // save photo in /temp
    await writeFile(pathFinalPhoto, imageBuffer.data);

    /**
     * SWAP VIDEOS
     */

    // 1.get photo in binary format
    // const binaryFile = await imageBuffer.blob();
    const binaryFile = await loadFileBinarySync(pathFinalPhoto);
    console.log(imageBuffer.ext);

    // 2. upload asset to reface and get url asset (signed_url generated in upload)
    const uploadReface = await uploadAsset(binaryFile, `image/${imageBuffer.ext}`);

    responseReface = JSON.parse(uploadReface);

    console.log(responseReface);

    // 3. preprocess the upload image (get de faceId)
    const faceId = await detectFaceInAsset(responseReface.urlFile, `image/${imageBuffer.ext}`);
    console.log(faceId);

    // 4. Swap videos and get url
    const videos = await swapDataVideos(faceId);
    console.log(videos);

    // 5. Download videos, save in temp
    const fileVideosToLocal = await DownloadSwapAndGetVideoList(videos);
    console.log(fileVideosToLocal);

    // 6. write file .txt with info videos
    const nameFileVideos = `videos-${nameCuid.substring(10)}.txt`;
    const pathFileVideos = path.join(DIR_TEMP, nameFileVideos);
    await writeFile(pathFileVideos, fileVideosToLocal);

    // 7. Merge videos (get final video)
    const nameFileVideo = `video-${nameCuid.substring(10)}.mp4`;

    let dataFinal = {
      output: `${DIR_TEMP}/${nameFileVideo}`,
      fileVideos: `${DIR_TEMP}/${nameFileVideos}`,
    };

    // remove posible video exists 
    removeFileSync(dataFinal.output);

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

    // 8. upload video to VIMEO and get url
    const params = {
      'name': 'Name participant video', // Here get name from data form
      'description': 'description video!!!.' // Here create description from data form
    };

    const videoLocation = await uploadVimeo(dataFinal.output, params);

    // 9. save photo in cloud
    const imageLocation = await uploadFile(pathFinalPhoto, nameFilePhoto, 'image', true);

    // remove files (image, videos, txt) from server
    removeFileSync(pathFinalPhoto);
    //removeFileSync(videoTemp);
    //removeFileSync(data.output);
    //removeFileSync(pathFileVideos);

    const removeVideos = videos.map(video => video.name);
    removeFileSync(removeVideos);
    
    res.status(200).json({ response: 'success', photo: imageLocation, video: videoLocation });
    //res.status(200).json({ response: 'success' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
