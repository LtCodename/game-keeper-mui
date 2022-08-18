import React from "react";

import {
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material/";

import { IUserBlock } from "types";

import CloseIcon from "@mui/icons-material/Close";

import formatReleaseDate from "logic";

import BootstrapDialog from "./styles";

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, pl: 2, pt: 2, pb: 2, pr: 6 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface Props {
  block: IUserBlock;
  open: boolean;
  handleClose: () => void;
}

const BlockModal = ({ block, open, handleClose }: Props) => {
  const { name, developers, releaseDate } = block;

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {name}
      </BootstrapDialogTitle>
      <DialogContent dividers sx={{ minWidth: 500 }}>
        <Typography gutterBottom>{formatReleaseDate(releaseDate)}</Typography>
        <Typography gutterBottom>{developers}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Save changes
        </Button>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default BlockModal;
