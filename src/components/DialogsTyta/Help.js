import {
  Button,
  Dialog,
  DialogContent,
} from '@material-ui/core/';
import useTranslation from 'next-translate/useTranslation';
import { MESSAGE_DIALOG } from '@/helpers/globals';

const Help = ({ isOpen, setIsOpen, message, id }) => {
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
          <h2 className="modal-title">{t("alertDescription_title")}</h2>
          { message === MESSAGE_DIALOG.rememberPhoto && (
            <>
              <p>{t("alertDescription_text")}</p>
              <ul>
                <li>· {t("alertDescription_item1")}</li>
                <li>· {t("alertDescription_item2")}</li>
                <li>· {t("alertDescription_item3")}</li>
                <li>· {t("alertDescription_item4")}</li>
              </ul>
            </>
          )}
          { message === MESSAGE_DIALOG.emailRegistered && (
            <p>{t("alertDescription_userExist")}</p>
          )}
          <Button
            id={id}
            onClick={() => setIsOpen(false)}
            color='primary'
          >
            {t("alertDescription_button")}
          </Button>

      </DialogContent>
    </Dialog>
  );
};

export default Help;
