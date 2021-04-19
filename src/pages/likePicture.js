import React from 'react'
import Button from '@material-ui/core/Button'

const LikePicture = () => {
    return (
        <div className="likePicture">
            <div className="paddingCanvas"></div>
            <div className="canvasPhoto">
                <img src="" alt=""/>
            </div>
            <div className="copyLike">
                ¿te gusta tu foto?
            </div>
            <Button className="yesContinue" variant="contained">sí, continuar</Button>
            <Button className="againPhoto" variant="contained">volver a tomar</Button>
        </div>
    )
}
    
export default LikePicture