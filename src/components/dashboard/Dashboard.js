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
import ClassScheduleForm from "../schedule/ClassScheduleForm";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <ClassScheduleForm></ClassScheduleForm>
    </>
  );
};

export default Dashboard;
