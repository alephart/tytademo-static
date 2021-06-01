import React from 'react'
import Button from '@material-ui/core/Button'
import Link from 'next/link'

const CheckVideoFinal = () => {
    return (
        <div className="checkVideoFinal">
            <img className="logoToyota" src="/images/logo-toyota.png" alt=""/>
            <div dangerouslySetInnerHTML={{ __html: `
                <video class="videoGeneral" controls="" playsinline="" id="">
                    <source
                        src="/output2.mp4"
                        type="video/mp4"
                    />
                </video>` }}>
            </div>
            <div className="copyJoin">
                ve el video de tu <br/>
                amigo y crea el tuyo.<br/>
                <span>
                    Tómate una selfie para ser parte del video <br/> de Lunay.
                </span>
            </div>
            <Link href="/start">
                <Button className="buttonJoin" variant="contained">¡QUIERO MI VIDEO!</Button>
            </Link>
        </div>
    )
}
    
export default CheckVideoFinal