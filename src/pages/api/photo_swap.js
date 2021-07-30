const path = require('path');
const { uploadFile } = require('./lib/bucketS3API');
const { concatVideosTxtFluent, changeTrackFluent } = require('./lib/ffmpegActions');
const { writeFileSync, removeFileSync } = require('./lib/fileActions');
const { dataSwapVideos, downloadSwapVideos, buildFileVideos, adjustTbnVideos } = require('./lib/refaceActions');
const { videosListFemale, videosListMale, videoListAll } = require('./lib/dataVideos');
const { configAdmin } = require('./lib/config');
const { sendEmail } = require('./lib/sendEmail');

const DIR_TEMP = './temp1';
const NAME_TRACK_AUDIO = 'footage/TodoONada_Final_Audio.m4a';
const url = process.env.NEXT_PUBLIC_URL_SITE;

export default async (req, res) => {
    // get data from req body
    const {
      userId,
      faceId,
      character,
      pathFinalPhoto,
      locale,
      firstname,
      lastname,
      email,

      textOpenBrowser,
      textTitle,
      imgTitle,
      textMessage,
      imgButton,
      textButton,
      metaTitle,
    } = req.body;

    console.log(req.body);
    console.log(userId);
    console.log(faceId);
    console.log(pathFinalPhoto);
    console.log(character);

  //const { userId, pathFinalPhoto, character, faceId, locale } = JSON.parse(req.body);

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
      console.log('Videos List Character', videosListCharacter);
    
      const swapVideos = await dataSwapVideos(videosListCharacter);
      console.log('Data Swap Videos', swapVideos);
    
      // 4. Download videos, save in temp
      const dowloadVideos = await downloadSwapVideos(swapVideos);
      console.log('Dowload Videos', dowloadVideos);
      
      // 4.1 modify video the TBN to 90K - please if not necessary, do not use!
      const adjustVideos = await adjustTbnVideos(dowloadVideos, 90000);
      console.log('Adjust TBN Videos', adjustVideos);
    
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
    
      /********************************************************************************************************************
       * The following processes are asynchronous, but here will use the technique that they run in parallel 
       * ([sync] since they can be independent) and it will continue until they all proceed (promises all)
       ********************************************************************************************************************/
      
      // save final video on cloud
      const videoLocation = uploadFile(dataTrack.output, nameFinalVideo, 'video', true);

      // save sub videos on cloud [this will not necessary for the final version]
      let removeSubVideos = [];
      const allSubVideos = adjustVideos.map((video, index) => {
        const pathFile = path.join(DIR_TEMP, video);
        removeSubVideos[index] = pathFile;
        return uploadFile(pathFile, video, 'swap', true);
      });

      // save txt file on cloud
      const txtLocation = uploadFile(dataFinal.fileVideos, nameFileVideos, 'txt', true);
      
      const footage = await Promise.all([videoLocation, txtLocation, ...allSubVideos]);
    
      // TODO: generate list assets to remove - remove in async parallel
      removeFileSync(dataFinal.output);
      removeFileSync(dataTrack.output);
      removeFileSync(removeSubVideos);
      removeFileSync(dataFinal.fileVideos);

      const pathLocale = locale === 'es' ? '/es/' : '/';
      const urlShare = `${url}${pathLocale}share-experience/${userId}`;
      
      const dataAdmin = {
        url_video: footage[0], 
        footage,
      };

      // update database
      let jsonAdmin;

      try {
        const resAdmin = await fetch(`${configAdmin.url_api}/participant/${userId}`, {
          method: 'PUT',
          body:    JSON.stringify(dataAdmin),
          headers: { 'Content-Type': 'application/json' },
        });
      
        jsonAdmin = await resAdmin.json();

        console.log('jsonAdmin', jsonAdmin);


      } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, action: 'saveParticipant', error});
      }

      // pass data to send email

      // Fourth: Email sending
      const config = {
        host: process.env.AWS_SES_HOST,
        port: process.env.AWS_SES_PORT,
        user: process.env.AWS_SES_USERNAME,
        pass: process.env.AWS_SES_PASSWORD,
        from: process.env.NEXT_PUBLIC_FROM_EMAIL,
      };
      
      const urlOpenBrowser = `${url}${pathLocale}mailing-experience?share=${urlShare}`;

      const options = {
        locale,
        firstname,
        lastname,
        email,
        urlShare,
        urlOpenBrowser,
        textOpenBrowser,
        textTitle,
        imgTitle,
        textMessage,
        imgButton,
        textButton,
        metaTitle,
      };

      console.log(config, options)
      await sendEmail(config, options);

      
      res.status(200).send({ success: true });
    
    } else {
      res.status(200).json({ success: false, message: 'Not data faceId!' });
    }

  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};