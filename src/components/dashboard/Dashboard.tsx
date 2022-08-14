import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IPlatform, IStore } from "types/types";

const Dashboard = () => {
  const platforms: IPlatform[] = useSelector(
    (state: IStore) => state.platforms
  );

  useEffect(() => {
    console.log(platforms);
  }, [platforms]);

  return (
    <div>
      <div>Dashboard</div>
    </div>
  );
};

export default Dashboard;
