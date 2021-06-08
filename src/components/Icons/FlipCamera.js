const FlipCamera = ({onClick}) => {
  return(
    <button onClick={onClick}>
      <img className="flipCamera" src="images/cta-girar-camara.svg" width="40px" alt="Flip Camera" />
    </button>
  )
}

export default FlipCamera