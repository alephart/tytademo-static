const ButtonTake = ({id, onClick}) => {
  return(
    <div className="container-circles">
    <div className="outer-circle">
      <div id={id} className="inner-circle" onClick={onClick}></div>
    </div>
  </div>
  )
}

export default ButtonTake