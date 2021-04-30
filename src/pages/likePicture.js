import React from 'react'
import Button from '@material-ui/core/Button'
import Link from 'next/link' 

const LikePicture = () => {
    return (
        <div className="likePicture">
            <div className="boxPhoto" style={{ backgroundImage: 'url(images/background_image.png)' }}></div>
            <div className="paddingCanvas"></div>
            <div className="bgdegrade"></div>
            <div className="boxIframe" dangerouslySetInnerHTML={{ __html: "<iframe src='face/new-vectors.html' />"}} />
            <div className="copyLike">
                ¿TE GUSTA ESTA FOTO?
            </div>
            <Link href="/formVideo">
                <Button className="yesContinue" variant="contained">¡SI!</Button>
            </Link>
            <Link href="/chooseCharacter">
                <Button className="againPhoto" variant="contained">VOLVER A TOMAR</Button>
            </Link>
        </div>
    )
}

export default LikePicture