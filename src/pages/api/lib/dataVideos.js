
// Here compose all videos that were previously adjusted in DeepFake.

// The functions return array with objects. 
// Each object is how it should be sent to DeepFake to do the swap.

// Step 3. Swap videos [sidekick] and get ids
export const videosListMan = (faceId) => {
  if (!faceId) return null;
  return [
    { // 02
      intensity: 1,
      video_id: '7c8a8787-87d6-4baa-bf67-bd72e00374a3',
      facemapping: {
        'a4b1cc83-0c86-43c9-97f0-179751a26921': [
          `${faceId}`
        ]
      },
    },
    { // 06
      intensity: 1,
      video_id: '2160d8fa-658c-4631-b888-37d954e8ac40',
      facemapping: {
        '4bfeed2f-7396-403a-ab1f-5ca5f62ad23a': [
          `${faceId}`
        ]
      },
    },
    { // 08
      intensity: 1,
      video_id: 'fdddee18-c0e3-437d-ab5c-e5239499bf78',
      facemapping: {
        '8884158c-90c1-4e68-9484-8c75fd309e3c': [
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
      video_id: '5efa4d77-f19f-4722-9be5-8f65e599a46e',
      facemapping: {
        'd727820b-acab-45f4-ace7-69c1f31ea809': [
          `${faceId}`
        ]
      },
    },
    { // 08
      intensity: 1,
      video_id: 'fdddee18-c0e3-437d-ab5c-e5239499bf78',
      facemapping: {
        '54500bbd-6813-40c7-819b-79b86478511d': [
          `${faceId}`
        ]
      },
    },
    { // 10
      intensity: 1,
      video_id: '9e4fd31f-e078-48a5-96ae-6627a01db274',
      facemapping: {
        '8ea9fa0e-629e-4721-b0f7-86b93ca90397': [
          `${faceId}`
        ]
      },
    },
    { // 12
      intensity: 1,
      video_id: '943b2b8d-af42-4b2c-9784-b3177b180642',
      facemapping: {
        '2e7ee0ab-e6fe-4afc-853b-dc48466a4ee6': [
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
