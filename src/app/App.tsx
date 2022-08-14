import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import db from "api/firebase";
// import { getDocs, collection } from "@firebase/firestore";
// import { useDispatch } from "react-redux";
// import platformsActions from "../redux/platformsReducer";

const App = () => {
  // const dispatch = useDispatch();

  // const getGameInfo = () => {
  //   getGameInformation("Firewatch")
  //     .then((res: any) => {
  //       console.log(res);
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // };

  // const getPlatforms = async () => {
  //   const platformsRef = collection(db, "platforms");
  //   await getDocs(platformsRef)
  //     .then((res: any) => {
  //       dispatch({
  //         type: platformsActions.actions.PLATFORMS_SET,
  //         payload: res,
  //       });
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    // getGameInfo();
    // getPlatforms();
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
