import React from "react";
import NavBar from "./NavBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <NavBar />
    </>
  );
};

export default Dashboard;
