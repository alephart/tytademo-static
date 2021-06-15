const path = require('path');
const { uploadFile } = require('./lib/bucketS3API');
const { concatVideosTxtFluent, changeTrackFluent } = require('./lib/ffmpegActions');
const { writeFileSync } = require('./lib/fileActions');
const { dataSwapVideos, downloadSwapVideos, buildFileVideos, adjustTbnVideos } = require('./lib/refaceActions');
const { videosListFemale, videosListMale, videoListAll } = require('./lib/dataVideos');

const DIR_TEMP = './temp';
const NAME_TRACK_AUDIO = 'footage/Audio_WIP13_1.m4a';
const url = process.env.NEXT_PUBLIC_URL_SITE;

export default async (req, res) => {
  const { userId, nameFilePhoto, pathFinalPhoto, character, faceId } = JSON.parse(req.body);

  try {
    if (faceId) {
      /********************************************************************************************************************
       * SWAP VIDEOS PROCESS
       * Each process here depends on the completion of the other. In the specific case of refase, 
       * the faceId is required first to process the swaps, and it is required to have the swap videos 
       * to go on to concat the entire final video.
       ********************************************************************************************************************/
      // 3. Swap videos and get ids
      const videosListCharacter = character === 'female' ? videosListFemale(faceId) : videosListMale(faceId);
      //console.log('Videos List Character', videosListCharacter);
    
      console.time("dataSwapVideos");
      const swapVideos = await dataSwapVideos(videosListCharacter);
      console.log('Data Swap Videos', swapVideos);
      console.timeEnd("dataSwapVideos");
    
      // 4. Download videos, save in temp
      console.time("downloadSwapVideos from DeepFake Service");
      const dowloadVideos = await downloadSwapVideos(swapVideos);
      console.log('Dowload Videos', dowloadVideos);
      console.timeEnd("downloadSwapVideos from DeepFake Service");
      
      // 4.1 modify video the TBN to 90K - please if not necessary, do not use!
      console.time("adjustTbnVideos if required");
      const adjustVideos = await adjustTbnVideos(dowloadVideos, 90000);
      console.log('Adjust TBN Videos', adjustVideos);
      console.timeEnd("adjustTbnVideos if required");
    
      // 5. write file .txt with info videos
      console.time("Write file .txt whit info videos");
      const nameFileVideos = `videos-${userId}.txt`;
      writeFileSync( path.join(DIR_TEMP, nameFileVideos), buildFileVideos(adjustVideos, videoListAll, character) );
      console.timeEnd("Write file .txt whit info videos");
      
      // 6. Merge videos (get final video)
      const dataFinal = {
        output: `${DIR_TEMP}/video-${userId}.mp4`,
        fileVideos: `${DIR_TEMP}/${nameFileVideos}`,
      };
    
      console.time("concatVideosFluent - ffmpeg direct exec");
      await concatVideosTxtFluent(dataFinal);
      console.timeEnd("concatVideosFluent - ffmpeg direct exec");
    
      // 6.1 chage track in final video 
      const nameFinalVideo = `video-${userId}_final.mp4`;
    
      const dataTrack = {
        input: dataFinal.output,
        output: `${DIR_TEMP}/${nameFinalVideo}`,
        track: path.join(DIR_TEMP, NAME_TRACK_AUDIO),
      }
    
      console.time("changeTrackFluent - ffmpeg add track audio");
      await changeTrackFluent(dataTrack);
      console.timeEnd("changeTrackFluent - ffmpeg add track audio");
    
      /********************************************************************************************************************
       * The following processes are asynchronous, but here will use the technique that they run in parallel 
       * ([sync] since they can be independent) and it will continue until they all proceed (promises all)
       ********************************************************************************************************************/
    
      console.time("uploadFile - save assets on S3");
      // save image on cloud
      const photoLocation = uploadFile(pathFinalPhoto, nameFilePhoto, 'image', true);
      
      // save final video on cloud
      const videoLocation = uploadFile(dataTrack.output, nameFinalVideo, 'video', true);
      
      // save sub videos on cloud [this will not necessary for the final version]
      //let removeSubVideos = [];
      const allSubVideos = adjustVideos.map((video, index) => {
        const pathFile = path.join(DIR_TEMP, video);
        //removeSubVideos[index] = pathFile;
        return uploadFile(pathFile, video, 'video', true);
      });
      
      const footage = await Promise.all([photoLocation, videoLocation, ...allSubVideos]);
      console.timeEnd("uploadFile - save assets on S3");
    
      /* 
      console.time("Remove files assets from system");
      // TODO: generate list assets to remove - remove in async parallel
      removeFileSync(pathFinalPhoto);
      removeFileSync(dataFinal.output);
      removeFileSync(dataTrack.output);
      removeFileSync(removeSubVideos);
      removeFileSync(dataFinal.fileVideos);
      console.timeEnd("Remove files assets from system");
      */

      const data = {
        userId,
        urlShare: `${url}/share-experience/${userId}`, 
        urlJoin: `${url}/join-experience/${userId}`,
        urlPhoto: footage[0],
        urlVideo: footage[1],
        footage,
      };

      console.log('data photo_swap', data);
      
      res.status(200).send({ success: true, data });
    
    } else {
      res.status(200).json({ success: false, message: 'Not data faceId!' });
    }

  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};