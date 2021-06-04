import { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
} from '@material-ui/core/';
import { useTheme } from '@material-ui/core/styles';

const Help = ({ isOpen, setIsOpen }) => {
  //const theme = useTheme();
  //const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >  
      <DialogContent id='alert-dialog-description'>
          <h2 className="modal-title">INTENTA OTRA VEZ</h2>
          <p>Recuerda</p>
          <ul>
            <li>Tu cara debe estar centrada</li>
            <li>Intenta no hacer gestos o sonreír</li>
            <li>Solo tú puedes estar en la foto</li>
            <li>Asegúrate que tu car esté visible</li>
          </ul>
          
          <Button
            onClick={() => setIsOpen(false)}
            color='primary'
          >
            ACEPTAR
          </Button>

      </DialogContent>
    </Dialog>
  );
};

export default Help;
