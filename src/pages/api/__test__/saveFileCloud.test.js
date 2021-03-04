const cloudinary = require('cloudinary').v2;
const { dataConfig } = require('../lib/config');
const decodeBase64Image = require ('../lib/decodeBase64');
const { saveCloud } = require('../lib/saveFileCloud');



describe('Save Cloud', () => {
  const config = cloudinary.config(dataConfig);
  const DUMMY_IMAGE_BASE64 = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
  
  //"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
  
  // check config data to cloud media
  test('it should return object with config data', () => {
    const otherConfig = {
      cloud_name: 'mds',
      api_key: '23473247236345739',
      api_secret: 'bnmobdflkjoyeopre7md4343f',
    };
    
    const config1 = cloudinary.config(otherConfig);
    
    expect(config1).toMatchObject(otherConfig);
  });

  test('it should return true to check config', () => {
    expect(config).toBeTruthy();
  });

  // upload image to cloud storage
  test('it should save image to cloud storage', async (done) => {
    
    try {    
      // save image on cloud
      const saveImage = await saveCloud(DUMMY_IMAGE_BASE64, 'my-mage');
  
      done();
  
      console.log(saveImage);
  
      expect(saveImage).toBeTruthy();
    } catch (error) {
      console.log(error);
    }

  }, 20000);

});


// upload image to cloud storage

// upload video to cloud storage

// delete media from 