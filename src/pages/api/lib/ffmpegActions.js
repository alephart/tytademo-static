const ffmpegConcat = require('ffmpeg-concat');
const ffmpeg = require('fluent-ffmpeg');
const { exec } = require('child_process');

const isMac = process.platform === "darwin";
const xvfb = `xvfb-run -s "-a -screen 0 1280x1024x24"`;

// run Exec command promise
const runExecCommnad = (command) => {
  const generate = !isMac ? `${xvfb} ${command}` : command;

  return new Promise((resolve, reject) => {
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
      reject(err);
      //throw err;
    }
  });
}

const getMetaData = (filePath, stream = 'all') => {
  return new Promise((resolve, reject) => {
    try {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if(err) {
          reject(err);
        }
        resolve(metadata.streams[0][stream]);
    });
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

// concat mp4s together using transitions (using ffmpeg-concat - only videos)
// this process not run on linux (ubuntu) - use transitionMergeVideosExec()
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
  // command: 
  // xvfb-run -s "-ac -screen 0 1280x1024x24" ffmpeg-concat -t circleopen -d 500 -o out.mp4 video1.mp4 video4.mp4
  
  const concat = `ffmpeg-concat -t ${transition.name} -d ${transition.duration} -o ${output} ${videos[0]} ${videos[1]}`;

  return await runExecCommnad(concat);
}

// concatenate several videos - all with same codecs (stream level)
const concatVideosDemuxer = async (data) => {
  const {output, fileVideos, audio = true} = data;
  
  //const concat = audio ? `ffmpeg -f concat -safe 0 -i ${fileVideos} -vcodec copy ${output}` : `ffmpeg -f concat -safe 0 -i ${fileVideos} ${output}`;
  const concat = `ffmpeg -f concat -safe 0 -i ${fileVideos} -c copy ${output}`;

  return await runExecCommnad(concat);
}

const fixTBNField = async (data) => {
  const {input, output, timeScale = 90000} = data;

  const fixTB = `ffmpeg -i ${input} -video_track_timescale ${timeScale} ${output}`;

  return await runExecCommnad(fixTB);
}

const changeTrack = async (data) => {
  const {input, output, track} = data;

  const change = `ffmpeg -i ${input} -i ${track} -c:v copy -map 0:v:0 -map 1:a:0 ${output}`;

  return await runExecCommnad(change);

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
      .complexFilter(["[1:v] scale=120/60 [toyota1]; [0:v][toyota1] overlay=x=(main_w-overlay_w)-50:y=(main_h-overlay_h)-50"])
      // .on('start', function)
      .on('end', resolve)
      .on('error', reject)
      .output(data.output)
      .run();
      
    } catch (err) {
      console.error(err);
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
      console.error(err);
      reject(err);
    }
  });
}

const createThumbFromVideo = async (data) => {
  // scale=300/169 (1.777)
  // command:
  // ffmpeg -i video1.mp4 -frames 1 -an -s 300x169 -ss 1 test-thumb.jpg
  // ffmpeg -i video1.mp4 -ss 00:00:01 -frames:v 1 -an -s 300x169 test-thumb.jpg
  // ffmpeg -i video1.mp4 -ss 00:00:01 -frames:v 1 test-thumb.jpg

  const thumbCmd = `ffmpeg -i ${data.video} -ss 00:00:01 -frames:v 1 -s 300x170 ${data.output}`;

  return await runExecCommnad(thumbCmd);
}

module.exports = {
  transitionMergeVideos,
  placeWatermarkOnVideo,
  placeImageOnVideo,
  concatVideosDemuxer,
  transitionMergeVideosExec,
  createThumbFromVideo,
  fixTBNField,
  changeTrack,
  getMetaData,
}
