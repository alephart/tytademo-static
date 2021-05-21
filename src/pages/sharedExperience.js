import React from 'react';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const SharedExperience = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <div className="sharedExperience">
            <img className="logoToyota" src="images/logo-toyota.png" alt=""/>
            <div dangerouslySetInnerHTML={{ __html: `
                <video class="videoGeneral" controls="" playsinline="" id="">
                    <source
                        src="output-1.mp4"
                        type="video/mp4"
                    />
                </video>` }}>
            </div>
            <div className="copyThanks">
                 <br/>
                <div className="copyLunay">
                    ¡Ya eres parte del video de LUNAY!
                </div>
                <span>
                    Ahora descárgalo y compártelo con el mundo. Podrías 
                    ganar una charla online con Lunay y otros premios increíbles.
                </span>
            </div>
            <div className="sharedSocial">
                compartir video <br/>
                <div className="iconSocial">
                    <a href="">
                        <img src="images/twitter.svg" alt=""/>
                    </a>
                    <a href="">
                        <img src="images/facebook.svg" alt=""/>
                    </a>
                </div>
            </div>
            <Link href="/checkVideoFinal">
                <Button className="buttonThanks" variant="contained">descargar video</Button>
            </Link>
            <div className="copyFooter">
                Haz <a onClick={handleClickOpen}>click aquí</a> para ver las reglas y condiciones.
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
    
export default SharedExperience