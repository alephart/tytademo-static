const path = require('path');
const cuid = require('cuid');
//import { PROCESS_ENUM } from '@/utils/globals';
const { uploadFile } = require('../lib/bucketS3API');
const { decodeBase64Image } = require ('../lib/utils');
const { placeWatermarkOnVideo, concatVideosDemuxer, changeTrack } = require('../lib/ffmpegActions');
const { createDirSync, removeFileSync, loadFileSync, writeFileSync, writeFile } = require('../lib/fileActions');
const { uploadAsset, detectFacesInAsset } = require('../lib/refaceAPI');
const { dataSwapVideos, downloadSwapVideos, buildFileVideos, adjustTbnVideos } = require('../lib/refaceActions');
const { videosListWoman, videosListMan, videoListAll } = require('../lib/dataVideos');

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
    const { character, photo = '', data = {} } = JSON.parse(req.body);
    let subName, nameFilePhoto, pathFinalPhoto, ext, response, faceId;
    
    createDirSync(DIR_TEMP);

    const nameTrackAudio = 'Lunay_TodoONada.m4a';

    /****************************************************************************
     * FIRST PART: PROCESS PHOTO AND REFACE RETURN FACEID
    ****************************************************************************/
    const imageBuffer = decodeBase64Image(photo);

    subName = cuid();
    ext = imageBuffer.ext;
    nameFilePhoto = `photo-${subName}.${ext}`;
    pathFinalPhoto = path.join(DIR_TEMP, nameFilePhoto);

    // 1. Get photo, convert to binary and upload to reface API
    await writeFile(pathFinalPhoto, imageBuffer.data);
    const binaryFile = loadFileSync(pathFinalPhoto);

    const uploadAssetReface = await uploadAsset(binaryFile, `image/${ext}`);

    const responseAsset = JSON.parse(uploadAssetReface);

    console.log(responseAsset);

    // 2. Get cant faces and faceId
    const faces = await detectFacesInAsset(responseAsset.urlFile, `image/${ext}`);
    console.log('faces >>>', faces);

    // Check faces for process
    if(faces.length === 0 || faces.length > 1) {
      removeFileSync(pathFinalPhoto);

      // return 
      response = { success: false, message: 'You must take your photo again.' };
      res.status(200).send(response);

    } else { // continue
      faceId = Object.values(faces[0])[1].id;
    }

    /****************************************************************************
     * SECOND PART: SWAP REFACE - FFMPEG - UPLOAD CLOUD
    ****************************************************************************/
    if (faceId) {  
      console.log(subName, nameFilePhoto, pathFinalPhoto, ext, faceId);
      /********************************************************************************************************************
       * SWAP VIDEOS PROCESS
       * Each process here depends on the completion of the other. In the specific case of refase, 
       * the faceId is required first to process the swaps, and it is required to have the swap videos 
       * to go on to concat the entire final video.
       ********************************************************************************************************************/
      // 3. Swap videos and get ids
      const videosListCharacter = character === 'woman' ? videosListWoman(faceId) : videosListMan(faceId);
      console.log('Videos List Character', videosListCharacter);

      const swapVideos = await dataSwapVideos(videosListCharacter);
      console.log('Data Swap Videos', swapVideos);

      // 4. Download videos, save in temp
      const dowloadVideos = await downloadSwapVideos(swapVideos);
      console.log('Dowload Videos', dowloadVideos);
      
      // 4.1 modify video the TBN to 90K
      const adjustVideos = await adjustTbnVideos(dowloadVideos, 90000);
      console.log('Adjust TBN Videos', adjustVideos);

      // 5. write file .txt with info videos
      const nameFileVideos = `videos-${subName}.txt`;
      writeFileSync( path.join(DIR_TEMP, nameFileVideos), buildFileVideos(adjustVideos, videoListAll, character) );

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
        track: path.join(DIR_TEMP, nameTrackAudio),
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

      /********************************************************************************************************************
       * The following processes are asynchronous, but I will use the technique that they run in parallel 
       * ([sync] since they can be independent) and it will continue until they all proceed (promises all)
       ********************************************************************************************************************/

      // save image on cloud
      const photoLocation = uploadFile(pathFinalPhoto, nameFilePhoto, 'image', true);

      // save final video on cloud
      const videoLocation = uploadFile(dataTrack.output, nameFinalVideo, 'video', true);

      // save sub videos on cloud
      let removeSubVideos = [];
      const allSubVideos = adjustVideos.map((video, index) => {
        const pathFile = path.join(DIR_TEMP, video);
        removeSubVideos[index] = pathFile;
        return uploadFile(pathFile, video, 'video', true);
      });

      const footage = await Promise.all([photoLocation, videoLocation, ...allSubVideos]);

      // TODO: generate list assets to remove - remove in async parallel
      removeFileSync(pathFinalPhoto);
      removeFileSync(dataFinal.output);
      removeFileSync(dataTrack.output);
      removeFileSync(removeSubVideos);
      //removeFileSync(videoTemp);

      response = { success: true, data: footage };
      console.log(response);
      
      res.status(200).json(response);

    } // eof faceId

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
