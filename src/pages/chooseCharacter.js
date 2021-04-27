import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Link from 'next/link'



const ChooseCharacter = () => {
    const [select, setSelect] = useState(true);
    const handleSelectCharacter = () => {
        setSelect(false);
    }
    return (
        <div className="chooseCharacter">
            <div className="selectCopy">
                ELIGE TU PERSONAJE
            </div>
            <div className="selectCharacter1" onClick={handleSelectCharacter}>
                <img src="images/masculino.png" alt=""/>
            </div>
            <div className="selectCharacter2" onClick={handleSelectCharacter}>
                <img src="images/femenino.png" alt=""/>
            </div>
            <Link href="/likePicture">
                <Button disabled={select} className="buttonPhoto" variant="contained">TOMAR FOTO</Button>
            </Link>
        </div>
    )
}
    
export default ChooseCharacter