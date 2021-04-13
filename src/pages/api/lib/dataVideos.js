// Here compose all videos that were previously adjusted in Reface. 

// 3. Swap videos [man] and get ids
export const videosListMan = (faceId) => {
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

export const videoListAll = [
  { name: '01-NoSwap_tbn.mp4', character: '' },
  { name: '02-SwapSidekick_tbn.mp4', character: 'man' },
  { name: '03-NoSwap_tbn.mp4', character: '' },
  { name: '04-SwapWoman_tbn.mp4', character: 'woman' },
  { name: '05-NoSwap_tbn.mp4', character: '' },
  { name: '06-SwapSidekick_tbn.mp4', character: 'man' },
  { name: '07-NoSwap_tbn.mp4', character: '' },
  { name: '08-SwapWoman_tbn.mp4', character: 'woman' },
  { name: '09-NoSwap_tbn.mp4', character: '' },
  { name: '10-SwapSidekick_tbn.mp4', character: 'man' },
  { name: '11-NoSwap_tbn.mp4', character: '' },
  { name: '12-SwapWoman_tbn.mp4', character: 'woman' },
  { name: '13-NoSwap_tbn.mp4', character: '' },
  { name: '14-SwapWoman_tbn.mp4', character: 'woman' },
  { name: '15-NoSwap_tbn.mp4', character: '' },
];
