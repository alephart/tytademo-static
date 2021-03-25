import React from 'react';
import ReactPlayer from 'react-player';

const ViewVideo = ({data}) => {
  console.log(data);

  const [urlVideo, setUrlVideo] = React.useState('');

  React.useEffect(() => {
    const id = data.video.split('/').slice(-1)[0];

    setUrlVideo(`https://vimeo.com/${id}`);
  });

  return (
    <div className="zone-info">
      <div>
        {urlVideo ? (
          <ReactPlayer
            className="react-player"
            url={urlVideo}
            controls={true}
            playing={true}
            width='480px'
            height='280px'
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div>
        <img src={data.photo} />
      </div>

      <style jsx>{`
        .zone-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          max-width: 480px;
          min-height: 280px;
          width: 100%;
          margin: 0 auto;
        }
        .react-player {
          position: absolute;
          top: 0;
          left: 0;
        }
        .button {
          background-color: #3498db;
          color: white;
          min-width: 160px;
          min-height: 40px;
          border: none;
          border-radius: 50px;
          text-transform: uppercase;
          margin: 5px;
          padding: 10px;
          text-align: center;
        }
      `}</style>
    </div>
  )
}

export default ViewVideo