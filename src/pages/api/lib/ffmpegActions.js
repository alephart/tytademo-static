const ffmpegConcat = require('ffmpeg-concat');
const ffmpeg = require('fluent-ffmpeg');
var fs = require('fs');

// concat mp4s together using transitions (using ffmpeg-concat - only videos)
const transitionMergeVideos = async (data) => {
  try {
    await ffmpegConcat(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const placeWatermarkOnVideo = async (data) => {
  // commmand:
  // ffmpeg -i video.mp4 -i watermark.png \
  // -filter_complex "overlay=x=(main_w-overlay_w)-50:y=(main_h-overlay_h)-50" \
  // output.mp4

  return new Promise(async (resolve, reject) => {
    try {
      ffmpeg()
      .input(data.video)
      .input(data.watermark)
      .complexFilter(["overlay=x=(main_w-overlay_w)-50:y=(main_h-overlay_h)-50"])
      // .on('start', function)
      .on('end', resolve)
      .on('error', reject)
      .output(data.output)
      .run();
      
    } catch (err) {
      console.error(err);
      if(err) throw err;
      reject(err);
    }

  });
}

const name = (data) => {
  // command:
  // ffmpeg -loop 1 -framerate 24 -t 5 -i image.png \ 
  // -f lavfi -t 1 -i anullsrc \ 
  // -i video.mp4 \ 
  // -filter_complex "[2:v]scale=320:240,setsar=sar=1[video];[0:v][1:a][video][2:a]concat=n=2:v=1:a=1" 
  // output.mp4


  try {
    ffmpeg()
    .input(data.image)
    .loop(1)
    .withFpsInput(24)
    .outputOptions(['-t 5'])
    .input(data.video)
    .inputOptions(['-f lavfi -t 1 -i anullsrc'])
    .complexFilter(['[2:v]scale=320:240,setsar=sar=1,3333[video];[0:v][1:a][video][2:a]concat=n=2:v=1:a=1'])
    .output(data.output)
    .run()

  } catch (err) {
    
  }
};

exports.transitionMergeVideos = transitionMergeVideos;
exports.placeWatermarkOnVideo = placeWatermarkOnVideo;