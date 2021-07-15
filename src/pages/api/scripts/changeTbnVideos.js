const { adjustTbnVideos } = require('../lib/refaceActions');

// this action modify tnb to 90K
async function modifyTbn(videoList) {
  return await adjustTbnVideos(videoList); 
}

// video list - include folder and video into temp/
const videoList = [
  'footage/001.mp4',
  'footage/002-SIDEKICK.mp4',
  'footage/003.mp4',
  'footage/004-WOMAN.mp4',
  'footage/005.mp4',
  'footage/006-SIDEKICK.mp4',
  'footage/007.mp4',
  'footage/008-WOMAN-SIDEKICK.mp4',
  'footage/009.mp4',
  'footage/010-WOMAN.mp4',
  'footage/011.mp4',
  'footage/012-WOMAN.mp4',
  'footage/013.mp4',
  'footage/014-WOMAN.mp4',
];

modifyTbn(videoList).then(list => console.log(list));
