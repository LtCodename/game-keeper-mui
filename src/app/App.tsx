import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import { getGameInformation } from "api/rawgApi";

const App = () => {
  // const getGameInfo = () => {
  //   getGameInformation("Firewatch")
  //     .then((res: any) => {
  //       console.log(res);
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    // getGameInfo();
  }, []);

  return (
    <Box>
      <Stack>
        <SearchIcon />
        <Link to="/dashboard">
          <Typography>Dashboard</Typography>
        </Link>
        <Link to="/lists">
          <Typography>Lists</Typography>
        </Link>
      </Stack>
    </Box>
  );
};

export default App;
