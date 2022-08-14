import React from "react";
import { Link } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const App = () => (
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

export default App;
