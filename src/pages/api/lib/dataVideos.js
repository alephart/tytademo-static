
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

// Step 3. Swap videos [woman] and get ids
export const videosListWoman = (faceId) => {
  if (!faceId) return null;
  return [
    { // 04
      intensity: 1,
      video_id: 'a8237e9b-9c0c-4722-9e6c-b9a8b9a5c411',
      facemapping: {
        '0736c057-c6b9-445d-84a4-c2708bc8d02f': [
          `${faceId}`
        ]
      },
    },
    { // 10
      intensity: 1,
      video_id: '3e3f47d7-25f0-4da9-95de-c85605a92190',
      facemapping: {
        '11983f1c-d97a-42b7-a465-b315a1a5c239': [
          `${faceId}`
        ]
      },
    },
    { // 14
      intensity: 1,
      video_id: '8ffab2cf-dc6f-419d-bb0f-3acae4960f2d',
      facemapping: {
        '8cc715fc-cfaa-4737-81da-4db3f4bd6b80': [
          `${faceId}`
        ]
      },
    },
    { // 16
      intensity: 1,
      video_id: '53b8b899-0f4b-4011-b3ab-27d775e209d3',
      facemapping: {
        'dfff0df7-8dab-40bf-bb8b-54587e4ada64': [
          `${faceId}`
        ]
      },
    },
    { // 18
      intensity: 1,
      video_id: '76a75c2b-570c-440e-8685-69996dd395ef',
      facemapping: {
        '5b525dd1-1add-4534-8713-bacb82d955ef': [
          `${faceId}`
        ]
      },
    },
    { // 20
      intensity: 1,
      video_id: '5efc1653-8eee-455a-8b8f-8fc784d236a8',
      facemapping: {
        'b43cf87f-4f1f-4d66-9874-a60ba5d32b5f': [
          `${faceId}`
        ]
     , },
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
  { name: 'footage/014-WOMAN-SIDEKICK.mp4', character: 'mix' },
  { name: 'footage/015.mp4', character: '' },
  { name: 'footage/016-WOMAN.mp4', character: 'woman' },
  { name: 'footage/017.mp4', character: '' },
  { name: 'footage/018-WOMAN.mp4', character: 'woman' },
  { name: 'footage/019.mp4', character: '' },
  { name: 'footage/020-WOMAN.mp4', character: 'woman' },
];
