
// Here compose all videos that were previously adjusted in Reface.

// The functions return array with objects. 
// Each object is how it should be sent to Reface to do the swap.

// Step 3. Swap videos [sidekick] and get ids
export const videosListMan = (faceId) => {
  if (!faceId) return null;
  return [
    { // 02
      intensity: 1,
      video_id: '85434d30-bdd3-48b4-bcde-4f0681e57ed6',
      facemapping: {
        '4f06dbd1-0568-422d-bbd2-9d968068bf73': [
          `${faceId}`
        ]
      },
    },
    { // 06
      intensity: 1,
      video_id: 'e939a4f8-0246-48e6-8ef0-4a7884a859e1',
      facemapping: {
        '9a78b1f9-53d6-4d0e-a59f-6473e9cada92': [
          `${faceId}`
        ]
      },
    },
    { // 08
      intensity: 1,
      video_id: '4826c84b-b1a9-4ac1-b953-b00cfb9e725b',
      facemapping: {
        '521ce870-36cf-46d5-bffe-68429eaa4d05': [
          `${faceId}`
        ]
      },
    },
    { // 12
      intensity: 1,
      video_id: '39425615-2d94-49ab-87ea-49c357e20f34',
      facemapping: {
        'dc431f74-7fb7-4cd2-94db-8908f3371184': [
          `${faceId}`
        ]
      },
    },
    { // 14
      intensity: 1,
      video_id: '8ffab2cf-dc6f-419d-bb0f-3acae4960f2d',
      facemapping: {
        '05a88bb2-b51f-4cac-9bb5-c52a79af5d75': [
          `${faceId}`
        ]
      },
    },
  ];
};

// 3. Swap videos [man] and get ids
export const videosListManNO = (faceId) => {
  if (!faceId) return null;
  return [
    { // 02
      intensity: 1,
      video_id: '8b63e515-9762-4a26-85d7-f21762996e11',
      facemapping: {
        'b41cf3f3-df0a-4223-a4fd-fbcd2bb763cc': [
          `${faceId}`
        ]
      }
    },
    { // 06
      intensity: 1,
      video_id: '2b5e1d30-0ff3-4efe-8880-b805e36e0615',
      facemapping: {
        '02ad0e8a-f6da-45dc-956f-42a617c7ccaa': [
          `${faceId}`
        ]
      }
    },
    { // 10
      intensity: 1,
      video_id: '00a4c0a6-e9d4-4341-b646-d173fc7119d3',
      facemapping: {
        '116e2ffc-9441-4157-bac4-b51c931d23d4': [
          `${faceId}`
        ]
      }
    },
  ];
};

// 3. Swap videos [woman] and get ids
export const videosListWoman = (faceId) => {
  if (!faceId) return null;
  return [
    { // 04
      intensity: 1,
      video_id: '0aceca88-6ddd-4069-a61e-ed5db7200ebc',
      facemapping: {
        '50b5f476-d5fe-48e3-be40-47665f09b4fc': [
          `${faceId}`
        ]
      }
    },
    { // 08
      intensity: 1,
      video_id: '05311379-2361-4518-b89f-29c9af531f95',
      facemapping: {
        '635db886-1ddd-4899-828a-6f40e9f3da80': [
          `${faceId}`
        ]
      }
    },
    { // 12
      intensity: 1,
      video_id: 'f7624d43-d092-48ec-8b09-ba8f6aee703d',
      facemapping: {
        '22d07bf7-84d9-461b-a1f2-09e02693c0c8': [
          `${faceId}`
        ]
      }
    },
    { // 14
      intensity: 1,
      video_id: '0043c228-14be-4075-b11a-d9e5cbe66ed2',
      facemapping: {
        '5310ae0a-c6a7-4c10-9993-e6390fc5405c': [
          `${faceId}`
        ]
      }
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
  { name: 'footage/008-SIDEKICK.mp4', character: 'man' },
  { name: 'footage/009.mp4', character: '' },
  { name: 'footage/010-WOMAN.mp4', character: 'woman' },
  { name: 'footage/011.mp4', character: '' },
  { name: 'footage/012-SIDEKICK.mp4', character: 'man' },
  { name: 'footage/013.mp4', character: '' },
  { name: 'footage/014-WOMAN-SIDEKICK.mp4', character: 'man' },
  { name: 'footage/015.mp4', character: '' },
  { name: 'footage/016-WOMAN.mp4', character: 'woman' },
  { name: 'footage/017.mp4', character: '' },
  { name: 'footage/018-WOMAN.mp4', character: 'woman' },
  { name: 'footage/019.mp4', character: '' },
  { name: 'footage/020-WOMAN.mp4', character: 'woman' },
];
