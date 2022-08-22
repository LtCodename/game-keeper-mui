import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import { IStore, IUserList } from "types";

import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const userData: any = useSelector((state: IStore) => state.userData) || null;

  const userLists: IUserList[] =
    useSelector((state: IStore) => state.userLists) || [];

  useEffect(() => {
    if (!userData) {
      navigate("/login", { replace: true });
    } else if (userLists.length) {
      navigate(`/${userLists[0].id}`, { replace: true });
    }
  }, [userData, userLists]);

  return <Outlet />;
};

export default Dashboard;
