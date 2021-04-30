import React from 'react';
import Button from '@material-ui/core/Button';
import Link from 'next/link'


const Start = () => {
    return (
        <div  className="starPage">
            <div dangerouslySetInnerHTML={{ __html: `
                <video playsinline="" autoplay=""  muted=""  id="video">
                    <source
                        src="video.mp4"
                        type="video/mp4"
                    />
                </video>,` }}>
            </div>
            <div dangerouslySetInnerHTML={{ __html: `
                <video playsinline="" loop="" autoplay=""  muted=""  id="video2">
                    <source
                        src="videoloop.mp4"
                        type="video/mp4"
                    />
                </video>,` }}>
            </div>
            <div className="copyStart">
                Regístrate y podrías ganar una charla virtual con Lunay y más premios increíbles.
            </div>
            <Link href="/chooseCharacter">
                <Button className="buttonStart" variant="contained">comenzar</Button>
            </Link>
            <div className="copyFooter">
                Al hacer click estás aceptando los <Link href="/terms">Términos y condiciones</Link>
            </div>
        </div>
    )
}
    
export default Start