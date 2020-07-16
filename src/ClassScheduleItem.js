import React from "react";
import moment from "moment";
const ClassScheduleItem = () => {
  const schedules = [
    {
      id: 1,
      timeStart: "07:00",
      timeEnd: "08:00",
      facultyName: "Juan Tamad",
      room: "NB101",
      section: "BSBA",
      subject: "Law",
      dayOfWeek: "Monday",
    },
    {
      id: 2,
      timeStart: "07:00",
      timeEnd: "07:30",
      facultyName: "Tristan Tamad",
      room: "NB101",
      section: "BSBA",
      subject: "Law",
      dayOfWeek: "Wednesday",
    },
  ];
  const timeRanges = [
    { id: 1, timeStart: "07:00", timeEnd: "7:30" },
    { id: 2, timeStart: "07:30", timeEnd: "8:00" },
  ];

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday"];
  // component render view
  return timeRanges.map(({ id, timeStart, timeEnd }) => {
    const trTimeStart = moment(timeStart, "HH:mm");
    const trTimeEnd = moment(timeEnd, "HH:mm");

    const _schedules = [];

    const monday = schedules.filter(
      ({ id, timeStart: _timeStart, timeEnd: _timeEnd, dayOfWeek }) => {
        const sTimeStart = moment(_timeStart, "HH:mm");
        const sTimeEnd = moment(_timeEnd, "HH:mm");
        return (
          trTimeStart.isBefore(sTimeEnd) &&
          trTimeEnd.isAfter(sTimeStart) &&
          dayOfWeek === "Monday"
        );
      }
    )[0];

    const tuesday = schedules.filter(
      ({ id, timeStart: _timeStart, timeEnd: _timeEnd, dayOfWeek }) => {
        const sTimeStart = moment(_timeStart, "HH:mm");
        const sTimeEnd = moment(_timeEnd, "HH:mm");
        return (
          trTimeStart.isBefore(sTimeEnd) &&
          trTimeEnd.isAfter(sTimeStart) &&
          dayOfWeek === "Tuesday"
        );
      }
    )[0];

    const wednesday = schedules.filter(
      ({ id, timeStart: _timeStart, timeEnd: _timeEnd, dayOfWeek }) => {
        const sTimeStart = moment(_timeStart, "HH:mm");
        const sTimeEnd = moment(_timeEnd, "HH:mm");
        return (
          trTimeStart.isBefore(sTimeEnd) &&
          trTimeEnd.isAfter(sTimeStart) &&
          dayOfWeek === "Wednesday"
        );
      }
    )[0];
    const thursday = schedules.filter(
      ({ id, timeStart: _timeStart, timeEnd: _timeEnd, dayOfWeek }) => {
        const sTimeStart = moment(_timeStart, "HH:mm");
        const sTimeEnd = moment(_timeEnd, "HH:mm");
        return (
          trTimeStart.isBefore(sTimeEnd) &&
          trTimeEnd.isAfter(sTimeStart) &&
          dayOfWeek === "Thursday"
        );
      }
    )[0];
    const friday = schedules.filter(
      ({ id, timeStart: _timeStart, timeEnd: _timeEnd, dayOfWeek }) => {
        const sTimeStart = moment(_timeStart, "HH:mm");
        const sTimeEnd = moment(_timeEnd, "HH:mm");
        return (
          trTimeStart.isBefore(sTimeEnd) &&
          trTimeEnd.isAfter(sTimeStart) &&
          dayOfWeek === "Friday"
        );
      }
    )[0];

    const saturday = schedules.filter(
      ({ id, timeStart: _timeStart, timeEnd: _timeEnd, dayOfWeek }) => {
        const sTimeStart = moment(_timeStart, "HH:mm");
        const sTimeEnd = moment(_timeEnd, "HH:mm");
        return (
          trTimeStart.isBefore(sTimeEnd) &&
          trTimeEnd.isAfter(sTimeStart) &&
          dayOfWeek === "Saturday"
        );
      }
    )[0];
    const sunday = schedules.filter(
      ({ id, timeStart: _timeStart, timeEnd: _timeEnd, dayOfWeek }) => {
        const sTimeStart = moment(_timeStart, "HH:mm");
        const sTimeEnd = moment(_timeEnd, "HH:mm");
        return (
          trTimeStart.isBefore(sTimeEnd) &&
          trTimeEnd.isAfter(sTimeStart) &&
          dayOfWeek === "Sunday"
        );
      }
    )[0];

    console.log(wednesday);

    return (
      <tr key={id}>
        <td className="fit">
          {trTimeStart.format("HH:mm A")} - {trTimeEnd.format("HH:mm A")}
        </td>
        <td className="fit">
          {monday === undefined ? "" : monday.facultyName}
          <br />
          <span>{monday.subject}</span>
        </td>
        <td className="fit">{monday === undefined ? "" : monday.section}</td>
        <td className="fit">
          {tuesday === undefined ? "" : tuesday.facultyName}
        </td>
        <td className="fit">{tuesday === undefined ? "" : tuesday.section}</td>
        <td className="fit">
          {wednesday === undefined ? "" : wednesday.facultyName}
        </td>
        <td className="fit">
          {wednesday === undefined ? "" : wednesday.section}
        </td>
        <td className="fit">
          {thursday === undefined ? "" : thursday.facultyName}
        </td>
        <td className="fit">
          {thursday === undefined ? "" : thursday.section}
        </td>
        <td className="fit">
          {friday === undefined ? "" : friday.facultyName}
        </td>
        <td className="fit">{friday === undefined ? "" : friday.section}</td>
        <td className="fit">
          {saturday === undefined ? "" : saturday.facultyName}
        </td>
        <td className="fit">
          {saturday === undefined ? "" : saturday.section}
        </td>
        <td className="fit">
          {sunday === undefined ? "" : sunday.facultyName}
        </td>
        <td className="fit">{sunday === undefined ? "" : sunday.section}</td>
      </tr>
    );
  });
};

export default ClassScheduleItem;
