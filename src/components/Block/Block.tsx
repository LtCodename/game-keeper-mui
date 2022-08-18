import React, { useState } from "react";

import { Card, Typography, CardContent } from "@mui/material/";

import { IUserBlock } from "types";

import formatReleaseDate from "logic";

import BlockModal from "./BlockModal";

interface Props {
  block: IUserBlock;
}

const Block = ({ block }: Props) => {
  const { name, developers, releaseDate } = block;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const processDevelopers = (): string => {
    if (!developers || !developers.length) return "";

    if (developers.length >= 59) {
      return `${developers.substring(0, 59)}...`;
    }
    return developers;
  };

  const processName = (): string => {
    if (!name || !name.length) return "";

    if (name.length >= 43) {
      return `${name.substring(0, 43)}...`;
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
      <BlockModal
        block={block}
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Block;