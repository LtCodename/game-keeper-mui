/**
 * Copyright (c) 2022 Yevhen Chernenko.
 * All rights reserved.
 *
 * https://github.com/LtCodename/game-keeper-mui
 * https://gamekeeper.ltcodename.com
 * https://www.linkedin.com/in/yevhen-chernenko
 * https://ltcodename.com
 */

import React, { useState } from "react";

import { Card, CardContent, Typography } from "@mui/material/";

import { ISnackbar, IUserBlock } from "types";

import { formatReleaseDate } from "logic";

import EditBlockDialog from "components/Block/EditBlockDialog";
import Toast from "components/Toast";

import { NAME_LENGTH } from "config";

interface Props {
  block: IUserBlock;
  listId: string | undefined;
  deleteBlockCallback: (isError: boolean, message: string) => void;
}

const Block = ({ block, listId, deleteBlockCallback }: Props) => {
  const { name, releaseDate } = block;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [snackbarState, setSnackbarState] = useState<ISnackbar>({
    open: false,
    isError: false,
    message: "",
  });

  const processName = (): string => {
    if (!name || !name.length) return "";

    if (name.length >= NAME_LENGTH) {
      return `${name.substring(0, NAME_LENGTH)}...`;
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
          <Typography variant="h6" component="div">
            {processName()}
          </Typography>
          <Typography sx={{ mb: 0 }} color="text.secondary" gutterBottom>
            {!releaseDate || !releaseDate.length
              ? "TBA"
              : formatReleaseDate(releaseDate)}
          </Typography>
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
