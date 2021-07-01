import {
  Button,
  Dialog,
  DialogContent,
} from '@material-ui/core/';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'next-i18next';
import { MESSAGE_DIALOG } from '@/helpers/globals';

const Help = ({ isOpen, setIsOpen, message }) => {
  const { t } = useTranslation('common');
  return (
    <Dialog
      className="dialogs"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >  
      <DialogContent id='alert-dialog-description'>
          <h2 className="modal-title">{t("alertDescription.title")}</h2>
          { message === MESSAGE_DIALOG.rememberPhoto && (
            <>
              <p>{t("alertDescription.text")}</p>
              <ul>
                <li>· {t("alertDescription.item1")}</li>
                <li>· {t("alertDescription.item2")}</li>
                <li>· {t("alertDescription.item3")}</li>
                <li>· {t("alertDescription.item4")}</li>
              </ul>
            </>
          )}
          { message === MESSAGE_DIALOG.emailRegistered && (
            <p>{t("alertDescription.userExist")}</p>
          )}
          <Button
            onClick={() => setIsOpen(false)}
            color='primary'
          >
            {t("alertDescription.button")}
          </Button>

      </DialogContent>
    </Dialog>
  );
};

export default Help;
