import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const DialogTerms = ({ c, isOpen }) => {
  const [isOpenTerms, setIsOpenTerms] = useState(false);
  const [isOpenPolicies, setIsOpenPolicies] = useState(false);
  const [dialog, setDialog] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    handleDialog(handleDialog, isOpen);
  }, [isOpen]);

  const handleDialog = (dialog, action) => {
    switch (dialog) {
      case 'terms':
        setIsOpenTerms(action);
        break;
      case 'policies':
        setIsOpenPolicies(action);
        break;
    
      default:
        setDialog(action);
        break;
    }
  };

  return (
    <Dialog
      open={isOpenTerms}
      onClose={() => handleDialog(dialog, false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      fullScreen={fullScreen}
    >
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <div className='terms'>
            <img className='logoToyota' src='images/logo-toyota.png' alt='' />
            <div className='copyThanks'>
              <br />
              <div className='copyLunay'>
                ¡Ya eres parte del video de LUNAY!
              </div>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </span>
              <p className='textTerms'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className='textTerms'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className='textTerms'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className='textTerms'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <Button
              className='buttonThanks'
              onClick={() => handleDialog(dialog, false)}
              color='primary'
            >
              Volver
            </Button>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default DialogTerms;