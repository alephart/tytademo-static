const ffmpegConcat = require('ffmpeg-concat');
const ffmpeg = require('fluent-ffmpeg');
const { exec } = require('child_process');
const fs = require('fs');

const isMac = process.platform === "darwin";

// concat mp4s together using transitions (using ffmpeg-concat - only videos)
const transitionMergeVideos = async (data) => {
  try {
    await ffmpegConcat(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const transitionMergeVideosExec = async (data) => {
  const {output, videos, transition} = data;

  // xvfb-run -s "-ac -screen 0 1280x1024x24" ffmpeg-concat -t circleopen -d 500 -o out.mp4 video1.mp4 video4.mp4
  const xvfb = `xvfb-run -s "-ac -screen 0 1280x1024x24"`;
  const concat = `ffmpeg-concat -t ${transition.name} -d ${transition.duration} -o ${output} ${videos[0]} ${videos[1]}`;
  const generate = !isMac ? `${xvfb} ${concat}` : concat;

  return new Promise(async (resolve, reject) => {
    let stdoutData = '', stderrData = '';
    
    try {
      exec(generate, (error, stdout, stderr) => {
        if (error) {    
            console.log(`error: ${error.message}`);
            return reject(error);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            stderrData += stderr;
        }
        if (stdout) {
            console.log(`stdout: ${stdout}`);
            stdoutData += stdout;
        }

        if(stderrData) {
          reject(stderrData);
        } else {
          resolve(stdoutData);
        }
      });

    } catch (err) {
      console.error(err);
      if(err) throw err;
      reject(err);
    }
  });
}

const concatVideos = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      ffmpeg()
      .input(data.videos[0])
      .input(data.videos[1])
      .complexFilter(["[0:v:0][0:a:0][1:v:0]concat=n=2:v=1:a=1[outv][outa]"])
      .on('end', resolve)
      .on('error', reject)
      .output(data.output)
    } catch (err) {
      console.error(err);
      if(err) throw err;
      reject(err);
    }
  });
}

const placeWatermarkOnVideo = async (data) => {
  // commmand:
  // ffmpeg -i video.mp4 -i watermark.png \
  // -filter_complex "[1:v] scale=120/90 [mds1]; [0:v][mds1] overlay=x=(main_w-overlay_w)-50:y=(main_h-overlay_h)-50" \
  // output.mp4

  return new Promise(async (resolve, reject) => {
    try {
      ffmpeg()
      .input(data.video)
      .input(data.watermark)
      .complexFilter(["[1:v] scale=120/35 [mds1]; [0:v][mds1] overlay=x=(main_w-overlay_w)-50:y=(main_h-overlay_h)-50"])
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

const placeImageOnVideo = async (data) => {
  // scale=120/90 (1.333333)
  // command:
  // ffmpeg -i video.mp4 -i image.png \
  // -filter_complex "[1:v] scale=120/90 [mds1]; [0:v][mds1] overlay=20:20" \
  // output.mp4

  return new Promise(async (resolve, reject) => {
    try {
      ffmpeg()
      .input(data.video)
      .input(data.watermark)
      .complexFilter(["[1:v] scale=120/90 [mds1]; [0:v][mds1] overlay=50:50"])
      // .on('start', function)
      .on('end', resolve)
      .on('error', reject)
      .output(data.output)
      .run();
  
    } catch (err) {
      throw err;
    }
  });
}

// const concatVideoImage = (data) => {
//   // command:
//   // ffmpeg -loop 1 -framerate 24 -t 5 -i image.png \ 
//   // -f lavfi -t 1 -i anullsrc \ 
//   // -i video.mp4 \ 
//   // -filter_complex "[2:v]scale=320:240,setsar=sar=1[video];[0:v][1:a][video][2:a]concat=n=2:v=1:a=1" 
//   // output.mp4

//   try {
//     ffmpeg()
//     .input(data.image)
//     .loop(1)
//     .withFpsInput(24)
//     .outputOptions(['-t 5'])
//     .input(data.video)
//     .inputOptions(['-f lavfi -t 1 -i anullsrc'])
//     .complexFilter(['[2:v]scale=320:240,setsar=sar=1,3333[video];[0:v][1:a][video][2:a]concat=n=2:v=1:a=1'])
//     .output(data.output)
//     .run()

//   } catch (err) {
    
//   }
// };

module.exports = {
  transitionMergeVideos,
  placeWatermarkOnVideo,
  placeImageOnVideo,
  concatVideos,
  transitionMergeVideosExec,
}