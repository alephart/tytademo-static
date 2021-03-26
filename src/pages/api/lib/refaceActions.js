const path = require('path');
const fetch = require('node-fetch');
const { swapVideo } = require('../lib/refaceAPI');
const { writeFileSync } = require('../lib/fileActions');

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
    const tasks = videosData.map(data => swapVideo(data));

    const results = await Promise.all(tasks);
    console.log(results);

    return results;

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
const downloadSwapVideos = async (videos) => {

  const tasks = videos.map(async video => {
    let name = '';
    const response = await fetch(video.videoInfo.video_path);
    const status = await response.status;
    const buffer = await response.buffer();

    if (status == 200) {
      name = `${video.videoInfo.id}.mp4`;
      writeFileSync(path.join(DIR_TEMP, name), buffer);
    }

    return name;

  });

  const results = await Promise.all(tasks);
  
  console.log(results);

  return results;
};

const formatFileVideos = (videos) => {
  let file = '';

  for (let i = 0; i < videos.length; i++) {
    const idx = i * 2 + 1;

    if(idx === 5) {
      file += `file vid-pt${idx}.mp4\n`;
      file += `file vid-pt${idx+1}.mp4\n`;
      file += `file vid-pt${idx+2}.mp4\n`;
      file += `file ${videos[i]}\n`;
    } else {
      file += `file vid-pt${idx}.mp4\n`;
      file += `file ${videos[i]}\n`;
    }
  }

  console.log(file);

  return file;
};

module.exports = { 
  swapDataVideos, 
  downloadSwapVideos, 
  formatFileVideos 
};