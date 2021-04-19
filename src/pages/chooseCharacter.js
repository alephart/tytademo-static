import React from 'react'
import Button from '@material-ui/core/Button'

const ChooseCharacter = () => {
    return (
        <div className="chooseCharacter">
            <div className="selectCopy">
                selecciona un personaje
            </div>
            <div className="selectCharacter1">
                <img src="images/masculino.png" alt=""/>
            </div>
            <div className="selectCharacter2">
                <img src="images/femenino.png" alt=""/>
            </div>
            <Button className="buttonPhoto" variant="contained">tomar foto</Button>

        </div>
    )
}
    
export default ChooseCharacter