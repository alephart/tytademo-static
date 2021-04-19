import React from 'react'
import Button from '@material-ui/core/Button'
import Link from 'next/link'

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
            <Link href="/formVideo">
                <Button className="yesContinue" variant="contained">sí, continuar</Button>
            </Link>
            <Button className="againPhoto" variant="contained">volver a tomar</Button>
        </div>
    )
}
    
export default LikePicture