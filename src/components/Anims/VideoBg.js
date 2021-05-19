import React from 'react';

const videoBg = (_id, name, loop) => {
  const markup = { __html: `
    <video playsinline="" autoplay="" ${loop && 'loop=""'} muted=""  id=${_id}>
        <source
            src=${name}
            type="video/mp4"
        />
    </video>,` };

  return markup;
};

export default videoBg;