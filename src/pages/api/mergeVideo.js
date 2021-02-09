const ffmpeg = require('ffmpeg-concat');
 
const data = {
  output: 'test.mp4',
  videos: [
    'media/loading.mp4',
    'media/mask.mp4',
  ],
  transition: {
    name: 'directionalWipe',
    duration: 500
  }
};

// concat 2 mp4s together using 2 500ms directionalWipe transitions
async function transitionMergeVideos(data){
  const response = await ffmpeg(data);
  return response;
}

transitionMergeVideos(data);