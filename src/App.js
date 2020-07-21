import React, { useState } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Table } from "react-bootstrap";
import moment from "moment";
import ClassScheduleItem2 from "./ClassScheduleItem2";
const App = () => {
  return (
    <div className="App container">
      <header>Sample Test for Scheduling System</header>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Time</th>
            <th>Monday</th>
            <th>Section</th>
            <th>Tuesday</th>
            <th>Section</th>
            <th>Wednesday</th>
            <th>Section</th>
            <th>Thrusday</th>
            <th>Section</th>
            <th>Friday</th>
            <th>Section</th>
            <th>Saturday</th>
            <th>Section</th>
            <th>Sunday</th>
            <th>Section</th>
          </tr>
        </thead>
        <tbody>
          <ClassScheduleItem2 />
        </tbody>
      </Table>
    </div>
  );
};

export default App;
