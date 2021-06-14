
// Here compose all videos that were previously adjusted in DeepFake.

// The functions return array with objects. 
// Each object is how it should be sent to DeepFake to do the swap.

// Step 3. Swap videos [sidekick] and get ids
export const videosListMan = (faceId) => {
  if (!faceId) return null;
  return [
    { // 02
      intensity: 1,
      video_id: '722755d5-5a2b-47e4-b6b7-0a439a577d2e',
      facemapping: {
        '94fdcf8a-bd23-48e6-a76c-8e448464e749': [
          `${faceId}`
        ]
      },
    },
    { // 06
      intensity: 1,
      video_id: '62142062-6022-42f3-a360-0c13faa5222f',
      facemapping: {
        '9c4927ff-f563-4a7d-bfe6-0f8b98146f58': [
          `${faceId}`
        ]
      },
    },
    { // 08
      intensity: 1,
      video_id: '51ab48bc-e3e0-4aeb-911a-d7c16d2e71cb',
      facemapping: {
        '1f97df12-38d6-469e-97d6-0df8dcf22af2': [
          `${faceId}`
        ]
      },
    },
  ];
};

// Step 3. Swap videos [woman] and get ids
export const videosListWoman = (faceId) => {
  if (!faceId) return null;
  return [
    { // 04
      intensity: 1,
      video_id: 'd996972c-b32d-4a44-b174-45856d924fdc',
      facemapping: {
        '926bb652-a54a-42a1-88d3-03b769a78acd': [
          `${faceId}`
        ]
      },
    },
    { // 08
      intensity: 1,
      video_id: '51ab48bc-e3e0-4aeb-911a-d7c16d2e71cb',
      facemapping: {
        '1f97df12-38d6-469e-97d6-0df8dcf22af2': [
          `${faceId}`
        ]
      },
    },
    { // 10
      intensity: 1,
      video_id: 'cc53cecf-81c1-4ee6-89f6-35390a0e4a31',
      facemapping: {
        'cba1cd22-fbcb-4d8e-8c9c-08c9f9de5d93': [
          `${faceId}`
        ]
      },
    },
    { // 12
      intensity: 1,
      video_id: '4162d5e6-88d0-4ab2-9ec0-f300a024f961',
      facemapping: {
        '8707bf55-cef5-4d0f-aac8-448ce4f3c32d': [
          `${faceId}`
        ]
      },
    },
  ];
};

// array with all video clips to use (store into /temp/footage)
export const videoListAll = [
  { name: 'footage/001.mp4', character: '' },
  { name: 'footage/002-SIDEKICK.mp4', character: 'man' },
  { name: 'footage/003.mp4', character: '' },
  { name: 'footage/004-WOMAN.mp4', character: 'woman' },
  { name: 'footage/005.mp4', character: '' },
  { name: 'footage/006-SIDEKICK.mp4', character: 'man' },
  { name: 'footage/007.mp4', character: '' },
  { name: 'footage/008-WOMAN-SIDEKICK.mp4', character: 'mix' },
  { name: 'footage/009.mp4', character: '' },
  { name: 'footage/010-WOMAN.mp4', character: 'woman' },
  { name: 'footage/011.mp4', character: '' },
  { name: 'footage/012-WOMAN.mp4', character: 'woman' },
];
