const ButtonTake = ({onClick}) => {
  return(
    <div className="container-circles">
    <div className="outer-circle">
      <div className="inner-circle" onClick={onClick}></div>
    </div>
    <style jsx>{`
        .container-circles {
          position: relative;
          height: 75px;
          width: 75px;
          margin: 10px auto;
          cursor: pointer;
        }

        .outer-circle {
          position: absolute;
          left: 0;

          height: 75px;
          width: 75px;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 50%;
          z-index: 1;
        }

        .inner-circle {
          position: absolute;
          left: 50%;
          top: 38px;
          height: 44px;
          width: 44px;
          background: black;
          border-radius: 50%;
          /*
          Offset the position correctly with
          minus half of the width and minus half of the height
          */
          margin: -22px 0px 0px -22px;

          /*
            On the top of outer-circle
          */
          z-index: 2;
        }

        .inner-circle.is-clicked, 
        .inner-circle:hover {
          height: 38px;
          width: 38px;
          margin: -19px 0px 0px -19px;
        }
    `}</style>
  </div>
  )
}

export default ButtonTake