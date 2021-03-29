const path = require('path');
const cuid = require('cuid');
const { uploadFile } = require('../lib/bucketS3API');
const { uploadVimeo } = require('../lib/vimeoAPI');
const { decodeBase64Image } = require ('../lib/utils');
const { placeWatermarkOnVideo, concatVideosDemuxer, fixTBField, changeTrack } = require('../lib/ffmpegActions');
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
  
    /********************************************************************************************************************
     * SWAP VIDEOS PROCESS
     * Each process here depends on the completion of the other. In the specific case of refase, 
     * the faceId is required first to process the swaps, and it is required to have the swap videos 
     * to go on to mount the entire final video.
     ********************************************************************************************************************/
    
    // 1. Get photo, convert to binary and upload to reface API
    await writeFile(pathFinalPhoto, imageBuffer.data);
    const binaryFile = loadFileSync(pathFinalPhoto);

    const uploadReface = await uploadAsset(binaryFile, `image/${imageBuffer.ext}`);

    responseReface = JSON.parse(uploadReface);

    console.log(responseReface);

    // 2. preprocess the upload image (get de faceId)
    const faceId = await detectFaceInAsset(responseReface.urlFile, `image/${imageBuffer.ext}`);
    console.log(faceId);

    // 3. Swap videos and get urls
    const videosSwap = [
      { // 2
        intensity: 1,
        video_id: '0dd57817-70fe-40fc-9ac4-cd33e60dc3a4',
        facemapping: {
          '96863cb0-7eea-4608-a85a-015ba15a9303': [
            `${faceId}`
          ]
        }
      },
      { // 4
        intensity: 1,
        video_id: 'c4da7ca8-eef0-4152-8c1b-1c09675b38b3',
        facemapping: {
          '02c63a56-ad40-43a4-af7b-d44262e4fd68': [
            `${faceId}`
          ]
        }
      },
    ];

    const dataVideos = await swapDataVideos(videosSwap);
    console.log({dataVideos});

    // 4. Download videos, save in temp
    const dowloadVideos = await downloadSwapVideos(dataVideos);
    console.log({dowloadVideos});
    
    // 4.1 modify the TB to 24K (Reface send to 90K)
    // Here only the firts video swap (swap 1) - create rutine for check TB several videos
    const videoNewName = `${dowloadVideos[0].split('.')[0]}_up.mp4`;
    
    const dataTB = {
      input: path.join(DIR_TEMP, dowloadVideos[0]),
      output: path.join(DIR_TEMP, videoNewName),
      timeScale: 24000,
    }

    dowloadVideos[0] = videoNewName;

    console.log({dowloadVideos});

    await fixTBField(dataTB);

    // 5. write file .txt with info videos
    const fileVideosToTxt = formatFileVideos(dowloadVideos, 'Lunay_Video_');
    const nameFileVideos = `videos-${subName}.txt`;
    writeFileSync(path.join(DIR_TEMP, nameFileVideos), fileVideosToTxt);

    // 6. Merge videos (get final video)
    const dataFinal = {
      output: `${DIR_TEMP}/video-${subName}.mp4`,
      fileVideos: `${DIR_TEMP}/${nameFileVideos}`,
    };

    await concatVideosDemuxer(dataFinal);

    // 6.1 chage track in final video 
    const nameFinalVideo = `video-${subName}_final.mp4`;

    const dataTrack = {
      input: dataFinal.output,
      output: `${DIR_TEMP}/${nameFinalVideo}`,
      track: path.join(DIR_TEMP, 'Lunay-Audio.m4a'),
    }

    await changeTrack(dataTrack);

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

    const params = {
      'name': `Video ${subName}`, // Here get name from data form
      'description': 'description video!!!.' // Here create description from data form
    };
    /********************************************************************************************************************
     * The following processes are asynchronous, but I will use the technique that they run in parallel 
     * ([sync] since they can be independent) and it will continue until they all proceed (promises alll)
     ********************************************************************************************************************/

    // save image on cloud
    const photoLocation = uploadFile(pathFinalPhoto, nameFilePhoto, 'image', true);

    // save final video on cloud
    const videoLocation = uploadFile(dataFinal.output, nameFinalVideo, 'video', true);
    //const videoLocation = await uploadVimeo(dataFinal.output, params);

    // save sub videos on cloud
    let removeSubVideos = [];
    const allSubVideos = dowloadVideos.map((video, index) => {
      const pathFile = path.join(DIR_TEMP, video);
      removeSubVideos[index] = pathFile;
      return uploadFile(pathFile, video, 'video', true);
    });

    const footage = await Promise.all([photoLocation, videoLocation, ...allSubVideos]);

    removeFileSync(pathFinalPhoto);
    removeFileSync(dataFinal.output);
    removeFileSync(removeSubVideos);
    //removeFileSync(videoTemp);

    const response = { success: true, footage: footage };
    console.log(response);
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};
