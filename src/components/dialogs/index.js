import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import PoliciesContent from './Policies';
import TermsContent from './Policies';

const DialogTyta = ({ dialog, isOpen, setIsOpen }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      fullScreen={fullScreen}
    >
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <div className='terms'>
            <img className='logoToyota' src='images/logo-toyota.png' alt='' />
              {dialog === 'policies' ?
                (
                  <PoliciesContent />
                ) : (
                  <TermsContent />
                )
              }
            <Button
              className='buttonThanks'
              onClick={() => setIsOpen(false)}
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

export default DialogTyta;