const commandExistsSync = require('command-exists').sync;

const { 
  placeWatermarkOnVideo, 
  placeImageOnVideo, 
  transitionMergeVideosExec,
  createThumbFromVideo,
  concatVideosDemuxer,
} = require('../lib/ffmpegActions');

const { checkFileSync, removeFileSync } = require('../lib/fileActions');
const path = require('path');

const itif = (condition) => condition ? it : it.skip;
const ffmpegExist = commandExistsSync('ffmpeg');
const DIR_TEMP = './temp';

describe('ffmpeg', () => {

  test('it should check and return true if ffmpeg is installed on server', () => {
    expect(ffmpegExist).toBeTruthy();
  });

  itif(ffmpegExist)('it should join 2 videos with transition exec + concat', async (done) => {
    const data = {
      output: `${DIR_TEMP}/test.mp4`,
      videos: [
        `${DIR_TEMP}/video1.mp4`,
        `${DIR_TEMP}/video4.mp4`,
      ],
      transition: {
        name: 'directionalWipe',
        duration: 300
      }
    };

    removeFileSync(data.output);

    await transitionMergeVideosExec(data);
    
    done();
    
    expect(checkFileSync(data.output)).toBeTruthy();
  }, 30000);

  itif(ffmpegExist).only('it should join 8 videos with file-videos and demuxer (same codecs)', async (done) => {
    const data = {
      output: `${DIR_TEMP}/test.mp4`,
      fileVideos: `${DIR_TEMP}/videos-list.txt`,
    };

    removeFileSync(data.output);

    await concatVideosDemuxer(data);
    
    done();
    
    expect(checkFileSync(data.output)).toBeTruthy();
  }, 30000);
  
  itif(ffmpegExist)('it should place a watermark on a video', async (done) => {
    const data = {
      output: `${DIR_TEMP}/test2.mp4`,
      video: `${DIR_TEMP}/video2.mp4`,
      watermark: `${DIR_TEMP}/MDS.png`,
    };

    let response = '';

    try {
      removeFileSync(data.output);
      
      response = await placeWatermarkOnVideo(data);
      
    } catch (error) {
      console.log(error);
      throw error;  
    }
    
    done();
    
    expect(response).toBeTruthy();
  });

  itif(ffmpegExist)('it should place a image on a video', async (done) => {
    const data = {
      output: `${DIR_TEMP}/test3.mp4`,
      video: `${DIR_TEMP}/test2.mp4`,
      watermark: `${DIR_TEMP}/test-photo.png`,
    };
    
    removeFileSync(data.output);
    
    await placeImageOnVideo(data);
    
    done();
    
    expect(checkFileSync(data.output)).toBeTruthy();
  });

  itif(ffmpegExist).skip('it should create and return a thumbnail image of a video frame', async (done) => {
    
    const data = {
      output: `${DIR_TEMP}/thumb-test.jpg`,
      video: `${DIR_TEMP}/video1.mp4`,
    };

    removeFileSync(data.output);

    await createThumbFromVideo(data);
    
    done();

    expect(checkFileSync(data.output)).toBeTruthy();
  });

});
