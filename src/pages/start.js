import React from 'react';
import Button from '@material-ui/core/Button';
import Link from 'next/link'

const Start = () => {
    return (
        <div  className="starPage">
            <div dangerouslySetInnerHTML={{ __html: `
                <video playsinline="" autoplay="" loop="" muted=""  id="video">
                    <source
                        src="video.mp4"
                        type="video/mp4"
                    />
                </video>,` }}>
            </div>
            
            <img src="intro.gif" alt=""/>
            <div className="copyStart">
                TÓMATE UNA SELFIE Y SÉ PARTE DEL VIDEO DE LUNAY
            </div>
            <Link href="/chooseCharacter">
                <Button className="buttonStart" variant="contained">comenzar</Button>
            </Link>
            <div className="copyFooter">
                Al hacer click estás aceptando los <a href="javascript:void(0);">Términos y condiciones</a>
            </div>
        </div>
    )
}
    
export default Start