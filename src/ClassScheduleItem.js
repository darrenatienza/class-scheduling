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
      timeStart: "08:00",
      timeEnd: "8:30",
      facultyName: "Tristan Tamad",
      room: "NB101",
      section: "BSBA",
      subject: "Law",
      dayOfWeek: "Wednesday",
    },
  ];
  const timeRanges = [
    { id: 1, timeStart: "07:00", timeEnd: "7:30" },
    
  ];

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday"];
  // component render view
  return timeRanges.map(({ id, timeStart, timeEnd }) => {
    const trTimeStart = moment(timeStart, "HH:mm");
    const trTimeEnd = moment(timeEnd, "HH:mm");

    const _schedules = [];
    // iterate through days of week
    daysOfWeek.map((d) => {
      return _schedules.push(schedules.filter(
        ({ id, timeStart: _timeStart, timeEnd: _timeEnd, dayOfWeek  }) => {
          const sTimeStart = moment(_timeStart, "HH:mm");
          const sTimeEnd = moment(_timeEnd, "HH:mm");
          return (
            trTimeStart.isBefore(sTimeEnd) && trTimeEnd.isAfter(sTimeStart) && d === dayOfWeek
          );
        }
      )[0]);
    });

    console.log(_schedules);

    return (
      <tr key={id}>
        <td>
          {trTimeStart.format("HH:mm A")} - {trTimeEnd.format("HH:mm A")}
        </td>
        <td>{_schedules[0].facultyName}</td>
        <td>{_schedules[0].section}</td>
        <td>{_schedules[1] !== undefined ? _schedules[1].facultyName : ""}</td>
        <td>{_schedules[1] !== undefined ? _schedules[1].section : ""}</td>
      </tr>
    );
  });
};

export default ClassScheduleItem;
