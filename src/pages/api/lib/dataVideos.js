
// Here compose all videos that were previously adjusted in DeepFake.

// The functions return array with objects. 
// Each object is how it should be sent to DeepFake to do the swap.

// Step 3. Swap videos [sidekick] and get ids
export const videosListMale = (faceId) => {
  if (!faceId) return null;
  return [
    { // 002
      intensity: 1,
      video_id: '293030cc-0aa8-4548-a5a1-9959d24b6cd8',
      facemapping: {
        '10bace73-6d2b-4611-8203-2365b24cc3e5': [
          `${faceId}`
        ]
      },
    },
    { // 006
      intensity: 1,
      video_id: '6d1ae197-3b02-4008-8d9a-60babbf44e33',
      facemapping: {
        'b1a58c6b-c4b4-487e-989f-d72db24ebc71': [
          `${faceId}`
        ]
      },
    },
    { // 08
      intensity: 1,
      video_id: 'cee3a45b-ced7-41bf-be74-3e8fdbd9f7ad',
      facemapping: {
        '39d7e4ca-dc96-4abd-9f53-866eb7710b14': [
          `${faceId}`
        ]
      },
    },
  ];
};

// Step 3. Swap videos [woman] and get ids
export const videosListFemale = (faceId) => {
  if (!faceId) return null;
  return [
    { // 004
      intensity: 1,
      video_id: '191210bd-0678-4b9f-a2ba-d88bffb90a89',
      facemapping: {
        '2d4062f9-6593-4ee2-a69e-2ffe9bb98efa': [
          `${faceId}`
        ]
      },
    },
    { // 008
      intensity: 1,
      video_id: 'cee3a45b-ced7-41bf-be74-3e8fdbd9f7ad',
      facemapping: {
        'f813eb5b-ee4a-4e2f-aec6-ac2d60e8c2dc': [
          `${faceId}`
        ]
      },
    },
    { // 010
      intensity: 1,
      video_id: '0a6c6382-b49d-46f9-9802-24bec5e86d5d',
      facemapping: {
        'efe99acf-2bbf-4f71-a3e4-37f72ca81485': [
          `${faceId}`
        ]
      },
    },
    { // 012
      intensity: 1,
      video_id: 'f6fcdbd1-d661-41b9-82ae-32cb575e3ed3',
      facemapping: {
        'fbc3eebe-9ee9-4325-a744-87962a579895': [
          `${faceId}`
        ]
      },
    },
    { // 014
      intensity: 1,
      video_id: '52c19aae-4bc4-4f9c-a64c-5d910ebd205b',
      facemapping: {
        'c3166fd0-bcaa-4287-8607-6f9c0ebe7d14': [
          `${faceId}`
        ]
      }
    }
  ];
};

// array with all video clips to use (store into /temp/footage)
export const videoListAll = [
  { name: 'footage/001.mp4', character: '' },
  { name: 'footage/002-SIDEKICK.mp4', character: 'male' },
  { name: 'footage/003.mp4', character: '' },
  { name: 'footage/004-WOMAN.mp4', character: 'female' },
  { name: 'footage/005.mp4', character: '' },
  { name: 'footage/006-SIDEKICK.mp4', character: 'male' },
  { name: 'footage/007.mp4', character: '' },
  { name: 'footage/008-WOMAN-SIDEKICK.mp4', character: 'mix' },
  { name: 'footage/009.mp4', character: '' },
  { name: 'footage/010-WOMAN.mp4', character: 'female' },
  { name: 'footage/011.mp4', character: '' },
  { name: 'footage/012-WOMAN.mp4', character: 'female' },
  { name: 'footage/013.mp4', character: '' },
  { name: 'footage/014-WOMAN.mp4', character: 'female' },
];
