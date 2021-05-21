const commandExistsSync = require('command-exists').sync;
const { checkFileSync, removeFileSync } = require('../lib/fileActions');
const path = require('path');
const { 
  concatVideosTxtFluent,
  concatVideosArrayFluent,
  changeTrackFluent,
  placeWatermarkOnVideo, 
  transitionMergeVideosExec,
  createThumbFromVideo,
  concatVideosDemuxer,
} = require('../lib/ffmpegActions');

const itif = (condition) => condition ? it : it.skip;

const ffmpegExist = commandExistsSync('ffmpeg');
const DIR_TEMP = './temp';

describe('fluent ffmpeg', () => {

  test('it should check and return true if ffmpeg is installed on server', () => {
    expect(ffmpegExist).toBeTruthy();
  });
  
  itif(ffmpegExist)('it should join videos from txt file with fluent-ffmpeg', async (done) => {
    const data = {
      output: `${DIR_TEMP}/video-test.mp4`,
      fileVideos: `${DIR_TEMP}/videos-test.txt`,
    };

    try {
      removeFileSync(data.output);
  
      console.time(':::::concat videos:::::');
      await concatVideosTxtFluent(data);
      console.timeEnd(':::::concat videos:::::');

    } catch (error) {
      console.log(error);
      throw error;  
    }

    done();

    expect(checkFileSync(data.output)).toBeTruthy();

  }, 30000);

  itif(ffmpegExist).skip('it should join videos from array data with fluent-ffmpeg', async (done) => {
    const data = {
      output: `${DIR_TEMP}/video-test.mp4`,
      videos: [
        `${DIR_TEMP}/footage/001.mp4`,
        `${DIR_TEMP}/002-SIDEKICK-SWAP.mp4`,
        `${DIR_TEMP}/footage/003.mp4`,
        `${DIR_TEMP}/footage/004-WOMAN.mp4`,
        `${DIR_TEMP}/footage/005.mp4`,
        `${DIR_TEMP}/006-SIDEKICK-SWAP.mp4`,
        `${DIR_TEMP}/footage/007.mp4`,
        `${DIR_TEMP}/008-SIDEKICK-SWAP.mp4`,
        `${DIR_TEMP}/footage/009.mp4`,
        `${DIR_TEMP}/footage/010-WOMAN.mp4`,
        `${DIR_TEMP}/footage/011.mp4`,
        `${DIR_TEMP}/footage/012-WOMAN.mp4`,
      ],
    };

    try {
      removeFileSync(data.output);
  
      console.time(':::::concat videos array:::::');
      await concatVideosArrayFluent(data);
      console.timeEnd(':::::concat videos array:::::');

    } catch (error) {
      console.log(error);
      throw error;  
    }

    done();

    expect(checkFileSync(data.output)).toBeTruthy();

  }, 30000);

  itif(ffmpegExist).skip('it should join video plus track audio with fluent-ffmpeg', async (done) => {
    const NAME_TRACK_AUDIO = 'footage/Lunay_TodoONada.m4a';

    const data = {
      input: `${DIR_TEMP}/video-test.mp4`,
      output: `${DIR_TEMP}/video-audio.mp4`,
      track: path.join(DIR_TEMP, NAME_TRACK_AUDIO),
    }

    try {
      removeFileSync(data.output);
  
      console.time(':::::track:::::');
      await changeTrackFluent(data);
      console.timeEnd(':::::track:::::');

    } catch (error) {
      console.log(error);
      throw error;  
    }

    done();

    expect(checkFileSync(data.output)).toBeTruthy();

  }, 30000);

  itif(ffmpegExist).skip('it should place a watermark on a video', async (done) => {
    const data = {
      output: `${DIR_TEMP}/video-final.mp4`,
      video: `${DIR_TEMP}/video-audio.mp4`,
      watermark: `${DIR_TEMP}/FeaturingYou.png`,
    };

    try {
      removeFileSync(data.output);
      
      await placeWatermarkOnVideo(data);
      
    } catch (error) {
      console.log(error);
      throw error;  
    }
    
    done();
    
    expect(checkFileSync(data.output)).toBeTruthy();
  }, 30000);

});

describe.skip('ffmpeg old', () => {

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
        name: 'fade',
        duration: 300
      }
    };

    removeFileSync(data.output);

    await transitionMergeVideosExec(data);
    
    done();
    
    expect(checkFileSync(data.output)).toBeTruthy();
  }, 30000);

  itif(ffmpegExist)('it should join 8 videos with file-videos and demuxer (same codecs)', async (done) => {
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

  itif(ffmpegExist)('it should create and return a thumbnail image of a video frame', async (done) => {
    
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
