const {getSignedUrl, uploadAsset, detectFaceInAsset, swapVideo} = require('../lib/refaceAPI');
const { loadFileBinarySync } = require('../lib/fileActions');
const path = require('path');

describe('Reface API', () => {
  const DIR_TEMP = './temp';

  test.skip('Should return signed_url correctly', async (done) => {
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

  test.skip('It should upload an image to reface and get the url of the image', async (done) => {
    const pathFile = path.join(DIR_TEMP, 'photo-000ae9ke8gf3mun.png');
    let data;

    try {
      // Get the Photo and convert to binary format
      const binaryFile = await loadFileBinarySync(pathFile);
      
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
    const pathFile = path.join(DIR_TEMP, 'photo-000ae9ke8gf3mun.png');
    let data, faceId, dataSwap;

    try {
      // Get the Photo and convert to binary format
      const binaryFile = await loadFileBinarySync(pathFile);
      
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

});