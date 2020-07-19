import React, { useState, useEffect } from "react";
import moment from "moment";
const ClassScheduleItem2 = () => {
  const [idStores, setIdStore] = useState([]);
  const [timeRanges, setTimeRange] = useState([
    { id: 1, timeStart: "07:00", timeEnd: "8:00" },
    { id: 2, timeStart: "08:00", timeEnd: "9:00" },
    { id: 3, timeStart: "09:00", timeEnd: "10:00" },
  ]);
  const idStoress = [];
  const [days, setDay] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);
  const [colDays, setColDays] = useState([]);
  const [schedules, setSchedule] = useState([
    {
      id: 1,
      timeStart: "07:00",
      timeEnd: "09:30",
      facultyName: "Juan Tamad",
      room: "NB101",
      section: "CIT",
      subject: "Law",
      dayOfWeek: "Monday",
    },
    {
      id: 2,
      timeStart: "08:30",
      timeEnd: "10:00",
      facultyName: "Juan Tamad",
      room: "NB101",
      section: "BSBA",
      subject: "Law",
      dayOfWeek: "Tuesday",
    },
    {
      id: 3,
      timeStart: "07:30",
      timeEnd: "08:00",
      facultyName: "Tristan Tamad",
      room: "NB101",
      section: "BSBA",
      subject: "Law",
      dayOfWeek: "Thursday",
    },
  ]);

  const isExists = (id) => {
    if (id !== undefined) {
      const _id = idStoress.filter((s) => s === id);

      if (_id > 0) {
        // id already exists
        console.log(id + "exits");
        return true;
      } else {
        // id not exists
        //setIdStore((idStores) => [...idStores, id]);
        idStoress.push(id);
        console.log("First Check on id " + id);
        return false;
      }
    }
  };

  const createTimeArr = (startTime, endTime) => {
    if (startTime !== undefined && endTime !== undefined) {
      const f = "HH:mm";
      const timeStart = moment(startTime, f);
      const timeEnd = moment(endTime, f);
      const timeArr = [];
      timeArr.push(timeStart.format(f));
      while (timeStart.format(f) !== timeEnd.format(f)) {
        timeStart.add(30, "minutes");
        timeArr.push(timeStart.format(f));
      }
      return timeArr;
    }
  };
  useEffect(() => {}, []);
  // component render view
  return (
    <>
      {/** iterate through time ranges */}
      {timeRanges.map(({ id, timeStart, timeEnd }) => {
        const trTimeStart = moment(timeStart, "HH:mm");
        const trTimeEnd = moment(timeEnd, "HH:mm");
        return (
          <tr key={id}>
            {/**keys required */}
            <td className="fit">
              {trTimeStart.format("HH:mm A")} - {trTimeEnd.format("HH:mm A")}
            </td>

            {/** iterate through days */}
            {days.map((d, index) => {
              const a = schedules.filter(
                ({
                  id,
                  timeStart: _timeStart,
                  timeEnd: _timeEnd,
                  dayOfWeek,
                }) => {
                  const sTimeStart = moment(_timeStart, "HH:mm");
                  const sTimeEnd = moment(_timeEnd, "HH:mm");
                  return (
                    trTimeStart.isBefore(sTimeEnd) &&
                    trTimeEnd.isAfter(sTimeStart) &&
                    dayOfWeek === d
                  );
                }
              )[0];
              let timeHit = 0;
              const timeArr = [];
              if (a !== undefined) {
                const _timeArr = createTimeArr(a.timeStart, a.timeEnd);

                _timeArr.forEach((time) => {
                  const evalTime = moment(time, "HH:mm");

                  if (evalTime.isBetween(trTimeStart, trTimeEnd)) {
                    timeHit = timeHit + 1;
                  }
                });
                // todo check for time hit
                console.log(timeHit);
              }

              const isExist = false;
              return (
                <React.Fragment key={index}>
                  {/** highlight half of the cell if contains :30 in start or end time */}

                  <td
                    className={
                      a === undefined
                        ? ""
                        : !a.timeStart.includes(":30") && !isExist
                        ? "highlight-whole"
                        : a.timeStart.includes(":30") && !isExist
                        ? "highlight-bottom"
                        : a.timeEnd.includes(":30") && !isExist
                        ? "highlight-top"
                        : a.timeStart.includes(":30") && isExist
                        ? "highlight-whole"
                        : a.timeEnd.includes(":30") && isExist
                        ? "highlight-top"
                        : ""
                    }
                  >
                    {a === undefined ? "" : a.facultyName}
                    <br />
                    {a === undefined ? "" : a.timeStart + " " + a.timeEnd}
                    <br />
                    {a === undefined ? "" : a.subject}
                  </td>
                  <td className="fit">{a === undefined ? "" : a.section}</td>
                </React.Fragment>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};

export default ClassScheduleItem2;
