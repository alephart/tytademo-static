/**
 * here the synchronous actions end with Sync
 * all other actions are promises 
 */
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const cuid = require('cuid');

const DIR_TEMP = './temp';
// const DIR_TEMP = path.join(__dirname,  './temp');
// console.log('. = %s', path.resolve(DIR_TEMP));
// console.log('__dirname = %s', path.resolve(__dirname, DIR_TEMP));

const checkFileSync = (path) => {
  try {
    if (fsSync.existsSync(path)) {
      return true;
    }
    return false;
  } catch(err) {
    console.error(err);
    throw err;
  }
};

const createDirSync = (dir = DIR_TEMP) => {
  try {
    if (!fsSync.existsSync(dir)) {
      fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) throw err;
      });
    }
  } catch(err) {
    console.error(err);
    throw err;
  }
};

/**
 * Void: Remove or delete files from the path 
 * @param {string | array} pathFile   The path file(s). If string then is single file, if array are several files
 */
const removeFileSync = (pathFile) => {
  try {
    if(Array.isArray(pathFile)) {
      for(let i = 0; i < pathFile.length; i++) {
        if(checkFileSync(pathFile[i])) {
          fsSync.unlinkSync(pathFile[i]);
        }
      }
    } else {
      if(checkFileSync(pathFile)) {
        fsSync.unlinkSync(pathFile);
      }
    }

  } catch(err) {
    if (err) throw err;
    console.error(err);
  }
};

function writeFileSync(pathFile, dataFile) {
  try {
    fsSync.writeFileSync(pathFile, dataFile);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function writeFile(pathFile, dataFile) {
  try {
    await fs.writeFile(pathFile, dataFile);
  } catch (err) {
    console.error(`Got an error trying to write to a file: ${err.message}`);
    if (err) throw err;
  }
}

async function moveFile(source, destination) {
  try {
    await fs.rename(source, destination);
    console.log(`Moved file from ${source} to ${destination}`);
  } catch (err) {
    console.error(`Got an error trying to move the file: ${err.message}`);
    if (err) throw err;
  }
}

async function loadFile(pathFile) {
  try {
    fs.readFile(pathFile, async (err, data) => {
      if (err) throw err;
    
      try {
        // Encode to base64
        const encodedImage = await Buffer(data, 'binary').toString('base64');
      
        // Decode from base64
        return await Buffer(encodedImage, 'base64').toString('binary');
        
      } catch (err) {
        console.error(err);
        throw err;
      }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function loadFileSync(pathFile) {
  try{
    const data = fsSync.readFileSync(pathFile, function (err, data) {
      if (err) throw err;
      return data;
    });

    return data;

  } catch (err) {
    console.error(err);
    throw err;
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
    console.error(`Got an error trying to crate dummy image: ${err.message}`);
    if (err) throw err;
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

module.exports = { 
  writeFile,
  moveFile,
  loadFile,
  removeFileSync,
  checkFileSync,
  createDirSync,
  loadFileSync,
  writeFileSync,
};