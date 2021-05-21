import React from 'react';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


const Start = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    return (
        <div  className="starPage">
            <div dangerouslySetInnerHTML={{ __html: `
                <video playsinline="" autoplay=""  muted=""  id="video">
                    <source
                        src="video.mp4"
                        type="video/mp4"
                    />
                </video>,` }}>
            </div>
            <div dangerouslySetInnerHTML={{ __html: `
                <video playsinline="" loop="" autoplay=""  muted=""  id="video2">
                    <source
                        src="videoloop.mp4"
                        type="video/mp4"
                    />
                </video>,` }}>
            </div>
            <div className="copyStart">
                TÓMATE UNA SELFIE Y SÉ PARTE DEL VIDEO DE LUNAY
                <span>
                    Regístrate y podrías ganar una charla virtual con Lunay y más premios increíbles.
                </span>
            </div>
            <Link href="/chooseCharacter">
                <Button className="buttonStart" variant="contained">comenzar</Button>
            </Link>
            <div className="copyFooter">
                Al hacer click estás aceptando los <a onClick={handleClickOpen}>Términos y condiciones</a>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullScreen={fullScreen}
            >
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <div className="terms">
                    <img className="logoToyota" src="images/logo-toyota.png" alt=""/>
                    <div className="copyThanks">
                        <br/>
                        <div className="copyLunay">
                            ¡Ya eres parte del video de LUNAY!
                        </div>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </span>
                        <p className="textTerms">
                            Lorem ipsum dolor sit amet, 
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p className="textTerms">
                            Lorem ipsum dolor sit amet, 
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p className="textTerms">
                            Lorem ipsum dolor sit amet, 
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p className="textTerms">
                            Lorem ipsum dolor sit amet, 
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        
                    </div>
                    <Button className="buttonThanks"  onClick={handleClose} color="primary">
                        Volver
                    </Button>
                </div>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                
                </DialogActions>
            </Dialog>
        </div>
    )
}
    
export default Start