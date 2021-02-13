/**
 * here only promises actions 
 */
const fs = require('fs').promises;
const path = require('path');
const cuid = require('cuid');

// const DIR_TEMP = './temp';
// const DIR_TEMP = path.join(__dirname,  './temp');
// console.log('. = %s', path.resolve(DIR_TEMP));
// console.log('__dirname = %s', path.resolve(__dirname, DIR_TEMP));

async function writeFile(pathFile, dataFile) {
  try {
    await fs.writeFile(pathFile, dataFile);
  } catch (err) {
    if (err) throw err;
    console.error(`Got an error trying to write to a file: ${err.message}`);
  }
}

async function moveFile(source, destination) {
  try {
    await fs.rename(source, destination);
    console.log(`Moved file from ${source} to ${destination}`);
  } catch (err) {
    if (err) throw err;
    console.error(`Got an error trying to move the file: ${err.message}`);
  }
}

async function saveDummy(dummyBuffer) {
  try {
    //const dummyBuffer = decodeBase64Image(DUMMY_IMAGE);
    const nameCuid = cuid();
    const nameDummy = `image-${nameCuid.substring(0, 10)}.${dummyBuffer.ext}`;
    const pathDummy = path.join('./public/photos/', nameDummy);
    await writeFile(pathDummy, dummyBuffer.data);
  } catch (err) {
    if (err) throw err;
    console.error(`Got an error trying to crate dummy image: ${err.message}`);
  }
}

    // fs.writeFile(
    //   pathFinalFile,
    //   imageBuffer.data,
    //   //{ mode: 0o755 },
    //  (err) => {
    //     if (!err) {
    //       console.log('file is created');
    //     }
    //     return;
    //   }
    // );

module.exports = { writeFile, moveFile };