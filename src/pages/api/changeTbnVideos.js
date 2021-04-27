const { adjustTbnVideos } = require('./lib/refaceActions');

// this action modify tnb to 90K
async function modifyTbn(videoList) {
  return await adjustTbnVideos(videoList); 
}

const videoList = [
  '01-NoSwap_tbn.mp4',
  '02-SwapSidekick_tbn.mp4',
  '03-NoSwap_tbn.mp4',
  '04-SwapWoman_tbn.mp4',
];

modifyTbn(videoList).then(list => console.log(list));
