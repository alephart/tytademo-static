const ButtonTake = ({onClick}) => {
  return(
    <div className="container-circles">
    <div className="outer-circle">
      <div className="inner-circle" onClick={onClick}></div>
    </div>
  </div>
  )
}

export default ButtonTake