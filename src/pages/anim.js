import Spritesheet from 'react-responsive-spritesheet';

const Anim = () => { 
  return (
    <div className="oneColumn">
        <Spritesheet 
          image={`https://raw.githubusercontent.com/danilosetra/react-responsive-spritesheet/master/assets/images/examples/sprite-image-horizontal.png`}
          widthFrame={420}
          heightFrame={500}
          steps={14}
          fps={10}
          autoplay={true}
          loop={true}
        />
      <style jsx>
        {`
          .oneColunm {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            max-width: 375px;
            height: 100vh;
            margin: 0 auto;
          }
      `}
      </style>
    </div>

  )
}

export default Anim