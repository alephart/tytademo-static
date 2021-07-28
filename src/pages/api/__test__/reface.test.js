const {getSignedUrl, uploadAsset, detectFaceInAsset, swapVideo} = require('../lib/refaceAPI');
const { loadFileSync } = require('../lib/fileActions');
const { downloadSwapVideos, buildFileVideos, adjustTbnVideos } = require('../lib/refaceActions');

const path = require('path');
const DIR_TEMP = './temp1';

describe.skip('Reface API - requires access to reface account', () => {
  test('It should upload an image to reface and get the url of the image', async (done) => {
    const pathFile = path.join(DIR_TEMP, 'photo-000mi9k3czld0c9.png');
    let data;

    try {
      // Get the Photo and convert to binary format
      const binaryFile = loadFileSync(pathFile);
      
      // upload asset to reface and get url asset
      const response = await uploadAsset(binaryFile, 'image/png');

      data = JSON.parse(response);
      
    } catch (error) {
      console.log(error);
      throw error;
    }

    done();

    expect(data.success).toBeTruthy();

  });

  test('It should preprocess the upload image', async (done) => {
    const pathFile = path.join(DIR_TEMP, 'photo-000mi9k3czld0c9.png');
    let data, faceId, dataSwap;

    try {
      // Get the Photo and convert to binary format
      const binaryFile = await loadFileSync(pathFile);
      
      // upload asset to reface and get url asset
      const response = await uploadAsset(binaryFile, 'image/png');

      data = JSON.parse(response);

      if(data.success) {
        // preprocess the upload image
        faceId = await detectFaceInAsset(data.urlFile, 'image/png');

        // swap video
        const videoData = {
          intensity: 1,
          video_id: 'b03bcf8f-d544-4725-bed6-3710255fba48',
          facemapping: {
            '8a3ad45c-fb07-48ad-818a-6a28af806233': [
              `${faceId}`
            ]
          }
        };

        dataSwap = await swapVideo(videoData);
      }
      
    } catch (error) {
      console.log(error);
      throw error;
    }
    
    done();
    
    console.log(dataSwap.videoInfo.video_path);

    expect(dataSwap.success).toBeTruthy();
  }, 20000);

  test.skip('It should download swaps and list final videos', async (done) => {
    const videos = [
      {
        videoInfo: {
          id: 'bacd57cd-8106-4eea-b954-984c19e2f479',
          video_path: 'https://storage.googleapis.com/prod-reflect-videos/data/swapped_videos/1d0fdeaf-8965-48ac-be18-831303be90f5.mp4',
        },
      },
      {
        videoInfo: {
          id: 'ce3f32fb-2701-4dd2-b457-07cee05ef4dc',
          video_path: 'https://storage.googleapis.com/prod-reflect-videos/data/swapped_videos/d9f48629-b93a-4d17-aa7f-36f9d30a8b80.mp4',
        },
      },
      {
        videoInfo: {
          id: '84783eba-9a8b-4e9d-9132-7b95939af1e4',
          video_path: 'https://storage.googleapis.com/prod-reflect-videos/data/swapped_videos/3564f955-7218-4891-a021-50519f53c1fa.mp4',
        },
      }
    ];
    
    let videosFinal;

    try {

      videosFinal = await downloadSwapVideos(videos);
      
    } catch (error) {
      console.log(error);
      throw error;      
    }

    done();

    expect(Array.isArray(videosFinal)).toBeTruthy();
  });

  test.skip('It should return video list final for file .txt videos.', () => {
    const videosList = [
      { name: '01-NoSwap_tbn.mp4', character: '' },
      { name: '02-SwapSidekick_tbn.mp4', character: 'man' },
      { name: '03-NoSwap_tbn.mp4', character: '' },
      { name: '04-SwapWoman_tbn.mp4', character: 'woman' },
      { name: '05-NoSwap_tbn.mp4', character: '' },
      { name: '06-SwapSidekick_tbn.mp4', character: 'man' },
      { name: '07-NoSwap_tbn.mp4', character: '' },
      { name: '08-SwapWoman_tbn.mp4', character: 'woman' },
      { name: '09-NoSwap_tbn.mp4', character: '' },
    ];

    const videosSwap = [
      'videoSwap-385708912.mp4',
      'videoSwap-124567080.mp4',
    ];

    const fileText = buildFileVideos(videosSwap, videosList, 'woman');

    expect(fileText).toMatch(/(385708912)/i);
    expect(fileText).toMatch(/(124567080)/i);
  });

});

describe('Reface API that can be tested', () => {

  test('Should return signed_url correctly', async (done) => {
    let data;

    try {
      const response = await getSignedUrl('jpg');
      data = JSON.parse(response);

    } catch (error) {
      console.log(error);
      throw error;
    }

    done();

    expect(data.success).toBeTruthy();

    //expect().toBe(2);
  });

  test.skip('should adjust TBN value in the videos that are required', async (done) => {
    const videoList = [
      '01-NoSwap_tbn.mp4',
      '02-SwapSidekick_tbn.mp4',
      '03-NoSwap_tbn.mp4',
      '04-SwapWoman_tbn.mp4',
    ];

    let newListVideos;

    try {
      newListVideos = await adjustTbnVideos(videoList, 90000);
      
    } catch (error) {
      console.log(error);
    }

    done();

    expect(newListVideos).toBeTruthy();

  }, 30000);

});