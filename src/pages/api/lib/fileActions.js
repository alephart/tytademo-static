// here only promises actions 
const fs = require('fs').promises;

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

module.exports = { writeFile, moveFile }