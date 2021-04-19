import React from 'react'
import Button from '@material-ui/core/Button'

const CheckVideoFinal = () => {
    return (
        <div className="checkVideoFinal">
            <img className="logoToyota" src="images/logo-toyota.png" alt=""/>
            <video src="">

            </video>
            <div className="copyJoin">
                ve el video de tu <br/>
                amigo y crea el tuyo.<br/>
                <span>
                    toma una foto y se parte del video <br/>
                    de lunay
                </span>
            </div>
            <Button className="buttonJoin" variant="contained">participar</Button>
        </div>
    )
}
    
export default CheckVideoFinal