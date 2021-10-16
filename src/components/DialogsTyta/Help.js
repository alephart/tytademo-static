import {
  Button,
  Dialog,
  DialogContent,
} from '@material-ui/core/';
import { MESSAGE_DIALOG } from '@/helpers/globals';

const Help = ({ isOpen, setIsOpen, message, id }) => {
  return (
    <Dialog
      className="dialogs"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >  
      <DialogContent id='alert-dialog-description'>
          <h2 className="modal-title">TRY AGAIN</h2>
          { message === MESSAGE_DIALOG.rememberPhoto && (
            <>
              <p>Remember:</p>
              <ul>
                <li>· Your face should be centered</li>
                <li>· Avoid smiling and other gestures</li>
                <li>· Only one person in the photo</li>
                <li>· Make sure your face is visible</li>
              </ul>
            </>
          )}
          { message === MESSAGE_DIALOG.emailRegistered && (
            <p>This email address is already registered.</p>
          )}
          <Button
            id={id}
            className={id}
            onClick={() => setIsOpen(false)}
            color='primary'
          >
            OK
          </Button>

      </DialogContent>
    </Dialog>
  );
};

export default Help;
