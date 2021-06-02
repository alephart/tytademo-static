export const CacheImages = async (arr) => {
  const images = await arr.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
          img.src = src;
          img.onload = resolve();
          img.onerror = reject();
      });
  });
  
  await Promise.all(images);
};