// This components for adding New Leave Record
import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import "./leaveform.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import _ from "lodash";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
function AddLeaveRecord() {
  const decoded = jwt_decode(localStorage.getItem("TOKEN"));
  // console.log(decoded);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const [id, setId] = useState(decoded.result.id);
  const [token, setToken] = useState(localStorage.getItem("TOKEN"));
  const [teams, setTeam] = useState([]);
  const [teamid, setTeamId] = useState("");
  // const [getallteams,setAllTeams]=useState([]);
  const [employee, setEmployee] = useState([]);
  const [employee_id, setEmployeeId] = useState();
  const [empid, setEmpId] = useState("");

  let d1 = new Date(startDate);
  let d2 = new Date(endDate);
  var totalDays;
  if (d2 > d1) {
    const mintime = d2.getTime() - d1.getTime();
    totalDays = mintime / (1000 * 3600 * 24);
  }
  const totalDaysInString = String(totalDays);
  //   console.log("Start day",startDate,typeof(startDate));
  //   console.log("end day",endDate,typeof(endDate));
  // console.log("total days",totalDays,typeof(totalDays));

  const axiosJWT = axios.create();
  //  const url_team = "/team/teammanager";   //data response http://localhost:4000/team/teammanager/1

  useEffect(() => {
    if (!localStorage.getItem("login")) {
      navigate("/");
    }
    const getTeam = async () => {
      var idString = _.toString(id);
      // console.log(idString);  S
      // fetch(url+"/"+1,{ //+row.original.id
      const result_team = await axiosJWT.get(
        "http://localhost:4000/team/teammanager/" + idString,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(token);
      // console.log(result_team.data);
      setTeam(result_team.data);

      //   const respTeams= await result_team.json();
      // const respTeams=JSON.parse(result_team);
      // setTeam(await respTeams);

      // .then(resp=>setTeam(resp.data[0].name))
      // .then(resp=>setTeamid(resp.data.team_id))
    };
    getTeam();
  }, []);
  //  console.log("teamid", teamid)   //here we get exact selected team id

  const handleAllTeams = (e) => {
    const getteamid = e.target.value;
    setTeamId(getteamid);
  };

  const handleAllEmployee = (e) => {
    const getempid = e.target.value;
    setEmpId(getempid);
  };
  // const bodyOfLeave={
  //   emp_id:empid,
  //   fromDate: startDate,
  //   toDate: endDate,
  //   noOfDays: totalDaysInString
  // }
  console.log(empid);
  console.log(typeof empid);
  // console.log(bodyOfLeave);
  // http://localhost:4000/leave/addleave
  const handleSubmit = async () => {
    console.log("submit button is clicked");
    await axios
      .post("http://localhost:4000/leave/addleave", {
        //   headers: {
        //   Authorization: `Bearer ${token}`
        // } ,
        emp_id: empid,
        fromDate: startDate,
        toDate: endDate,
        noOfDays: totalDaysInString,
      })
      .then((res) => {
        console.log("resposnse data", res);
        // if (res.data.code === 200) {
        //     // move to home
        //  navigate('/editleave')

        // }
      });
    // navigate('/dashboard');
  };
  //

  useEffect(() => {
    const getemp = async () => {
      const result_emp = await axiosJWT.get(
        `http://localhost:4000/employee/${teamid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //  const respEmp=await result_emp.json();
      //  setEmployee(await respEmp);
      setEmployee(result_emp.data);
      console.log("result_emp", result_emp);
    };
    getemp();
  }, [teamid]);

  // calculate total days
  // var Difference_In_Time = startDate.getTime() - endDate.getTime();
  // var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  //   console.log(Difference_In_Days);

  return (
    // <div style={{
    //   width: "400px",
    //   border: "1px solid #7b7b7b",
    //   margin: "auto",
    //   padding: "20px",

    // }}>

    //     {/* <div> */}

    //     <InputLabel id="demo-simple-select-autowidth-label">Employee</InputLabel>
    //     <select name="employee"
    //       style={{
    //         border: "1px solid #7b7b7b",
    //         marginBottom: "10px",
    //         marginTop: "10px",
    //         width: "200px",
    //         height: "30px",
    //       }}
    //       // onChange={(e) => setEmployeeId(e.target.value)}
    //       onChange={(e)=>handleAllEmployee(e)}
    //       >
    //       <option value="">  Select Employee  </option>
    //       {
    //         employee.map((emp, index) => (
    //           <option key={index} value={emp.id}>{emp.firstName} {emp.lastName}</option>
    //         ))
    //       }
    //     </select>
    //     {/* </div> */}
    //     <br></br>
    //     {/* <form onSubmit={handleSubmit}> */}
    //     <label>Start Date : </label>
    //     <input style={{
    //         border: "1px solid #7b7b7b",
    //         marginBottom: "10px",
    //         marginTop: "10px",
    //         width: "200px",
    //         height: "30px",
    //       }}
    //     type="date" placeholder="yyyy-mm-dd" onChange={e => setStartDate(e.target.value)} />
    //     <br></br>
    //     <label>End Date : </label>
    //     <input style={{
    //         border: "1px solid #7b7b7b",
    //         marginBottom: "10px",
    //         marginTop: "10px",
    //         width: "200px",
    //         height: "30px",
    //       }}
    //     type="date" placeholder="yyyy-mm-dd" onChange={e => setEndDate(e.target.value)} />
    //     <br></br>
    //     <br></br>

    //     <label>Total Days : <h2>{totalDays}</h2>
    //     </label>

    //     {/* <input type="text" placeholder=""></input> */}

    //     <div class="center">
    //       <button style={{ marginRight: "10px" }}
    //         onClick={handleSubmit}
    //         // type="submit"
    //       >Submit</button>
    //     </div>

    //   {/* </form> */}
    // </div>
    <Dialog open={true}>
      <DialogTitle textAlign="center">Create New Leave Record</DialogTitle>
      <DialogContent>
        {/* <AddLeaveRecord/> */}

        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              // maxWidth:'1565px',
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            <InputLabel id="demo-simple-select-autowidth-label">
              Employee
            </InputLabel>
            <select
              name="employee"
              style={{ height: "50px" }}
              // onChange={(e) => setEmployeeId(e.target.value)}
              onChange={(e) => handleAllEmployee(e)}
            >
              <option value=""> Select Employee </option>
              {employee.map((emp, index) => (
                <option key={index} value={emp.id}>
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select>
            <label>Start Date : </label>
            <TextField
              type="date"
              placeholder="yyyy-mm-dd"
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label>End Date : </label>
            <TextField
              type="date"
              // key={column.accessorKey}
              // label={column.header}
              // name={column.accessorKey}
              // onChange={(e) =>
              //   setValues({ ...values, [e.target.name]: e.target.value })
              // }
              onChange={(e) => setEndDate(e.target.value)}
            />
            <label>
              Total Days : <span> {totalDays} </span>
            </label>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        {/* <Button onClick={}>Cancel</Button> */}
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Add Leave Record
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddLeaveRecord;
