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
                ¿TE GUSTA ESTA FOTO?
            </div>
            <Link href="/formVideo">
                <Button className="yesContinue" variant="contained">¡SI!</Button>
            </Link>
            <Button className="againPhoto" variant="contained">VOLVER A TOMAR</Button>
        </div>
    )
}
    
export default LikePicture