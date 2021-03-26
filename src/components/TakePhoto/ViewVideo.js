import React from 'react';
import ReactPlayer from 'react-player';

const ViewVideo = ({data}) => {
  console.log(data);

  const [urlVideo, setUrlVideo] = React.useState('');
  const [footage, setFootage] = React.useState(null);

  React.useEffect(() => {
    //const id = data.video.split('/').slice(-1)[0];

    //setUrlVideo(`https://vimeo.com/${id}`);

    setFootage(data.footage);
  });

  return (
    <div className="zone-info">
        {footage ? (
          <div>
            <div className="item">
              <h3>Final Video</h3>
              <ReactPlayer
                className="react-player"
                url={footage[1]}
                controls={true}
                playing={true}
                width='480px'
                height='280px'
              />
            </div>
            <div className="item">
              <h3>Photo</h3>
              <img src={footage[0]} alt="Participante" />
            </div>
            <div className="item">
              <h3>Swap 1</h3>
              <ReactPlayer
                className="react-player"
                url={footage[2]}
                controls={true}
                playing={false}
                width='480px'
                height='280px'
              />
            </div>

            <div className="item">
              <h3>Swap 2</h3>
              <ReactPlayer
                className="react-player"
                url={footage[3]}
                controls={true}
                playing={false}
                width='480px'
                height='280px'
              />
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}

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
        .item {
          padding-bottom: 20px;
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