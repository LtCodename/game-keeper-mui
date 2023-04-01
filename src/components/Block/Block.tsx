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

import type { UserBlock } from "types";

import { formatReleaseDate, trimName } from "logic";

import EditBlockDialog from "components/Block/EditBlockDialog";

interface Props {
  block: UserBlock;
  listId: string;
  deleteBlockCallback: (isError: boolean, message: string) => void;
}

const Block = ({ block, listId, deleteBlockCallback }: Props) => {
  const { name, releaseDate } = block;

  const [isModalOpen, setIsModalOpen] = useState(false);

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
            {trimName(name)}
          </Typography>
          <Typography sx={{ mb: 0 }} color="text.secondary" gutterBottom>
            {formatReleaseDate(releaseDate)}
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
    </>
  );
};

export default Block;
