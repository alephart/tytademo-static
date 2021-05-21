import React from 'react';
import Button from '@material-ui/core/Button';
import Link from 'next/link'


const IndexDesktop = () => {
    return (
        <div  className="indexDesktop">
            <div className="boxItemsDesktop">
                <div className="videoDesktop">
                    <div dangerouslySetInnerHTML={{ __html: `
                        <video playsinline="" autoplay=""  muted=""  id="">
                            <source
                                src="output-1.mp4"
                                type="video/mp4"
                            />
                        </video>` }}>
                    </div>
                </div>
                <div className="copydesktop">
                    <img className="logoToyota" src="images/logo-toyota.png" alt=""/>
                    <h2>
                        y tú, ¿ya participaste?
                    </h2>
                    <p>
                        Ingresa desde tu celular, tómate la foto y se parte del video de Lunay
                    </p>
                </div>
            </div>
        </div>
    )
}
    
export default IndexDesktop