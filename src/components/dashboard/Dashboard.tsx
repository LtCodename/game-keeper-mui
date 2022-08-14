import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IPlatform, IStore } from "types/types";
import { Link, Outlet } from "react-router-dom";
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
    <div>
      <div>Dashboard</div>
      <Link to={`list${6972}`}>To 6972</Link>
      <Outlet />
    </div>
  );
};

export default Dashboard;
