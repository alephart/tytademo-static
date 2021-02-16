
import decodeBase64Image from '../lib/decodeBase64'

describe('Image Base64', () => {
  const DUMMY_IMAGE = 'dummy-image.jpg';
  const DUMMY_IMAGE_BASE64 = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

  test('it should return that it is not a valid input string', () => {
    const imageBuffer = decodeBase64Image(DUMMY_IMAGE_BASE64);

    expect(imageBuffer instanceof Array).toBeFalsy();
  });

  test('it should to be a string valid image data', () => {
    const imageBuffer = decodeBase64Image(DUMMY_IMAGE_BASE64);

    expect(typeof imageBuffer === 'object' && imageBuffer !== null).toBeTruthy();
  });

  test('it should return that it is a valid base64 image', () => {
    const imageBuffer = decodeBase64Image(DUMMY_IMAGE_BASE64);

    expect(imageBuffer.type).toBe('image/gif');

    expect(imageBuffer.ext).toBe('gif');
  });


});