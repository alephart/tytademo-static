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
                tómate una foto y sé parte del video de lunay
            </div>
            <Link href="/chooseCharacter">
                <Button className="buttonStart" variant="contained">comenzar</Button>
            </Link>
            <div className="copyFooter">
                Al hacer clic estás aceptando los <a href="javascript:void(0);">Términos y condiciones</a>
            </div>
        </div>
    )
}
    
export default Start