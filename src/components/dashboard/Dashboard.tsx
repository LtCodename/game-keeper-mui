import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import { IPlatform, IStore } from "types/types";

import { Link, Outlet } from "react-router-dom";

import { Box, Typography } from "@mui/material/";
// import db from "api/firebase";
// import { getDocs, collection } from "@firebase/firestore";
// import { useDispatch } from "react-redux";
// import platformsActions from "../redux/platformsReducer";

const Dashboard = () => {
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

  const platforms: IPlatform[] = useSelector(
    (state: IStore) => state.platforms
  );

  useEffect(() => {
    console.log(platforms);
  }, [platforms]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography noWrap sx={{}}>
        Logged as LtCodename.
      </Typography>
      <Typography noWrap sx={{}}>
        This portal uses RAWG API.
      </Typography>
      <Typography noWrap sx={{}}>
        Version: 1.001.
      </Typography>
      <Link to={`list${6972}`}>To 6972</Link>
      <Outlet />
    </Box>
  );
};

export default Dashboard;
