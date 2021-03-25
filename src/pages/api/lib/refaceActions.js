const path = require('path');
const fetch = require('node-fetch');
const { swapVideo } = require('../lib/refaceAPI');
const { writeFile } = require('../lib/fileActions');

const DIR_TEMP = './temp';

/**
 * Make the swap of the videos. 
 * First compose all the videos that were previously adjusted. 
 * After each video is traversed doing the swap face of the participant.
 * Finally it returns the list of the videos processed in the swap
 * @param {string} faceId The id face from photo in reface
 * @returns array list of the processed videos in the swap.
 */
const swapDataVideos = async (faceId) => {
  const videosData = [
    { // 2
      intensity: 1,
      video_id: 'b03bcf8f-d544-4725-bed6-3710255fba48',
      facemapping: {
        '8a3ad45c-fb07-48ad-818a-6a28af806233': [
          `${faceId}`
        ]
      }
    },
    { // 4
      intensity: 1,
      video_id: 'fdf3f31e-4f66-4b23-9dd4-ee0e523ebe84',
      facemapping: {
        '75d80011-45d1-4a5f-8aec-e7ffceb3d869': [
          `${faceId}`
        ]
      }
    },
    // { // 6
    //   intensity: 1,
    //   video_id: '68751096-db10-4e6f-b772-8fa873a04b36',
    //   facemapping: {
    //     '597ca71e-57b9-40d6-b7f3-eb8538f7536f': [
    //       `${faceId}`
    //     ]
    //   }
    // },

    { // 8
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

/**
 * Download all videos processed in swap and save in server path.
 * At the same time it's generating a list of videos to be joined.
 * Finally return the list of videos to join.
 * @param {array} videos List of videos processed in the swap.
 * @returns List of all videos to concat.
 */
const DownloadSwapAndGetVideoList = async (videos) => {

  let fileVideos = '';

  for(let i = 0; i < videos.length; i++) {
    const response = await fetch(videos[i].url);
    const videoStatus = await response.status;
    const buffer = await response.buffer();

    if (videoStatus == 200) {
      const pathVideo = path.join(DIR_TEMP, videos[i].name);
      await writeFile(pathVideo, buffer);

      const index = i * 2 + 1;

      if(index === 5) {
        fileVideos += `file vid-pt${index}.mp4\n`;
        fileVideos += `file vid-pt${index+1}.mp4\n`;
        fileVideos += `file vid-pt${index+2}.mp4\n`;
        fileVideos += `file ${videos[i].name}\n`;
      } else {
        fileVideos += `file vid-pt${index}.mp4\n`;
        fileVideos += `file ${videos[i].name}\n`;
      }
    }
  }

  return fileVideos;
};

module.exports = { swapDataVideos, DownloadSwapAndGetVideoList };