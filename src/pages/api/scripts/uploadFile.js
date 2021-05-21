/**
 * this function for test with bucket S3
 * Call Asyc and Sync function uploadFile
 */
const path = require('path');
const { uploadFile } = require('../lib/bucketS3API');

const DIR_TEMP = './temp';
const nameImg = 'test-image.gif';

const pathFinalImg = path.join(DIR_TEMP, nameImg);

async function upload(pathFinalImg) {
  await uploadFile(pathFinalImg, 'test-me.gif', 'image', true);
}

upload(pathFinalImg);


uploadFile(pathFinalImg, 'test-me.gif');