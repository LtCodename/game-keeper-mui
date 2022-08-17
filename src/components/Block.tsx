import React, { useEffect } from "react";

import { Card, Typography, CardContent } from "@mui/material/";

import { IUserBlock } from "types";

import moment from "moment";

const Block = ({ name, developers, platforms, releaseDate }: IUserBlock) => {
  useEffect(() => {}, [platforms]);

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

  const processReleaseDate = (): string =>
    moment(releaseDate).format("MMMM D YYYY");

  return (
    <Card sx={{ width: 260, mr: 2, mb: 2, p: 2 }}>
      <CardContent
        sx={{
          p: 0,
          "&:last-child": {
            p: 0,
          },
        }}
      >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {processReleaseDate()}
        </Typography>
        <Typography variant="h5" component="div">
          {processName()}
        </Typography>
        <Typography color="text.secondary">{processDevelopers()}</Typography>
      </CardContent>
    </Card>
  );
};

export default Block;
