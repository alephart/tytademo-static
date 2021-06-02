import PoliciesContent from './Policies';
import TermsContent from './Terms';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  useMediaQuery,
} from '@material-ui/core/';
import { useTheme } from '@material-ui/core/styles';

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
      {dialog === 'terms' ? <TermsContent /> : <PoliciesContent />}
      
      <DialogContent id='alert-dialog-description' className='terms'>

          <img className='logoToyota' src='/images/logo-toyota.png' alt='Toyota' />
          {dialog === 'terms' ? <TermsContent /> : <PoliciesContent />}
          
          <Button
            className='buttonThanks'
            onClick={() => setIsOpen(false)}
            color='primary'
          >
            Volver
          </Button>

      </DialogContent>

      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default DialogTyta;
