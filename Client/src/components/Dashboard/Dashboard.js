/* eslint-disable react-hooks/exhaustive-deps */
// Dashboard
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import "./dashboard.css";
moment.locale("en-GB");
// style for open modal

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const [id, setId] = useState(0);
  const [events, setEvents] = useState([]);
  const [leaveevents, setLeaveEvents] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState([]);
  const [leaveInfo, setLeaveInfo] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("login")) {
      navigate("/");
    }
    tokenDecode();
  }, []);

  useEffect(() => {
    if (employeeInfo !== []) {
      console.log("Employee Info", employeeInfo);
    }
  }, [employeeInfo]);
  //Token decode to set Username and manager id
  const tokenDecode = async () => {
    try {
      setToken(localStorage.getItem("TOKEN"));
      const decoded = jwt_decode(localStorage.getItem("TOKEN"));
      setName(decoded.result.firstName);
      setId(decoded.result.id);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const axiosJWT = axios.create();
//Convert getevent response data into required event format
  const transformInEvents = (resData) => {
    var evs = [];
    for (let i = 0; i < resData.length; i++) {
      var teamRiskList = resData[i].teamRiskList;
      for (let j = 0; j < teamRiskList.length; j++) {
        var title = "Team " + teamRiskList[j] + " is at risk.";

        evs.push({
          id: "a",
          title: title,
          start: resData[i].date,
        });
      }
    }
    return evs;
  };
//To convert EmployeeleaveInfo response data into required event format
  const leaveEvents = (responseData) => {
    let leaveEvt = [];
    for (let i = 0; i < responseData.length; i++) {
      let leaveList = responseData[i].employeeInfoResult;
      for (let j = 0; j < leaveList.length; j++) {
        let title =
          leaveList[j].firstName +" " +leaveList[j].lastName +" is on leave.";
        leaveEvt.push({
          id: "b",
          title: title,
          start: responseData[i].date,
          color: "purple",
        });
      }
    }
    return leaveEvt;
  };

  const getEvent = async (date) => {
    var fromDate = _.toString(date);
    const response = await axiosJWT.post("http://localhost:4000/event/", {
      fromDate: fromDate,
    });
    var responseEvents = transformInEvents(response.data);
    setTimeout(() => {
      setEvents(responseEvents);
    });
  };
//fetches Risked team info
  const getTeamRiskInfo = async (teamId, startDate) => {
    let empl = [];
    let obj = {};
    var startDate1 = startDate;
    String(startDate1, teamId);
    const response = await axios.post(
      "http://localhost:4000/event/getteaminfo",
      {
        id: teamId,
        dateStart: startDate,
      }
    );
    console.log("response data", response.data);
    for (var i = 0; i < response.data.length; i++) {
      obj = {
        id: response.data[i].id,
        firstName: response.data[i].firstName,
        lastName: response.data[i].lastName,
        toDate: response.data[i].toDate,
        fromDate: response.data[i].fromDate,
      };
      empl.push(obj);
    }
    setEmployeeInfo(empl);
  };
//Fetches employee leave data
  const getEmployeeLeaveInfo = async (date) => {
    var fromDate = _.toString(date);
    const response = await axiosJWT.post(
      "http://localhost:4000/event/getemployeeleaveinfo",
      {
        fromDate: fromDate,
      }
    );
    console.log("response data", response.data);
    let responseLeaveEvents = leaveEvents(response.data);
    console.log(responseLeaveEvents);
    setTimeout(() => {
      setLeaveEvents(responseLeaveEvents);
    });
  };

  // event handler

  const [open, setOpen] = useState(false);
  const [openLeave, setOpenLeave] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenLeave = () => setOpenLeave(true);
  const handleClose = () => setOpen(false);
  const handleCloseLeave = () => setOpenLeave(false);

  return (
    <>
      <Navigation name={name} />
      <div id="calender" className="container">
        <FullCalendar
          editable
          selectable
          eventBackgroundColor="red"
          eventColor="red"
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5, 6],
            startTime: "10:00",
            endTime: "18:00",
          }}
          headerToolbar={{
            start: "today prev next",
            center: "title",
            end: "dayGridMonth dayGridDay timeGridWeek",
          }}
          initialView={["dayGridMonth"]}
          views={["dayGridMonth", "dayGridDay", "timeGridWeek"]}
          fixedWeekCount={false}
          showNonCurrentDates={false}
          datesSet={(arg) => {
            // console.log(arg); //starting visible date
            var date = moment(arg.view.activeStart).format("YYYY-MM-DD");
            getEvent(date)
              .then()
              .catch((e) => console.log(e));

            getEmployeeLeaveInfo(date)
              .then()
              .catch((e) => console.log(e));
          }}
          eventClick={function (arg) {
            if (arg.event.id === "a") {
              const str = arg.event.title;
              let matches = str.match(/(\d+)/);
              if (matches) {
                var teamId = matches[0];
              }
              let startDate = moment(arg.event.start).format("YYYY-MM-DD");
              getTeamRiskInfo(teamId, startDate);
              handleOpen();
            } else {
              const str = arg.event.title;
              setLeaveInfo(str);
              handleOpenLeave();
            }
          }}
          events={events.concat(leaveevents)}
          plugins={[daygridPlugin, interactionPlugin, timeGridPlugin]}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Tooltip arrow placement="right" title="Delete"> </Tooltip> */}
          {employeeInfo.map((item) => {
            return (
              <div key={item.id}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  ID : {item.id}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Employee Name : {item.firstName} {item.lastName}
                </Typography>
              </div>
            );
          })}
        </Box>
      </Modal>
      <Modal
        open={openLeave}
        onClose={handleCloseLeave}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {leaveInfo}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Dashboard;
