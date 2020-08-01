import React from "react";
import ClassScheduleItemV3 from "./components/reports/ClassScheduleItemV3";
const ClassScheduleReport = () => {
  return (
    <div>
      <header>Sample Test for Scheduling System</header>
      <Table bordered hover responsive>
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
          <ClassScheduleItemV3 />
        </tbody>
      </Table>
    </div>
  );
};

export default ClassScheduleReport;
