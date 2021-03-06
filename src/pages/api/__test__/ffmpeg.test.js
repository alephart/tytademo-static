const commandExistsSync = require('command-exists').sync;
const { transitionMergeVideos, placeWatermarkOnVideo, placeImageOnVideo } = require('../lib/ffmpegActions');
const { checkFileSync, removeFileSync } = require('../lib/fileActions');
const path = require('path');

const itif = (condition) => condition ? it : it.skip;
const ffmpegExist = commandExistsSync('ffmpeg');
const DIR_TEMP = './temp';

describe('ffmpeg', () => {

  test('it should check and return true if ffmpeg is installed on server', () => {
    expect(ffmpegExist).toBeTruthy();
  });

  itif(ffmpegExist)('it should join 2 videos with transition concat', async (done) => {
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

    await transitionMergeVideos(data);

    const existVideoOutput = checkFileSync(data.output);
    
    done();
    
    expect(existVideoOutput).toBeTruthy();
    
  }, 30000);
  
  itif(ffmpegExist)('it should place a watermark on a video', async (done) => {
    const data = {
      output: `${DIR_TEMP}/test2.mp4`,
      video: `${DIR_TEMP}/video2.mp4`,
      watermark: `${DIR_TEMP}/MDS.png`,
    };
    
    removeFileSync(data.output);
    
    await placeWatermarkOnVideo(data);
    
    const existVideoOutput = checkFileSync(data.output);
    
    expect(existVideoOutput).toBeTruthy();
    
    done();
  });

  itif(ffmpegExist)('it should place a image on a video', async (done) => {
    const data = {
      output: `${DIR_TEMP}/test3.mp4`,
      video: `${DIR_TEMP}/test2.mp4`,
      watermark: `${DIR_TEMP}/test-photo.png`,
    };
    
    removeFileSync(data.output);
    
    await placeImageOnVideo(data);
    
    const existVideoOutput = checkFileSync(data.output);
    
    expect(existVideoOutput).toBeTruthy();
    
    done();
  });

  // itif(ffmpegExist)('it should join 1 image and 1 video. The image must be shown for a few seconds without the audio, the video must continue.', async (done) => {
  //   const data = {
  //     output: `${media}/test3.mp4`,
  //     video: `${media}/video1.mp4`,
  //     image: `${DIR_TEMP}/photo-0.png`,
  //   };

  //   removeFileSync(data.output);

  //   await transitionMergeVideos(data);

  //   const existVideoOutput = checkFileSync(data.output);
    
  //   done();
    
  //   expect(existVideoOutput).toBeTruthy();
    
  // }, 30000);

  itif(ffmpegExist)('test anything', () => {
    const value = 2;
    expect(value).toBe(2);
  });

});


