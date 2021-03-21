import React, { useState, useEffect } from 'react';
import ApngComponent from 'react-apng';
import { CacheImages } from '@/utils/cacheImages';

const img = ['images/you.png'];

const You = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    CacheImages(img).then(() => {
      setImage(img[0]);
    });

  }, []);

  useEffect(() => {
    console.log(image);
  }, [image]);

  return (
    <>
      {image && (
        <ApngComponent 
          autoPlay={true} 
          src={image}
          style={{ maxWidth: '295px' }}
          />
      )}
    </>
  )
}

export default You;