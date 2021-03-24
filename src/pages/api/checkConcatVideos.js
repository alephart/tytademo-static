const { placeWatermarkOnVideo, concatVideosDemuxer } = require('./lib/ffmpegActions');
const { createDirSync, removeFileSync, writeFile, loadFileBinarySync } = require('./lib/fileActions');

const DIR_TEMP = './temp';

const nameFileVideo = `video-test2.mp4`;

let dataFinal = {
  output: `${DIR_TEMP}/${nameFileVideo}`,
  fileVideos: `${DIR_TEMP}/videos-00f2q9kg8t9e635.txt`,
};

// remove posible video exists 
removeFileSync(dataFinal.output);

concatVideosDemuxer(dataFinal);
