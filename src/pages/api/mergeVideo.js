const ffmpegConcat = require('ffmpeg-concat');
const ffmpeg = require('fluent-ffmpeg');
var fs = require('fs');

const data = {
  output: 'media/output.mp4',
  final: 'media/final.mp4',
  videos: [
    'media/skateboarder.mp4',
    'media/puppy.mp4',
    'media/disco.mp4',
  ],
  watermark: 'media/MDS.png',
  transition: {
    name: 'directionalWipe',
    duration: 500
  }
};

// concat mp4s together using 500ms directionalWipe transitions
async function transitionMergeVideos(data){
  try {
    await ffmpegConcat(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function concatWithFluent(data) {
  try {
    //const pathToSourceFile = path.resolve(__dirname, '../test/assets/testvideo-169.avi');
    // const pathToSourceFile = '/media/';
    // const readStream = fs.createReadStream(pathToSourceFile);
    const writeStream = fs.createWriteStream(data.output);

    // ffmpeg(readStream)
    // .addOutputOptions('-movflags +frag_keyframe+separate_moof+omit_tfhd_offset+empty_moov')
    // .format('mp4')
    // .pipe(writeStream);

    ffmpeg()
      .input(data.videos[0])
      .input(data.watermark)
      //.videoCodec('libx264')
      //.outputOptions('-pix_fmt yuv420p')
      .complexFilter([
        "[0:v]scale=640:-1[bg];[bg][1:v]overlay=W-w-10:H-h-10"
      ])
      .pipe(writeStream);

  } catch (error) {
    console.log(error);
    throw error;
  }
}

//transitionMergeVideos(data);
concatWithFluent(data);
//console.log(data.output);