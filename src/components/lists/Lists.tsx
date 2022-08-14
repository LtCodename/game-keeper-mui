import React from "react";
import { Link, Outlet } from "react-router-dom";

const Lists = () => (
  <div>
    <div>Lists</div>
    <Link to={`list${6972}`}>To 6972</Link>
    <Outlet />
  </div>
);

export default Lists;
