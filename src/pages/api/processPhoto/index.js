const path = require('path');
const cuid = require('cuid');
const fetch = require('node-fetch');
const {decodeBase64Image} = require ('../lib/imageBase64');
const { placeWatermarkOnVideo, concatVideosDemuxer } = require('../lib/ffmpegActions');
const { createDirSync, removeFileSync, writeFile, loadFileBinarySync } = require('../lib/fileActions');
const { uploadFile } = require('../lib/bucketMedia');
const { uploadAsset, detectFaceInAsset, swapVideo} = require('../lib/refaceAPI');

const DIR_TEMP = './temp';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
  },
};

const dataVideos = async (faceId) => {
  const videosData = [
    {
      intensity: 1,
      video_id: 'b03bcf8f-d544-4725-bed6-3710255fba48',
      facemapping: {
        '8a3ad45c-fb07-48ad-818a-6a28af806233': [
          `${faceId}`
        ]
      }
    },
    {
      intensity: 1,
      video_id: 'fdf3f31e-4f66-4b23-9dd4-ee0e523ebe84',
      facemapping: {
        '75d80011-45d1-4a5f-8aec-e7ffceb3d869': [
          `${faceId}`
        ]
      }
    },
    {
      intensity: 1,
      video_id: '71ceccf3-b309-4820-9040-bbb5c705f7a7',
      facemapping: {
        '97faf846-8549-4a51-ac9d-ec5ba6869463': [
          `${faceId}`
        ]
      }
    },
  ];

  try {
    let videos = [{ url: '', name: '' }];
  
    for(let i = 0; i < videosData.length; i++) {
      const dataSwap = await swapVideo(videosData[i]);
      const url = dataSwap.videoInfo.video_path;
      const name = `${dataSwap.videoInfo.id}.mp4`;
      videos[i] = {url: url, name: name};

    }
    
    return videos;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

const writeVideosToLocal = async (videos) => {

  let fileVideos = '';

  for(let i = 0; i < videos.length; i++) {
    const response = await fetch(videos[i].url);
    const videoStatus = await response.status;
    const buffer = await response.buffer();

    if (videoStatus == 200) {
      const pathVideo = path.join(DIR_TEMP, videos[i].name);
      await writeFile(pathVideo, buffer);
      const fileName = `file ${videos[i].name}\n`;
      fileVideos += fileName;
    }
  }

  return fileVideos;
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
    
    // SWAP VIDEO
    // 1. convert photo to binary format
    // const binaryFile = await imageBuffer.blob();
    const binaryFile = await loadFileBinarySync(pathFinalPhoto);
    console.log(imageBuffer.ext);


    // // 2. upload asset to reface and get url asset (signed_url generated in upload)
    const uploadReface = await uploadAsset(binaryFile, `image/${imageBuffer.ext}`);

    responseReface = JSON.parse(uploadReface);

    console.log(responseReface);

    // // 3. preprocess the upload image (get de faceId)
    const faceId = await detectFaceInAsset(responseReface.urlFile, `image/${imageBuffer.ext}`);
    console.log(faceId);

    // // 4. Swap videos and get url
    const videos = await dataVideos(faceId);
    console.log(videos);

    // // 5. Download videos, save in temp
    const fileVideosToLocal = await writeVideosToLocal(videos);
    console.log(fileVideosToLocal);

    // 6. write file with info videos
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

    // create watermark into video 
    let videoTemp = dataFinal.output;

    dataFinal = {
      output: `${DIR_TEMP}/temp-${videoTemp}`,
      video: videoTemp,
      watermark: `${DIR_TEMP}/FeaturingYou.png`,
    };

    // remove posible video exists 
    removeFileSync(dataFinal.output);

    await placeWatermarkOnVideo(dataFinal);

    // 8. upload video to VIMEO and get url
    const videoLocation = await uploadFile(dataFinal.output, nameFileVideo, 'video', true);

    // 9. save photo in cloud
    const imageLocation = await uploadFile(pathFinalPhoto, nameFilePhoto, 'image', true);

    // remove files (image and videos) from server
    removeFileSync(pathFinalPhoto);
    //removeFileSync(videoTemp);
    //removeFileSync(data.output);

    res.status(200).json({ response: 'success', photo: imageLocation, video: videoLocation });
    //res.status(200).json({ response: 'success' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
