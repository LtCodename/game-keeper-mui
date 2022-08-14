import React from "react";
import { Link } from "react-router-dom";

const App = () => (
  <div>
    <Link to="/dashboard">Dashboard</Link> | <Link to="/lists">Lists</Link>
  </div>
);

export default App;
