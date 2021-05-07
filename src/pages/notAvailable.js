import React from 'react';
import Button from '@material-ui/core/Button';
import Link from 'next/link'


const NotAvailable = () => {
    return (
        <div  className="notAvailable">
            <div className="boxItemsNotAvailable">
                <div className="copyNotAvailable">
                    <img className="logoToyota" src="images/logo-toyota.png" alt=""/>
                    <h2>
                        esta campaña no está disponible en tu país.
                    </h2>
                    <p>
                        Conoce el nuevo Corolla Apex:
                        <Link href="www.toyota.com/corolla/">
                            www.toyota.com/corolla/
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NotAvailable