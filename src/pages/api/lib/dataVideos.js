
// Here compose all videos that were previously adjusted in Reface.

// The functions return array with objects. 
// Each object is how it should be sent to Reface to do the swap.

// Step 3. Swap videos [sidekick] and get ids
export const videosListMan = (faceId) => {
  if (!faceId) return null;
  return [
    { // 02
      intensity: 1,
      video_id: 'ef3acc67-21f2-42f7-957f-343c554490bb',
      facemapping: {
        '28df3a19-5b70-4f87-861b-d1d3870b5c0c': [
          `${faceId}`
        ]
      },
    },
    { // 06
      intensity: 1,
      video_id: 'c82cbbce-3a57-4444-9588-b011a0a75236',
      facemapping: {
        'ef5220a5-7351-428c-9306-70ab0c80648b': [
          `${faceId}`
        ]
      },
    },
    { // 08
      intensity: 1,
      video_id: '935caaa1-e93b-4cae-8fd4-b7a5ac8a592d',
      facemapping: {
        '6d83c3e1-adae-49fc-96cf-f8a5ccd30492': [
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
      video_id: '658fdbac-444b-4a64-86be-990f9c9d9f64',
      facemapping: {
        '9afceb47-cfef-4579-b3f7-3aae791d3838': [
          `${faceId}`
        ]
      },
    },
    { // 08
      intensity: 1,
      video_id: '935caaa1-e93b-4cae-8fd4-b7a5ac8a592d',
      facemapping: {
        '4dfa57b9-09cd-4202-b30a-157e1bfc9857': [
          `${faceId}`
        ]
      },
    },
    { // 10
      intensity: 1,
      video_id: 'eb3b7ff2-88be-4f67-9fa7-6f97a081b59c',
      facemapping: {
        'dfcadbd3-d100-42df-b74e-42e944237731': [
          `${faceId}`
        ]
      },
    },
    { // 12
      intensity: 1,
      video_id: 'dff5e754-d3d0-476d-b77f-8fdf5c5d759f',
      facemapping: {
        'edbc59e5-6b7e-4b5b-bead-d1234e06ec99': [
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
