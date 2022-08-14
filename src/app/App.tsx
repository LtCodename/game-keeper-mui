import React from "react";
import { Link } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";

const App = () => (
  <Box>
    <Stack>
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
