import React from 'react'
import Button from '@material-ui/core/Button'

const CheckVideoFinal = () => {
    return (
        <div className="checkVideoFinal">
            <img className="logoToyota" src="images/logo-toyota.png" alt=""/>
            <video src="" className="checkVideoFinalVideo">

            </video>
            <div className="copyJoin">
                ve el video de tu <br/>
                amigo y crea el tuyo.<br/>
                <span>
                    Tómate una selfie para ser parte del video <br/> de Lunay 
                </span>
            </div>
            <Button className="buttonJoin" variant="contained">QUIERO MI VIDEO</Button>
        </div>
    )
}
    
export default CheckVideoFinal