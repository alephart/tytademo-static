
// Here compose all videos that were previously adjusted in DeepFake.

// The functions return array with objects. 
// Each object is how it should be sent to DeepFake to do the swap.

// Step 3. Swap videos [sidekick] and get ids
export const videosListMale = (faceId) => {
  if (!faceId) return null;
  return [
    { // 002
      intensity: 1,
      video_id: '762be4a6-b78d-4dbf-8d62-e13d4b786a09',
      facemapping: {
        'd7b5d4e0-dd2f-4749-bfcf-8775d6546f54': [
          `${faceId}`
        ]
      },
    },
    { // 006
      intensity: 1,
      video_id: '70581315-7111-4503-a5f6-cd6679d2e0dd',
      facemapping: {
        '09556da6-86c0-495a-ade9-75c554d897b1': [
          `${faceId}`
        ]
      },
    },
    { // 08
      intensity: 1,
      video_id: '480b5360-54d3-4cfc-973e-944126e41ac3',
      facemapping: {
        '6096feae-aeb1-43a5-ae51-42293c48000f': [
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
      video_id: 'bd81e3e0-2ed0-466f-a16e-5667a3f63ed3',
      facemapping: {
        'a55fad04-7565-489b-ba48-b8ba66b27a84': [
          `${faceId}`
        ]
      },
    },
    { // 008
      intensity: 1,
      video_id: '3a13cd33-d554-4857-aca0-e820788e9c78',
      facemapping: {
        'd44fdbbc-de5e-4bda-b6fa-ee0297c97aae': [
          `${faceId}`
        ]
      },
    },
    { // 010
      intensity: 1,
      video_id: '3c5956f0-5c7c-45ac-9c5b-dbb3bdf56caf',
      facemapping: {
        '1ddae911-543b-456f-95e7-44712f26b919': [
          `${faceId}`
        ]
      },
    },
    { // 012
      intensity: 1,
      video_id: '8cdb835f-579f-4b08-9c1f-fbf466493e94',
      facemapping: {
        'ee0aa449-d684-4889-8116-a77e20cea52a': [
          `${faceId}`
        ]
      },
    },
    { // 014
      intensity: 1,
      video_id: '6621a458-851b-4c01-86fb-2d42ea3de956',
      facemapping: {
        '8115c49e-958d-4ee4-8a1f-0531e2fb8026': [
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
