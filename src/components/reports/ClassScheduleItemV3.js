import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
import { findByLabelText } from "@testing-library/react";
const ClassScheduleItemV3 = () => {
  //format of time use
  const f = "HH:mm";
  const fA = "HH:mm A";
  const idStores = [];
  const sectionStores = [];
  const [timeRanges, setTimeRange] = useState([
    { id: 1, timeStart: "07:00", timeEnd: "8:00" },
    { id: 2, timeStart: "08:00", timeEnd: "9:00" },
    { id: 3, timeStart: "09:00", timeEnd: "10:00" },
    { id: 4, timeStart: "10:00", timeEnd: "11:00" },
    { id: 5, timeStart: "11:00", timeEnd: "12:00" },
    { id: 6, timeStart: "12:00", timeEnd: "13:00" },
  ]);

  const [daysOfWeek, setDaysOfWeek] = useState([
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" },
    { id: 7, name: "Sunday" },
  ]);
  const [colDays, setColDays] = useState([]);
  const [schedules, setSchedule] = useState([
    {
      id: 1,
      timeStart: "07:30",
      timeEnd: "09:00",
      facultyName: "Juan Tamad",
      room: "NB101",
      section: "CIT",
      college: "CIT",
      subject: "Law",
      dayOfWeek: "Tuesday",
    },
    {
      id: 2,
      timeStart: "07:00",
      timeEnd: "10:00",
      facultyName: "Juan Tamad2",
      room: "NB101",
      section: "BSBA",
      college: "CABEIHM",
      subject: "Law",
      dayOfWeek: "Monday",
    },
    {
      id: 3,
      timeStart: "09:30",
      timeEnd: "10:30",
      facultyName: "Juan Tamad3",
      room: "NB101",
      section: "CIT",
      college: "CIT",
      subject: "Law",
      dayOfWeek: "Tuesday",
    },
  ]);

  // array that provides specific time structure of specific schedule
  const createTimeArr = (startTime, endTime) => {
    if (startTime !== undefined && endTime !== undefined) {
      const timeStart = moment(startTime, f);
      const timeEnd = moment(endTime, f);
      const timeArr = [timeStart.format(f)];
      while (timeStart.format(f) !== timeEnd.format(f)) {
        timeStart.add(30, "minutes");
        timeArr.push(timeStart.format(f));
      }
      return timeArr;
    }
  };
  const bgColor = (college) => {
    switch (college) {
      case "CIT":
        return "red";
        break;
      case "CABEIHM":
        return "orange";
        break;
      case "CTE":
        return "blue";
        break;
      default:
        return "white";
        break;
    }
  };
  const height = (timeSequence) => {
    switch (timeSequence) {
      case "10":
        return "50%";
      case "01":
        return "50%";
      default:
        return "100%";
    }
  };
  const mstyle = (college, timeSequence, cellItemCount, isSection) => {
    const mPadding = "0px";
    const half = "50%";

    switch (timeSequence) {
      case "10":
        return {
          backgroundColor: !isSection ? bgColor(college) : "",
          padding: mPadding,
          height: half,
          lineHeight: "15px",
        };
      case "01":
        console.log(cellItemCount);
        let style = {};
        if (cellItemCount > 1) {
          style = {
            backgroundColor: !isSection ? bgColor(college) : "",
            lineHeight: "15px",
            padding: mPadding,
            height: half,
            position: "relative",
            top: "0px",
          };
        } else {
          style = {
            backgroundColor: !isSection ? bgColor(college) : "",
            lineHeight: "15px",
            padding: mPadding,
            height: half,
            position: "relative",
            top: "37.5px",
          };
        }
        return style;

      default:
        return {
          backgroundColor: !isSection ? bgColor(college) : "",
          padding: mPadding,
          lineHeight: "15px",
          height: "101%",
          position: "relative",
        };
    }
  };

  const createTimeSequence = (
    scheduleTimeArr = [],
    timeStart,
    timeEnd,
    facultyName = ""
  ) => {
    let timeSequence = "";
    scheduleTimeArr.forEach((time) => {
      // time to evaluate
      const evalTime = moment(time, f);

      if (evalTime.isSame(timeStart) || evalTime.isSame(timeEnd)) {
        // evaluated time if the same
        timeSequence = timeSequence + "1";
        console.log(
          evalTime.format(f) +
            " is same of " +
            timeStart.format(f) +
            " or " +
            timeEnd.format(f) +
            " of " +
            facultyName +
            " schedule"
        );
      } else if (evalTime.isBetween(timeStart, timeEnd)) {
        // evaluated time in between
        timeSequence = timeSequence + "0";
        console.log(
          evalTime.format(f) +
            " is between of " +
            timeStart.format(f) +
            " or " +
            timeEnd.format(f) +
            facultyName +
            " schedule"
        );
      }
    });
    console.log(timeSequence);
    return timeSequence;
  };
  useEffect(() => {}, []);
  // component render view
  return (
    <>
      {/**
       * iterate through time ranges for generating row headers
       * iterate through days for generating columns headers
       * filter schedule using current time range and day
       * evaluate time and generate time sequence code for highlighting current cell
       * render view that satisfy required output
       */}

      {timeRanges.map(({ id: trID, timeStart, timeEnd }) => {
        const trTimeStart = moment(timeStart, f);
        const trTimeEnd = moment(timeEnd, f);

        return (
          <tr key={trID}>
            <td className="fit col-header">
              {trTimeStart.format(fA)} - {trTimeEnd.format(fA)}
            </td>

            {/** iterate through days */}
            {daysOfWeek.map(({ id: dowID, name }) => {
              // get schedules
              const scheduleList = schedules.filter(
                ({
                  id,
                  timeStart: _timeStart,
                  timeEnd: _timeEnd,
                  dayOfWeek,
                }) => {
                  const sTimeStart = moment(_timeStart, f);
                  const sTimeEnd = moment(_timeEnd, f);
                  return (
                    trTimeStart.isBefore(sTimeEnd) &&
                    trTimeEnd.isAfter(sTimeStart) &&
                    dayOfWeek === name
                  );
                }
              );

              return (
                <React.Fragment key={dowID}>
                  {/** highlight bottom half of the cell if time sequence is 01,
                   *  top half for 10, 101 for whole
                   */}

                  {/** Faculty Name and Subjects */}
                  <td>
                    {scheduleList.length > 0 ? (
                      scheduleList.map(
                        ({
                          id,
                          facultyName,
                          section,
                          college,
                          subject,
                          timeStart,
                          timeEnd,
                        }) => {
                          // concat code for identifying time structure
                          let timeSequence = "";
                          let found = false;
                          const scheduleCount = scheduleList.length;
                          const scheduleTimeArr = createTimeArr(
                            timeStart,
                            timeEnd
                          );

                          const fidStores = idStores.filter(
                            (_id) => _id === id
                          );
                          //check for stored ids
                          found = fidStores.length > 0 ? true : false;
                          if (!found) {
                            idStores.push(id);
                          }
                          timeSequence = createTimeSequence(
                            scheduleTimeArr,
                            trTimeStart,
                            trTimeEnd,
                            facultyName
                          );
                          return (
                            <React.Fragment key={id}>
                              <div
                                style={mstyle(
                                  college,
                                  timeSequence,
                                  scheduleCount,
                                  false
                                )}
                              >
                                {!found ? (
                                  <>
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        margin: "0px",
                                      }}
                                    >
                                      {facultyName} {subject}
                                    </span>
                                  </>
                                ) : (
                                  <span style={{ fontSize: "12px" }}>-DO-</span>
                                )}
                                <br />
                              </div>
                            </React.Fragment>
                          );
                        }
                      )
                    ) : scheduleList.length === 0 ? (
                      <></>
                    ) : (
                      ""
                    )}
                  </td>

                  {/** Section */}
                  <td>
                    {scheduleList.length > 0 ? (
                      scheduleList.map(
                        ({
                          id,
                          facultyName,
                          section,
                          college,
                          subject,
                          timeStart,
                          timeEnd,
                        }) => {
                          // concat code for identifying time structure
                          let timeSequence = "";
                          let foundSection = false;
                          const scheduleCount = scheduleList.length;
                          const scheduleTimeArr = createTimeArr(
                            timeStart,
                            timeEnd
                          );

                          const fsectionStores = sectionStores.filter(
                            (_section) => _section === id + "" + section
                          );
                          //check for stored ids
                          foundSection =
                            fsectionStores.length > 0 ? true : false;

                          if (!foundSection) {
                            sectionStores.push(id + "" + section);
                          }
                          timeSequence = createTimeSequence(
                            scheduleTimeArr,
                            trTimeStart,
                            trTimeEnd,
                            facultyName
                          );
                          return (
                            <React.Fragment key={id}>
                              <div
                                style={mstyle(
                                  college,
                                  timeSequence,
                                  scheduleCount,
                                  true
                                )}
                              >
                                {!foundSection ? (
                                  <span style={{ fontSize: "12px" }}>
                                    {section}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </div>
                            </React.Fragment>
                          );
                        }
                      )
                    ) : scheduleList.length === 0 ? (
                      <></>
                    ) : (
                      ""
                    )}
                  </td>
                </React.Fragment>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};

export default ClassScheduleItemV3;
