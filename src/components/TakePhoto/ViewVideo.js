import React from 'react';
import ReactPlayer from 'react-player';

const ViewVideo = ({data}) => {
  console.log(data);

  const [footage, setFootage] = React.useState(null);
  const [clips, setClips] = React.useState(null);

  React.useEffect(() => {
    //const id = swap.video.split('/').slice(-1)[0];
    //setUrlVideo(`https://vimeo.com/${id}`);

    setFootage(data);
    setClips(data.slice(2));

  });

  return (
    <div>
        {footage ? (
          <div className="zone-info">
            <div className="item">
              <h3>Final Video</h3>
              <ReactPlayer
                className="react-player"
                url={footage[1]}
                controls={true}
                playing={true}
                width='100%'
                height='100%'
              />
            </div>
            
            <div className="item"><a href={footage[1]} download>Download video</a></div>

            <div className="item">
              <h3>Photo</h3>
              <img src={footage[0]} width='100%' height='auto' alt="Participante" />
            </div>

            {clips.map((item, index) => (
              <div className="item" key={index}>
                <h3>{`Swap ${index + 1}`}</h3>
                <ReactPlayer
                  className="react-player"
                  url={item}
                  controls={true}
                  playing={false}
                  width='100%'
                  height='100%'
                />
              </div>
            ))}
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
          max-width: 420px;
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
          padding: 20px 6px;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

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