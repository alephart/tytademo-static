const ffmpeg = require('fluent-ffmpeg');
const { exec } = require('child_process');

// run Exec command promise
const runExecCommand = (command) => {
  //const generate = !isMac ? `${xvfb} ${command}` : command;
  //console.log(command);

  return new Promise((resolve, reject) => {
    let stdoutData = '', stderrData = '';
    
    try {
      exec(command, (error, stdout, stderr) => {
        if (error) {    
            console.log(`error exec: ${error.message}`);
            return reject(error);
        }
        if (stderr) {
            console.log(`stderr exec: ${stderr}`);
            stderrData += stderr;
        }
        if (stdout) {
            console.log(`stdout exec: ${stdout}`);
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

// concatenate several videos - all with same codecs (stream level)
const concatVideosDemuxer = async (data) => {
  const {output, fileVideos} = data;
  
  //const concat = `ffmpeg -f concat -safe 0 -i ${fileVideos} -vcodec copy ${output}`;
  const concat = `ffmpeg -f concat -safe 0 -i ${fileVideos} -vcodec copy ${output} > /dev/null 2>&1 < /dev/null`

  return await runExecCommand(concat);
}

// changeTrack
const changeTrack = async (data) => {
  const {input, output, track} = data;

  //const change = `ffmpeg -i ${input} -i ${track} -c:v copy -map 0:v:0 -map 1:a:0 ${output}`;

  const change = `ffmpeg -i ${input} -i ${track} -c copy ${output} > /dev/null 2>&1 < /dev/null`;

  return await runExecCommand(change);
}

/**
 * getMetaData: Get meta data from media file. Here get only data from streams [key 0].
 * @param {string} filePath Path to file video to get metaData
 * @param {string} stream   Key name final from stream key to get value
 * @returns value of metadata from stream key
 * TODO: create parameter that allows to select from which main key you must take the key=value final
 */
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

/**
 * concatVideosTxtFluent: Merge several videos from a text file list.
 * Use concat demuxer [http://trac.ffmpeg.org/wiki/Concatenate#demuxer].
 * @param {array} data Array data to process the videos concat: [output, fileVideos].
 *                     {string} output: path name to file video final.
 *                     {array} fileVideos: name file txt with path videos to concat.
 * @returns promise with process of concat video. Generate a video inside temp folder.
 */
const concatVideosTxtFluent = (data) => {
  // commmand:
  // ffmpeg -f concat -safe 0 -i ${fileVideos} -vcodec copy ${output} </dev/null > /dev/null 2>&1 &

  // ffmpeg -i input.mp4 -t 60 -f mp4 /mnt/a.mp4 </dev/null > /dev/null 2>&1 &

  const {output, fileVideos} = data;

  return new Promise(async (resolve, reject) => {
    try {
      ffmpeg()
        .renice(-2)
        .input(fileVideos)
        .inputOptions(['-f concat', '-safe 0', '-threads 8'])
        .outputOptions('-vcodec copy')
        .output(output)
        .on('end', function() {
          this.kill();
          resolve();
        })
        .on('error', reject)
        .run();

    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

/**
 * concatVideosArrayFluent: Merge several videos. *MORE PROCESS MORE - MORE DELAY*
 * Use Concat filter [http://trac.ffmpeg.org/wiki/Concatenate#filter]
 * @param {array} data Array data to process the videos concat: [output, videos].
 *                     {string} output: path name to file video final.
 *                     {array} videos: name videos to concat.
 * @returns promise with process of concat video. Generate a video inside temp folder.
 */
const concatVideosArrayFluent = (data) => {
  // commmand:
  // ffmpeg -y -i video1.mp4 -i video2.mp4 \
  // -filter_complex "[0:0][1:0]concat=n=2:v=1:a=0" output.mp4

  const {output, videos} = data;

  let stream = '';
  for (let i = 0; i < videos.length; i++) {
    stream += `[${i}:0]`;
  }

  return new Promise(async (resolve, reject) => {  
    try {
      videos
        .reduce((prev, video) => prev.input(video), ffmpeg())
        .inputOptions('-y')
        .complexFilter([`${stream}concat=n=${videos.length}:v=1:a=0`])
        .outputOptions('-c copy')
        .on('end', resolve)
        .on('error', reject)
        .save(output);

    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

/**
 * changeTrackFluent: Add track audio to video.
 * @param {array} data Array data to process the merge video + audio: [input, output, track].
 *                     {string} input: path name of video file.
 *                     {string} output: path name to video final file.
 *                     {string} track: path name audio file.
 * @returns promise with process of merge video + audio. Generate a video inside temp folder.
 */
const changeTrackFluent = (data) => {
  // commmand:
  // ffmpeg -i ${input} -i ${track} -c copy ${output}

  const {input, output, track} = data;

  return new Promise(async (resolve, reject) => {
    try {
      ffmpeg()
        .renice(-2)
        .input(input)
        .input(track)
        .outputOptions(['-c copy', '-threads 8'])
        .output(output)
        .on('end', function() {
          this.kill();
          resolve();
        })
        .on('error', reject)
        .run();

    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}
/**
 * fixTBNField: Adjust tbn (timescale) to a video
 * @param {array} data Array data to process the tbn: [input, output, timeScale].
 *                     {string} input: path name of video file.
 *                     {string} output: path name to video final file.
 *                     {number} timeScale: value fot the tbn to convert, default 90000.
 * @returns promise with process of video_track_timescale (tbn) to video.
 */
const fixTBNField = async (data) => {
  const {input, output, timeScale = 90000} = data;
  // commmand:
  // ffmpeg -i ${input} -video_track_timescale ${timeScale} ${output};

  return new Promise((resolve, reject) => {
    try {
      ffmpeg()
        .input(input)
        .outputOptions(`-video_track_timescale ${timeScale}`)
        .output(output)
        .on('end', resolve)
        .on('error', reject)
        .run();
      
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

// Note: watermark should not be a process, video clips must come with this watermaker...
const placeWatermarkOnVideo = (data) => {
  // commmand:
  // ffmpeg -i {video} -i {watermark} \
  // -filter_complex "[1:v] scale=120/90 [mds1]; [0:v][mds1] overlay=x=(main_w-overlay_w)-50:y=(main_h-overlay_h)-50" \
  // {output}

  // ffmpeg -i {input} -i {logo} -filter_complex 'overlay=10:main_h-overlay_h-10' {output}
  // ["overlay=x=(main_w-overlay_w)-50:y=(main_h-overlay_h)-50"]

  const {video, watermark, output} = data;

  return new Promise(async (resolve, reject) => {
    try {
      ffmpeg()
        .input(video)
        .input(watermark)
        .complexFilter(["[1:v] scale=120/90 [mds1]; [0:v][mds1] overlay=x=(main_w-overlay_w)-50:y=(main_h-overlay_h)-50"])
        .output(output)
        .on('end', resolve)
        .on('error', reject)
        .run();

    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

// Idea 2: first trascode to .ts format videos.
// Objective: concat videos whit protocol https://trac.ffmpeg.org/wiki/Concatenate#protocol
const transcodeVideo = (video) => {
  // commmand:
  // ffmpeg -i file.mp4 -c copy -bsf:v h264_mp4toannexb -f mpegts file.ts

  const name = video.split('.')[0];
  ffmpeg()
    .input(`${name}.mp4`)
    .outputOptions(['-c copy', '-bsf:v h264_mp4toannexb', '-f mpegts'])
    .output(`${name}.ts`)
    .run();
}

const concatProtocolVideos = (data) => {
  // commmands:

  // transcode only video character
  const tasks = data.videos.map(video => transcodeVideo(video));
  
}

module.exports = {
  getMetaData,
  concatVideosTxtFluent,
  concatVideosArrayFluent,
  changeTrackFluent,
  placeWatermarkOnVideo,
  fixTBNField,
  concatVideosDemuxer,
  changeTrack,
}
