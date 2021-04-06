const path = require('path');
const cuid = require('cuid');
import { PROCESS_ENUM } from '@/utils/globals';
const { uploadFile } = require('../lib/bucketS3API');
const { decodeBase64Image } = require ('../lib/utils');
const { placeWatermarkOnVideo, concatVideosDemuxer, fixTBField, changeTrack } = require('../lib/ffmpegActions');
const { createDirSync, removeFileSync, loadFileSync, writeFileSync, writeFile } = require('../lib/fileActions');
const { uploadAsset, detectFacesInAsset } = require('../lib/refaceAPI');
const { swapDataVideos, downloadSwapVideos, formatFileVideos } = require('../lib/refaceActions');

const DIR_TEMP = './temp';

const next = false;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
  },
};

export default async (req, res) => {
  try {
    const { process, photo = '', data = {} } = JSON.parse(req.body);
    let subName, nameFilePhoto, pathFinalPhoto, ext, response, faceId;
    
    createDirSync(DIR_TEMP);

    if(process === PROCESS_ENUM.take) {
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
  
      // 2. Check cant faces: faces == 0 => return; faces == 1 => faceId; faces > 1 => select face.
      const faces = await detectFacesInAsset(responseAsset.urlFile, `image/${ext}`);
      console.log({ faces });

      if(faces.length === 0) { 
        // return 
        response = { success: false, message: 'No faces, please try again with your face!' };
        res.status(200).send(response);

      } else if(faces.length > 1) {
        // return with data
        const dataReturn = {
          id: subName,
          namePhoto: nameFilePhoto,
          faces: faces,
        };
        
        response = { success: false, data: dataReturn, message: 'Select a face for swap!' };
        res.status(200).send(response);

      } else {
        faceId = faces[0].id;
      }
    } 
    
    if (process === PROCESS_ENUM.select) {
      subName = data.id;
      ext = data.namePhoto.split('.')[1];
      nameFilePhoto = data.namePhoto;
      pathFinalPhoto = path.join(DIR_TEMP, nameFilePhoto);
      faceId = data.faceId;
    }

    if (faceId) {
      
      console.log(data);
  
      console.log(subName, nameFilePhoto, pathFinalPhoto, ext, faceId);
      /********************************************************************************************************************
       * SWAP VIDEOS PROCESS
       * Each process here depends on the completion of the other. In the specific case of refase, 
       * the faceId is required first to process the swaps, and it is required to have the swap videos 
       * to go on to concat the entire final video.
       ********************************************************************************************************************/
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

      console.log('videosSwap', videosSwap);

      const dataVideos = await swapDataVideos(videosSwap);
      console.log('dataVideos', dataVideos);

      // 4. Download videos, save in temp
      const dowloadVideos = await downloadSwapVideos(dataVideos);
      console.log('dowloadVideos', dowloadVideos);
      
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
      const videoLocation = uploadFile(dataTrack.output, nameFinalVideo, 'video', true);
      //const videoLocation = await uploadVimeo(dataFinal.output, params);

      // save sub videos on cloud
      let removeSubVideos = [];
      const allSubVideos = dowloadVideos.map((video, index) => {
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
