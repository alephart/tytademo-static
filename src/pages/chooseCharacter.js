import React from 'react'
import Button from '@material-ui/core/Button'
import Link from 'next/link'

const ChooseCharacter = () => {
    return (
        <div className="chooseCharacter">
            <div className="selectCopy">
                ELIGE TU PERSONAJE
            </div>
            <div className="selectCharacter1">
                <img src="images/masculino.png" alt=""/>
            </div>
            <div className="selectCharacter2">
                <img src="images/femenino.png" alt=""/>
            </div>
            <Link href="/likePicture">
                <Button className="buttonPhoto" variant="contained">TOMAR FOTO</Button>
            </Link>
        </div>
    )
}
    
export default ChooseCharacter