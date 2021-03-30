const { decodeBase64Image } = require ('../lib/utils');
const { uploadFile, uploadFileS3 } = require('../lib/bucketS3API');
const { uploadVimeo } = require('../lib/vimeoAPI');
const { writeFile, writeFileSync, loadFileSync } = require('../lib/fileActions');
const path = require('path');

describe.skip('Vimeo API Interaction', () => {
  const Vimeo = require('vimeo').Vimeo;
  const { configVimeo } = require('../lib/config');
  const clientVimeo = new Vimeo(configVimeo.client_id, configVimeo.client_secret, configVimeo.access_token);
  const DIR_TEMP = './temp';

  test('Should return a success message from API Vimeo', async (done) => {
    const expected = 'Success!';

    const response = await new Promise((resolve, reject) => {
      try {
        clientVimeo.request({
          method: 'GET',
          path: '/tutorial'
        }, function (error, body, status_code, headers) {
          if (error) {
            reject(error);
          }
          resolve(body);
        });
        
      } catch (error) {
        reject(error);
      }
    });
        
    done();
    
    expect(response.status).toBe(200);
    expect(response.message).toEqual(expect.stringContaining(expected));
    expect(response.token_is_authenticated).toBeTruthy();
  });

  test('Should upload a video by VIMEO API', async (done) => {
    const nameVideo = 'vid-pt1.mp4';
    const params = {
      'name': 'First video',
      'description': 'The first video to upload!!!.'
    };

    let upVimeo;

    try {
      const pathFinalVideo = path.join(DIR_TEMP, nameVideo);

      upVimeo = await uploadVimeo(pathFinalVideo, params);

    } catch (error) {
      //console.log(error);
      upVimeo = error;
    }

    done();

    //console.log('upVimeo', upVimeo);

    expect(upVimeo).toEqual(expect.stringContaining('videos'));

  });

});

describe('Save Cloud', () => {
  const DIR_TEMP = './temp';
  const imageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXUAAABuCAMAAADvRXMWAAABzlBMVEUAAAD/////////////////XAD/XAD////////////////////////////////////////////////////////////////29vb/////////////////////////XAD/////////////XAD/////////////XAD/////////XAD/XAD////////////////////////////////////////9/f3////////////////////////////////////////////////////////////////////////////////////////////////////+/v7////////////////////////+/v7////////////+/v7////z8/P////////////////////////+/v7/////////XAD9/f3/XAD+/v7/XAD/////XADh4eHv7+//XgD8/Pz/XAD/////YQT/XAD/XAD/XAD/XAD/XAD/XAD/axf/XADy8vL/XAD/XAD/XADX19f/XAD/XAD/XACxsbGbm5u/v7//XADe3t7MzMzFxcWSkpL/XADn5+e+vr6Ojo7Ozs7/XACVlZX/////XAD4+PjY2Njs7Ozq6urf399qKhPgAAAAk3RSTlMAq7AG/sHprfvQ3eBvAdLnxJJyogiVJQP62CpA8yPzwQpFynhoV9nUTwPy7J2bg2v148W0jExDNPDMyD2gWjseEqZ7dizpv4A3D9qPiGEnubWxZl9SSBwY9+YgFgyqXDAUDcrPvPjexPCaDwRltrR6ZUo/ORv3xqqdhyfUdHMu+fTPtFj0y8G3ra2tlpODgmJEQDQgQojZAAAL8UlEQVR42uzb/U9SURzH8U+AdY2gZyiD7NFbTRCWmpgJ+VBSDjU3S9SatRgjNnNYPjRr1Q/90i/te/7g7gV6UC5yjx3b7t339Qvj7ozBewzOdr4XjDH2H6xtrxduXWyi2LVeLoGpbr7xSbRQ3LwJptLqYWFDVwVMnbKwaRVMlVVh20cwNUrvhG0F/m1XZENIWAFTYU3IKPIGUoltIeUrmAJfhJQNMAUKQkobmAK3hJQPYApcFFK6eO+owi2u3hpXdwWubgNXdwWubgNXdwWubgNXdwWubgNXdwWubgNXdwWubgNXdwWH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';

  // upload image to cloud storage (S3)
  test('it should save image to cloud storage async', async (done) => {

    try {
      const imageBuffer = decodeBase64Image(imageBase64);
      const nameImg = `test-image.png.${imageBuffer.ext}`;
      const pathFinalImg = path.join(DIR_TEMP, nameImg);

      // save photo in /temp
      await writeFile(pathFinalImg, imageBuffer.data);

      // save image on cloud
      const saveImage = await uploadFile(pathFinalImg, nameImg, 'image', true);
      
      done();

      console.log(saveImage);
      
      expect(saveImage).toBeTruthy();
    } catch (error) {
      console.log(error);
    }

  }, 20000);


  test('it should upload file (convert base64 to binary) correctly to S3 Bucket', async (done) => {
    const imageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXUAAABuCAMAAADvRXMWAAABzlBMVEUAAAD/////////////////XAD/XAD////////////////////////////////////////////////////////////////29vb/////////////////////////XAD/////////////XAD/////////////XAD/////////XAD/XAD////////////////////////////////////////9/f3////////////////////////////////////////////////////////////////////////////////////////////////////+/v7////////////////////////+/v7////////////+/v7////z8/P////////////////////////+/v7/////////XAD9/f3/XAD+/v7/XAD/////XADh4eHv7+//XgD8/Pz/XAD/////YQT/XAD/XAD/XAD/XAD/XAD/XAD/axf/XADy8vL/XAD/XAD/XADX19f/XAD/XAD/XACxsbGbm5u/v7//XADe3t7MzMzFxcWSkpL/XADn5+e+vr6Ojo7Ozs7/XACVlZX/////XAD4+PjY2Njs7Ozq6urf399qKhPgAAAAk3RSTlMAq7AG/sHprfvQ3eBvAdLnxJJyogiVJQP62CpA8yPzwQpFynhoV9nUTwPy7J2bg2v148W0jExDNPDMyD2gWjseEqZ7dizpv4A3D9qPiGEnubWxZl9SSBwY9+YgFgyqXDAUDcrPvPjexPCaDwRltrR6ZUo/ORv3xqqdhyfUdHMu+fTPtFj0y8G3ra2tlpODgmJEQDQgQojZAAAL8UlEQVR42uzb/U9SURzH8U+AdY2gZyiD7NFbTRCWmpgJ+VBSDjU3S9SatRgjNnNYPjRr1Q/90i/te/7g7gV6UC5yjx3b7t339Qvj7ozBewzOdr4XjDH2H6xtrxduXWyi2LVeLoGpbr7xSbRQ3LwJptLqYWFDVwVMnbKwaRVMlVVh20cwNUrvhG0F/m1XZENIWAFTYU3IKPIGUoltIeUrmAJfhJQNMAUKQkobmAK3hJQPYApcFFK6eO+owi2u3hpXdwWubgNXdwWubgNXdwWubgNXdwWubgNXdwWubgNXdwWubgNXdwWH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';
    const nameImg = 'test-photo.png';

    try {
      const imageBuffer = decodeBase64Image(imageBase64);

      //console.log(imageBuffer);

      
      const saveImage = await uploadFileS3(imageBuffer, nameImg, 'image', true);

      done();

      console.log(saveImage);
      
      expect(saveImage).toBeTruthy();

    } catch (error) {
        console.log(error);
    }
  });

  test('it should save image to cloud storage sync', () => {

    const nameImg = 'test-photo.png';
    const pathFinalImg = path.join(DIR_TEMP, nameImg);

    // save image on cloud
    const saveImage = uploadFile(pathFinalImg, nameImg, 'image');

    console.log(saveImage);
    
    expect(saveImage).toBeTruthy();
  });


  // upload video to cloud storage (S3)
  test('it should save a video to cloud storage', async (done) => {
    const nameVideo = 'video1.mp4';
    try {
      const pathFinalVideo = path.join(DIR_TEMP, nameVideo);

      // save video on cloud
      const saveVideo = await uploadFile(pathFinalVideo, nameVideo, 'video', true);
      
      done();

      console.log(saveVideo);

      expect(saveVideo).toBeTruthy();
    } catch (error) {
      console.log(error);
    }

  }, 20000);

});

// delete media from 