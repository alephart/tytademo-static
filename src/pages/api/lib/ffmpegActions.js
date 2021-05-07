const ffmpeg = require('fluent-ffmpeg');

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

const concatVideosFluent = (data) => {
  // commmand:
  // ffmpeg -f concat -safe 0 -i ${fileVideos} -vcodec copy ${output}

  const {output, fileVideos} = data;

  return new Promise(async (resolve, reject) => {
    try {
      ffmpeg()
        .input(fileVideos)
        .inputOptions(['-f concat', '-safe 0'])
        .outputOptions('-vcodec copy')
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

const changeTrackFluent = (data) => {
  // commmand:
  // ffmpeg -i ${input} -i ${track} -c:v copy -map 0:v:0 -map 1:a:0 ${output}

  const {input, output, track} = data;

  return new Promise(async (resolve, reject) => {
    try {
      ffmpeg()
        .input(input)
        .input(track)
        .outputOptions(['-c:v copy', '-map 0:v:0', '-map 1:a:0'])
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

const placeWatermarkOnVideo = (data) => {
  // commmand:
  // ffmpeg -i {video} -i {watermark} \
  // -filter_complex "[1:v] scale=120/90 [mds1]; [0:v][mds1] overlay=x=(main_w-overlay_w)-50:y=(main_h-overlay_h)-50" \
  // {output}

  // ffmpeg -i input -i logo -filter_complex 'overlay=10:main_h-overlay_h-10' output
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

module.exports = {
  getMetaData,
  concatVideosFluent,
  changeTrackFluent,
  placeWatermarkOnVideo,
  fixTBNField,
}
