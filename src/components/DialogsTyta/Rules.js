import TermsContentEn from './TermsContentEn';
import TermsContentEs from './TermsContentEs';
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
import { useRouter } from 'next/router';

const Rules = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const router = useRouter();
  const { locale } = router;

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
          {locale === 'en' ? <TermsContentEn /> : <TermsContentEs />}
          
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
