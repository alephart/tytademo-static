import {
  Button,
  Dialog,
  DialogContent,
} from '@material-ui/core/';

const Demo = ({ isOpen, setIsOpen, final, id }) => {
  return (
    <Dialog
      className="dialogs"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-message'
    >  
      <DialogContent id='alert-dialog-message'>
          <h2 className="modal-title">DEMO VERSION</h2>
          <div className="center">
            <p>This is a demo version of the app.
            Because of the reface paid component,
            it is no longer active.</p>

            <p>After registering,
            participants received their custom video
            with their faces added
            to the chosen character.</p>

            {final  && (
              <p>See the music video here in this page.</p>
            )}
          </div>
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

export default Demo;
