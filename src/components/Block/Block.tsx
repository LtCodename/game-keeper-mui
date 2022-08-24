import React, { useState } from "react";

import { Card, CardContent, Typography } from "@mui/material/";

import { ISnackbar, IUserBlock } from "types";

import { formatReleaseDate } from "logic";

import { GK } from "components/Loader";
import EditBlockDialog from "components/Block/EditBlockDialog";
import Toast from "components/Toast";

interface Props {
  block: IUserBlock;
  listId: string | undefined;
  deleteBlockCallback: (isError: boolean, message: string) => void;
}

const Block = ({ block, listId, deleteBlockCallback }: Props) => {
  const { name, developers, releaseDate } = block;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [snackbarState, setSnackbarState] = useState<ISnackbar>({
    open: false,
    isError: false,
    message: "",
  });

  const processDevelopers = (): string => {
    if (!developers || !developers.length) return "";

    if (developers.length >= GK.gameDevelopersLength) {
      return `${developers.substring(0, GK.gameDevelopersLength)}...`;
    }
    return developers;
  };

  const processName = (): string => {
    if (!name || !name.length) return "";

    if (name.length >= GK.gameNameLength) {
      return `${name.substring(0, GK.gameNameLength)}...`;
    }
    return name;
  };

  return (
    <>
      <Card
        sx={{ width: 260, mr: 2, mb: 2, p: 2 }}
        onClick={() => setIsModalOpen(true)}
      >
        <CardContent
          sx={{
            p: 0,
            cursor: "pointer",
            "&:last-child": {
              p: 0,
            },
          }}
        >
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {formatReleaseDate(releaseDate)}
          </Typography>
          <Typography variant="h5" component="div">
            {processName()}
          </Typography>
          <Typography color="text.secondary">{processDevelopers()}</Typography>
        </CardContent>
      </Card>

      <EditBlockDialog
        block={block}
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        listId={listId}
        callback={(isError, message) => deleteBlockCallback(isError, message)}
      />

      <Toast
        isError={snackbarState.isError}
        message={snackbarState.message}
        open={snackbarState.open}
        onClose={() =>
          setSnackbarState((previousState: ISnackbar) => ({
            ...previousState,
            open: false,
          }))
        }
      />
    </>
  );
};

export default Block;
