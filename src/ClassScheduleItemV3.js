import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
import { findByLabelText } from "@testing-library/react";
const ClassScheduleItemV3 = () => {
  //format of time use
  const f = "HH:mm";
  const fA = "HH:mm A";
  const idStores = [];
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
      timeStart: "07:00",
      timeEnd: "08:30",
      facultyName: "Juan Tamad",
      room: "NB101",
      section: "CIT",
      subject: "Law",
      dayOfWeek: "Monday",
    },
    {
      id: 2,
      timeStart: "08:30",
      timeEnd: "12:00",
      facultyName: "Juan Tamad2",
      room: "NB101",
      section: "BSBA",
      subject: "Law",
      dayOfWeek: "Monday",
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
            <td className="fit">
              {trTimeStart.format(fA)} - {trTimeEnd.format(fA)}
            </td>

            {/** iterate through days */}
            {daysOfWeek.map(({ id: dowID, name }) => {
              // concat code for identifying time structure
              let timeSequence = "";
              let found = false;
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
                  <td style={{ padding: 0, textAlign: "center" }}>
                    {scheduleList.length > 0 ? (
                      scheduleList.map(
                        ({
                          id,
                          facultyName,
                          section,
                          subject,
                          timeStart,
                          timeEnd,
                        }) => {
                          const scheduleTimeArr = createTimeArr(
                            timeStart,
                            timeEnd
                          );

                          const fidStores = idStores.filter(
                            (_id) => _id === id
                          );
                          //console.log(fidStores);
                          found = fidStores.length > 0 ? true : false;
                          if (!found) {
                            idStores.push(id);
                          }
                          scheduleTimeArr.forEach((time) => {
                            // time to evaluate
                            const evalTime = moment(time, f);

                            if (
                              evalTime.isSame(trTimeStart) ||
                              evalTime.isSame(trTimeEnd)
                            ) {
                              // evaluated time if the same
                              timeSequence = timeSequence + "1";
                              console.log(
                                evalTime.format(f) +
                                  " is same of " +
                                  trTimeStart.format(f) +
                                  " or " +
                                  trTimeEnd.format(f) +
                                  " of " +
                                  facultyName +
                                  " schedule"
                              );
                            } else if (
                              evalTime.isBetween(trTimeStart, trTimeEnd)
                            ) {
                              // evaluated time in between
                              timeSequence = timeSequence + "0";
                              console.log(
                                evalTime.format(f) +
                                  " is between of " +
                                  trTimeStart.format(f) +
                                  " or " +
                                  trTimeEnd.format(f) +
                                  facultyName +
                                  " schedule"
                              );
                            }
                          });

                          return (
                            <React.Fragment key={id}>
                              {section.includes("CIT") ? (
                                <div
                                  style={{
                                    backgroundColor: "orange",
                                    padding: "5px",
                                  }}
                                >
                                  {!found ? facultyName : "-DO-"}
                                  <br />
                                  {!found ? subject : ""}
                                </div>
                              ) : (
                                <>
                                  <div
                                    style={{
                                      backgroundColor: "red",
                                      display: "inline-block",
                                    }}
                                  >
                                    {!found ? facultyName : "-DO-"}
                                    <br />
                                    {!found ? subject : ""}
                                  </div>
                                </>
                              )}
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
                  <td style={{ padding: 0, textAlign: "center" }}>
                    {scheduleList.length > 1 ? (
                      scheduleList.map(({ id, section }) => {
                        return (
                          <React.Fragment key={id}>
                            {section.includes("CIT") ? (
                              <div style={{ backgroundColor: "orange" }}>
                                {section}
                              </div>
                            ) : (
                              <div style={{ backgroundColor: "red" }}>
                                {section}
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })
                    ) : scheduleList.length === 1 ? (
                      <>
                        {scheduleList[0].section.includes("CIT") ? (
                          <div style={{ backgroundColor: "orange" }}>
                            {scheduleList[0].section}
                          </div>
                        ) : (
                          <div style={{ backgroundColor: "red" }}>
                            {scheduleList[0].section}
                          </div>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </td>

                  {/** {schedule === undefined ? (
                    <td></td>
                  ) : (
                    <>
                      <td
                        style={{
                          padding: "0",
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <div>
                          {!found ? schedule.facultyName : "-DO-"}
                          <br />
                          {!found ? schedule.subject : ""}
                        </div>
                      </td>
                    </>
                  )}
                  <td className="fit">
                    {schedule !== undefined && !found ? schedule.section : ""}
                      </td> */}
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
