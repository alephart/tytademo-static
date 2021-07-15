
// Here compose all videos that were previously adjusted in DeepFake.

// The functions return array with objects. 
// Each object is how it should be sent to DeepFake to do the swap.

// Step 3. Swap videos [sidekick] and get ids
export const videosListMale = (faceId) => {
  if (!faceId) return null;
  return [
    { // 002
      intensity: 1,
      video_id: '62878afc-db4d-4699-a9fe-e7aed032df7f',
      facemapping: {
        'b38dce27-d76c-49d7-be23-83bd4cb2f0ef': [
          `${faceId}`
        ]
      },
    },
    { // 006
      intensity: 1,
      video_id: 'f715b626-0baf-4bd8-ba85-65d6cdd37d09',
      facemapping: {
        '7698a629-8512-4d7e-a900-63a5e63fc3ce': [
          `${faceId}`
        ]
      },
    },
    { // 08
      intensity: 1,
      video_id: '5192acc4-b79f-452a-85ca-4956cccb545f',
      facemapping: {
        '4d654d53-fedd-4e33-8cfb-93ec43203a8b': [
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
      video_id: 'f070f853-d296-4fe1-8c9c-17a0cae2f812',
      facemapping: {
        '4489a27d-f557-4d79-95a2-0494dd83a482': [
          `${faceId}`
        ]
      },
    },
    { // 008
      intensity: 1,
      video_id: '5192acc4-b79f-452a-85ca-4956cccb545f',
      facemapping: {
        'd0fa0c00-1f39-4476-b912-b667c5bc0a83': [
          `${faceId}`
        ]
      },
    },
    { // 010
      intensity: 1,
      video_id: '7c04edfd-7384-4bda-891f-387d991fb437',
      facemapping: {
        '7fcc1431-5f2c-4ec8-ac08-474d64a797e6': [
          `${faceId}`
        ]
      },
    },
    { // 012
      intensity: 1,
      video_id: '875c7dee-2073-4925-8edd-82ece2b19444',
      facemapping: {
        '2ddeddc5-a387-47a2-ad36-c68d33c31bc6': [
          `${faceId}`
        ]
      },
    },
    { // 014
      intensity: 1,
      video_id: '515ee697-f38b-4d9b-9780-00bbca6bce09',
      facemapping: {
        '80930237-fd7e-485b-b1d5-2b3dc8d1b2be': [
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
