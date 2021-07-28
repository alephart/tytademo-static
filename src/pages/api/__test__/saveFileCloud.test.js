const { decodeBase64Image } = require('../lib/utils');
const { uploadFile } = require('../lib/bucketS3API');
//const { uploadVimeo } = require('../lib/vimeoAPI');
const { writeFileSync } = require('../lib/fileActions');
const path = require('path');

// describe.skip('Vimeo API Interaction', () => {
//   const Vimeo = require('vimeo').Vimeo;
//   const { configVimeo } = require('../lib/config');
//   const clientVimeo = new Vimeo(configVimeo.client_id, configVimeo.client_secret, configVimeo.access_token);
//   const DIR_TEMP = './temp1';

//   test('Should return a success message from API Vimeo', async (done) => {
//     const expected = 'Success!';

//     const response = await new Promise((resolve, reject) => {
//       try {
//         clientVimeo.request({
//           method: 'GET',
//           path: '/tutorial'
//         }, function (error, body, status_code, headers) {
//           if (error) {
//             reject(error);
//           }
//           resolve(body);
//         });
        
//       } catch (error) {
//         reject(error);
//       }
//     });
        
//     done();
    
//     expect(response.status).toBe(200);
//     expect(response.message).toEqual(expect.stringContaining(expected));
//     expect(response.token_is_authenticated).toBeTruthy();
//   });

//   test('Should upload a video by VIMEO API', async (done) => {
//     const nameVideo = 'vid-pt1.mp4';
//     const params = {
//       'name': 'First video',
//       'description': 'The first video to upload!!!.'
//     };

//     let upVimeo;

//     try {
//       const pathFinalVideo = path.join(DIR_TEMP, nameVideo);

//       upVimeo = await uploadVimeo(pathFinalVideo, params);

//     } catch (error) {
//       //console.log(error);
//       upVimeo = error;
//     }

//     done();

//     //console.log('upVimeo', upVimeo);

//     expect(upVimeo).toEqual(expect.stringContaining('videos'));

//   });

// });

describe('Save Cloud', () => {
  const DIR_TEMP = './temp1';

  test('it should save image to cloud storage sync', async (done) => {

    const nameImg = 'test/test-photo.png';
    const pathFinalImg = path.join(DIR_TEMP, nameImg);

    let saveImage;

    try {
      // save image on cloud
      saveImage = await uploadFile(pathFinalImg, nameImg, 'image', true);

    } catch (error) {
      console.log(error);
    }

    done();

    console.log(saveImage);
    
    expect(saveImage).toBeTruthy();
  }, 10000);


  // upload video to cloud storage (S3)
  test('it should save a video to cloud storage', async (done) => {
    const nameVideo = 'test/video1.mp4';

    let saveVideo;

    try {
      const pathFinalVideo = path.join(DIR_TEMP, nameVideo);

      // save video on cloud
      saveVideo = await uploadFile(pathFinalVideo, nameVideo, 'video', true);
    } catch (error) {
      console.log(error);
    }
    
    done();

    console.log(saveVideo);

    expect(saveVideo).toBeTruthy();

  }, 20000);

});

// delete media from 