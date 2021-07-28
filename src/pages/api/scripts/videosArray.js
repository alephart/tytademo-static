const path = require('path');

const DIR_TEMP = './temp1';

videos = [
  '756b4dfd-e010-4de2-a200-967321c1d2eb.mp4',
  '7205ac52-07c0-47a8-900c-f0e932c968c1.mp4',
  'f96bbd1c-381b-436d-ac15-47fde2982069.mp4'
];

let removeSubVideos = [];
const allSubVideos = videos.map((video, index) => {
  const pathFile = path.join(DIR_TEMP, video);
  removeSubVideos[index] = pathFile;
  return pathFile;
});

console.log(removeSubVideos, allSubVideos);