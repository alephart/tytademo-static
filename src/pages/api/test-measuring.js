const path = require('path');
const { uploadFile } = require('./lib/bucketS3API');
const { concatVideosTxtFluent, changeTrackFluent } = require('./lib/ffmpegActions');
const { writeFileSync } = require('./lib/fileActions');
const { dataSwapVideos, downloadSwapVideos, buildFileVideos, adjustTbnVideos } = require('./lib/refaceActions');

const DIR_TEMP = './temp';
const NAME_TRACK_AUDIO = 'footage/TodoONada_Final_Audio.m4a';
const url = process.env.NEXT_PUBLIC_URL_SITE;

export default async (req, res) => {
  const { userId, character, faceId, locale } = JSON.parse(req.body);

  /********************************************************************************************************************
   * SWAP VIDEOS PROCESS
   * Each process here depends on the completion of the other. In the specific case of refase, 
   * the faceId is required first to process the swaps, and it is required to have the swap videos 
   * to go on to concat the entire final video.
   ********************************************************************************************************************/
  // 3. Swap videos and get ids
  const videosListCharacter = character === 'female' ? videosListFemale(faceId) : videosListMale(faceId);
  //console.log('Videos List Character', videosListCharacter);


    // 5. write file .txt with info videos
    const nameFileVideos = `videos-${userId}.txt`;
    writeFileSync( path.join(DIR_TEMP, nameFileVideos), buildFileVideos(adjustVideos, videoListAll, character) );
    
    // 6. Merge videos (get final video)
    const dataFinal = {
      output: `${DIR_TEMP}/video-${userId}.mp4`,
      fileVideos: `${DIR_TEMP}/${nameFileVideos}`,
    };
    console.log('dataFinal videos', dataFinal);
  
    await concatVideosTxtFluent(dataFinal);
  
    // 6.1 chage track in final video 
    const nameFinalVideo = `video-${userId}_final.mp4`;
  
    const dataTrack = {
      input: dataFinal.output,
      output: `${DIR_TEMP}/${nameFinalVideo}`,
      track: path.join(DIR_TEMP, NAME_TRACK_AUDIO),
    }
    console.log('track video and audio', dataTrack);

    await changeTrackFluent(dataTrack);

    const pathLocale = locale === 'es' ? '/es/' : '/';
    const data = {
      userId,
      urlShare: `${url}${pathLocale}share-experience/${userId}`, 
      urlJoin: `${url}${pathLocale}join-experience/${userId}`,
      urlPhoto: footage[0],
      urlVideo: footage[1],
      footage,
    };
    
    res.status(200).send({ success: true, data });

};