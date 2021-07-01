import React from 'react'
import Button from '@material-ui/core/Button'
import Link from 'next/link'

const CopyLink = () => {
    return (
        <div className="copyLink">
            <img className="logoToyota" src="images/logo-toyota.png" alt=""/>
            <div dangerouslySetInnerHTML={{ __html: `
                <video class="videoGeneral" controls="" playsinline="" id="">
                    <source
                        src="/videos/output2.mp4"
                        type="video/mp4"
                    />
                </video>` }}>
            </div>
            <div className="copyJoin">
                ve el video de tu <br/>
                amigo y crea el tuyo.
                <span>
                    Para participar copia el link, luego desde el menú busca la opción abrir desde navegador.
                </span>
            </div>
            <img className="logoToyota" src="images/copyLink.png" alt=""/>
            <Link href="/start">
                <Button className="linkVideo" variant="contained">¡QUIERO MI VIDEO!</Button>
            </Link>
        </div>
    )
}
    
export default CopyLink;