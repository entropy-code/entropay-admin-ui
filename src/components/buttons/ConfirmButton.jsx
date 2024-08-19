import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SaveIcon from '@mui/icons-material/Save';
import { SaveButton, useSaveContext } from 'react-admin';

export default function ConfirmButton({ daysRequested, daysAvailable, employeeData }) {
  const [open, setOpen] = useState(false);
  const { save } = useSaveContext();

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleCancel = () => {
    setOpen(false);
  }
  
  const handleClose = () => {
    handleCancel()
    save(employeeData)
  };

  useEffect(() => {

  }, [open])

  return (
    <>
      <Button variant="contained" startIcon={<SaveIcon fontSize="small" />} onClick={handleClickOpen}>
        Save
      </Button>
      <Dialog
        open={open}
        onClose={handleClickOpen}
      >
        <DialogTitle> {"Confirm PTO request days?"} </DialogTitle>
        <DialogContent>
          <DialogContentText>
            The PTO days requested are higher than the days you have available.
          </DialogContentText>
          <hr />
          <DialogContentText>
            Available vacation days: <b>{daysAvailable}</b>
          </DialogContentText>
          <DialogContentText>
            Days you requested: <b>{daysRequested}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancel()}>Cancel</Button>
          <SaveButton
            label="Confirm"
            onClick={handleClose}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}