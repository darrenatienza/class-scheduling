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
import ScheduleForm from "../schedule/ScheduleForm";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <ScheduleForm></ScheduleForm>
    </>
  );
};

export default Dashboard;
