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
const swapDataVideos = async (videosData) => {
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

const formatFileVideos = (videos, name) => {
  let file = '';

  for (let i = 0; i < videos.length; i++) {
    const idx = i * 2 + 1;

    if(idx === 3) {
      file += `file ${name}${idx}.mp4\n`;
      file += `file ${videos[i]}\n`;
      file += `file ${name}${idx+2}.mp4\n`;
    } else {
      file += `file ${name}${idx}.mp4\n`;
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