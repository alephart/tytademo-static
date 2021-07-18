import PoliciesContent from './PoliciesContent';
import TermsContent from './TermsContent';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  useMediaQuery,
} from '@material-ui/core/';
import { useTheme } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';

const Rules = ({ dialog, isOpen, setIsOpen }) => {
  const { t } = useTranslation('common');
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
      <DialogContent id='alert-dialog-description' className='terms'>

          <img className='logoToyota' src='/images/logo-toyota.png' alt='Toyota' />
          {dialog === 'terms' ? <TermsContent /> : <PoliciesContent />}
          
          <Button
            className='buttonThanks'
            onClick={() => setIsOpen(false)}
            color='primary'
          >
            {t("back_button")}
          </Button>

      </DialogContent>

      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default Rules;
