const path = require('path');
const fetch = require('node-fetch');
const { swapVideo } = require('../lib/refaceAPI');
const { fixTBNField, getMetaData } = require('../lib/ffmpegActions');
const { writeFileSync } = require('../lib/fileActions');
const { isValidJSON } = require('../lib/utils');
let { logmailer, logmail } = require("../lib/logmailer");

const DIR_TEMP = './temp1';

/**
 * Make the swap of the videos.
 * Each video is traversed doing the swap face of the participant.
 * Finally it returns the list of the videos processed in the swap.
 * @param {array} videosData  The info about video_id, facemapping and id face from photo in reface
 * @returns array list of the processed videos in the swap.
 */
const dataSwapVideos = async (videosData) => {
  try {
    const tasks = videosData.map(async data => {
      let json;
      let attempt = true;

      // here attempt while response not json correct
      while(attempt) {
        json = await swapVideo(data);
        console.log(json);
        attempt = !isValidJSON(JSON.stringify(json));
      }

      return json;

    });

    const results = await Promise.all(tasks);
    console.log('----------excelent!!!!----------');
    
    return results;

  } catch (error) {
    console.error(error);
    logmail.summary.add("Starting time", `App run now: ${new Date().toISOString()}`);
    logmail.errors.add("refaceActions ::dataSwapVideos::", "Problem when swap videos promises");
    logmail.errors.add(null, error);
    logmail.errors.add(null, json);

    logmailer.sendMail(err => {
        if (err) {
            console.log("error while sending", err);
        } else {
            console.log("error mail sent successfully");
        }
    });
    throw error;
  }
};

/**
 * Download all videos processed in swap and save in server path.
 * At the same time it's generating a list of videos to be joined.
 * Finally return the list of videos to join.
 * @param {array} videos  List of videos processed in the swap.
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
  
  return results;
};

/**
 * This function builds the list of videos to concatenate.
 * @param {array} videosSwap List of videos that were swapped.
 * @param {array} videosList List of all the videos that must be concatenated at the end.
 * @param {string} character Character type selected by the user.
 * @returns Text string with list of videos to contact by ffmpeg.
 */
const buildFileVideos = (videosSwap, videosList, character) => {
  let file = '# files video name to concat\n', index = 0;

  videosList.forEach(video => {
    if (video.character === character || video.character === 'mix') {
      file += `file ${videosSwap[index]}\n`;
      index ++;
    } else {
      file += `file ${video.name}\n`;
    }
  });

  return file;
};

// Step 4.1
/**
 * Modify the TBN video time scale to timeScale (Reface change).
 * Check TBN several videos and convert only modified.
 * @param {array} videosData List videos processed in swap and store in temp.
 * @param {number} timeScale Number of timescale to convert.
 * @returns Array with new name videos to concat.
 */
 const adjustTbnVideos = async (videosData, timeScale = 90000) => {
  try {
    const tasks = videosData.map(async video => {
      const pathVideo = path.join(DIR_TEMP, video);
      const timeBaseActual = await getMetaData(pathVideo, 'time_base');
    
      if(timeBaseActual !== `1/${timeScale}`) {
        const videoNewName = `${video.split('.')[0]}_tbn.mp4`;
        
        const dataTBN = {
          input: pathVideo,
          output: path.join(DIR_TEMP, videoNewName),
          timeScale: timeScale,
        }
    
        await fixTBNField(dataTBN);
    
        return videoNewName;

      } else {
  
        return video;
      }
    });
    
    const results = await Promise.all(tasks);
    
    return results;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { 
  dataSwapVideos, 
  downloadSwapVideos, 
  buildFileVideos,
  adjustTbnVideos,
};