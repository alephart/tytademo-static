import React from 'react';
import Button from '@material-ui/core/Button';
import Link from 'next/link'


const mobileAvailable = () => {
    return (
        <div  className="notAvailable">
            <div className="boxItemsNotAvailable">
                <div className="copyNotAvailable">
                    <img className="logoToyota" src="images/logo-toyota.png" alt=""/>
                    <h2>
                        ingresa desde tu celular, tómate la foto y se parte del video de lunay
                    </h2>
                </div>
            </div>
        </div>
    )
}
    
export default mobileAvailable