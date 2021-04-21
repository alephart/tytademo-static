import React from 'react'
import Button from '@material-ui/core/Button'
import Link from 'next/link'

const SharedExperience = () => {
    return (
        <div className="sharedExperience">
            <img className="logoToyota" src="images/logo-toyota.png" alt=""/>
            <video src="images/logo-toyota.png">

            </video>
            <div className="copyThanks">
                 <br/>
                <div className="copyLunay">
                    ¡Ya eres parte del video de LUNAY!
                </div>
                <span>
                    Ahora descárgalo y compártelo con el mundo, podrías ganar que Lunay lo comparta y otros premios increíbles. 
                </span>
            </div>
            <div className="sharedSocial">
                compartir video <br/>
                <div className="iconSocial">
                    <a href="">
                        <img src="images/twitter.svg" alt=""/>
                    </a>
                    <a href="">
                        <img src="images/facebook.svg" alt=""/>
                    </a>
                </div>
            </div>
            <Link href="/checkVideoFinal">
                <Button className="buttonThanks" variant="contained">descargar video</Button>
            </Link>
            <div className="copyFooter">
                Haz <a href="">click aquí</a> para ver las reglas y condiciones
            </div>
        </div>
    )
}
    
export default SharedExperience