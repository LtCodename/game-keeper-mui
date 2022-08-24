import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material/";

interface Props {
  message: string;
  open: boolean;
  onClose: () => void;
  onAction?: () => void;
}

const WarningDialog = ({ message, onClose, open, onAction }: Props) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Warning!</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
      {onAction && (
        <Button color="success" onClick={onAction}>
          Proceed
        </Button>
      )}
    </DialogActions>
  </Dialog>
);

export default WarningDialog;
