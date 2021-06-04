import { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
} from '@material-ui/core/';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'next-i18next';

const Help = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation('common');
  //const theme = useTheme();
  //const [isOpen, setIsOpen] = useState(false);

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
          <p>{t("alertDescription.text")}</p>
          <ul>
            <li>· {t("alertDescription.item1")}</li>
            <li>· {t("alertDescription.item2")}</li>
            <li>· {t("alertDescription.item3")}</li>
            <li>· {t("alertDescription.item4")}</li>
          </ul>
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
