// Leave Record Page
import React, { useCallback, useMemo, useState ,useEffect} from 'react';
import MaterialReactTable from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import InputLabel from "@mui/material/InputLabel";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';
import "./leaveform.css";

const EditLeaveRecord = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const decoded = jwt_decode(localStorage.getItem('TOKEN'));
  const [name, setName] = useState(decoded.result.firstName);
  const [token, setToken] = useState(localStorage.getItem('TOKEN'));
  const [id, setId] = useState(decoded.result.id);
  const axiosJWT = axios.create();
const [rowId,setRowId]=useState(0);

 useEffect(() => {
    if(!localStorage.getItem('login')){
      navigate("/")
    }
    getTeamLeaveRecord();
}, []);


// Getting all inforamtion of all teams (Manager login)
const getTeamLeaveRecord = async () => {
  var idString = _.toString(id);
  // var date = moment(arg.view.activeStart).format('YYYY-MM-DD'); //test-01
  // console.log(idString);
    const response = await axiosJWT.get('http://localhost:4000/leave/leaves/'+idString ,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    // console.log(token); //test-01
    setTableData(response.data);
    // console.log('data',tableData); //test-01
       
};
// console.log(tableData); //test-01 

// handleDeleteRow delete the Leave Record of Employee on clicking on delete 
  const handleDeleteRow = useCallback(
    (row) => {
      //send api delete request here, then refetch or update local table data for re-render
      const response =  axiosJWT.get('http://localhost:4000/leave/deleteleave/'+row.original.emp_id ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
      alert("Record Edited Successfully");
    },
    [tableData],
    );
    
    // const getCommonEditTextFieldProps = useCallback(
  //   (cell) => {
  //   }
  // );


  const columns = useMemo(
    () => [
      {
        accessorKey: 'emp_id',
        header: 'Employee Id',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        enableColumnOrdering: false,
        size: 140,
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          // ...getCommonEditTextFieldProps(cell),
        }),
      },    {
        accessorKey: 'lastName',
        header: 'Last Name',
        enableColumnOrdering: false,
        size: 140,
        enableEditing: false,
        // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        //   // ...getCommonEditTextFieldProps(cell),
        // }),
      },
      {
        accessorKey: 'fromDate',
        header: 'Start Date',
        enableColumnOrdering: false,
        size: 140,
        enableEditing: false,
        // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        //   ...getCommonEditTextFieldProps(cell),
        // }),
      },
      {
        accessorKey: 'toDate',
        header: 'End Date',
        size:140,
        enableColumnOrdering: false,
        enableEditing: false,
        // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        //   ...getCommonEditTextFieldProps(cell),

        // }),
      },
      {
        accessorKey: 'noOfDays',
        header: 'Total Days',
        
        enableColumnOrdering: false,
        size: 80,
            enableEditing: false,
        // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        //   ...getCommonEditTextFieldProps(cell),
        // }),
      },
      {
        accessorKey: 'name',
        header: 'Team',
        
        enableColumnOrdering: false,
        size: 100,
        enableEditing: false,
        // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        //   // ...getCommonEditTextFieldProps(cell),
        // }),
      },
      
    ],
    // [getCommonEditTextFieldProps],
  );

  const [createModalOpen2, setCreateModalOpen2] = useState(false);
  const [updateTableData,setUpdateTableData]=useState([]);
  return (
    <>
    <Navigation name={name}/>    
    <div style={{marginLeft:"50px",marginRight:"50px"}}>
    <DialogTitle textAlign="center">Leave Record</DialogTitle>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
          // 'mrt-row-actions': { size: 10 }
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        // enableTopToolbar={false}
        enableColumnOrdering
        enableEditing
        enableColumnActions={false}
        enableColumnFilters={false}
        // onEditingRowSave={handleSaveRowEdits}
        enableSorting={false}
        enableGlobalFilter= {false}//search on side
        // enablePinning={false}
        // enableResizing= {false}
        positionActionsColumn={'last'}
        // muiTableBodyRowProps={{ hover: false }}

        // onEditingRowSave={handleSaveRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => {
                // table.setEditingRow(row)
                setCreateModalOpen2(true);
                setUpdateTableData(tableData[row.id]);
                setRowId(row.original.id);
                
              // console.log(row.original.id);
                }}>
                <Edit /><h6>Edit</h6>
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete /> <h6>Delete</h6>
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="primary"
            onClick={() => setCreateModalOpen(true)} // change required
            variant="contained"
          >
            Add Leave
          </Button>
        )}
      />
      {/* modal for creating add leave record */}
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        // onSubmit={handleCreateNewRow}
      />
      {/* modal for editing leave record */}
      <CreateNewAccountModal2
      columns={columns}
      open={createModalOpen2}
      rowId={rowId}
      SaveDetails={updateTableData}
      onClose={() => setCreateModalOpen2(false)}
      // onSubmit={handleCreateNewRow}
    />
      </div>
    </>
  );
};



//creating a mui dialog modal for creating new rows  (Add leave record)
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [token, setToken] = useState(localStorage.getItem('TOKEN'));
  const axiosJWT = axios.create();
  const navigate = useNavigate();
  // Calculating total days 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
let d1 = new Date(startDate);
  let d2 = new Date(endDate);
  var totalDays;
  if (d2>d1){
    const mintime = d2.getTime() - d1.getTime();
    totalDays = mintime / (1000 * 3600 * 24);
  }
  const totalDaysInString=String(totalDays);
//   
  const [teamid, setTeamId] = useState('');
  const [employee, setEmployee] = useState([]);
  const [empid,setEmpId]=useState('');

  const [employee_id,setEmployeeId]=useState();
  
  
// submit the form of leave record post method
const handleAllEmployee = (e) => {
  const getempid = e.target.value;
  setEmpId(getempid);
}
const handleSubmitLeave = async() => {
  // console.log("submit button is clicked");
  await axios.post('http://localhost:4000/leave/addleave',
  {       
    //   headers: {
      //   Authorization: `Bearer ${token}`
      // } ,
      emp_id:empid,
      fromDate: startDate,
      toDate: endDate,
      noOfDays: totalDaysInString
    } )
    .then(res => {
      //  console.log("resposnse data",res)
    })
    // navigate('/dashboard');
    onClose();
    window.location.reload(false) //working
    // alert("Record Added Successfully");
  
}
// getting teams in drop down menu
const decoded = jwt_decode(localStorage.getItem('TOKEN'));
const [id, setId] = useState(decoded.result.id);
// console.log(id)
const [teamsEmp, setTeamEmp] = useState([]);
useEffect(() => {
  const getTeamEmp = async () => {
    var idString = _.toString(id);
    const result_team = await axiosJWT.get('http://localhost:4000/team/teammanager/'+ idString , { //
         headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setTeamEmp(result_team.data);
    
  }
  getTeamEmp()
}, []);

const handleAllTeams = (e) => {
  const getteamid = e.target.value;
  setTeamId(getteamid);
}




// getting employee in drop down menu
useEffect(() => {
  const getemp = async () => {
    const result_emp = await axiosJWT.get(`http://localhost:4000/employee/${teamid}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    //  const respEmp=await result_emp.json();
    //  setEmployee(await respEmp);
    setEmployee(result_emp.data);
    console.log("result_emp", result_emp);
  }
  getemp()
}, [teamid]);

 return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Leave Record</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              // maxWidth:'1565px',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {/* drop down for team */}
            <InputLabel id="demo-simple-select-autowidth-label">Team</InputLabel>
        <select name="Team"
        style={{height:"50px"}}
          
          // onChange={(e) => setEmployeeId(e.target.value)}
          onChange={(e)=>handleAllTeams(e)
          }
          >
          <option value="">  Select Team  </option>
          {
           teamsEmp.map( (getteam, index)=>(
            <option key={index} value={getteam.team_id}>{getteam.name } </option>
            ))
          }
        </select>
            {/* drop down for Employees */}
            <InputLabel id="demo-simple-select-autowidth-label">Employee</InputLabel>
        <select name="employee"
        style={{height:"50px"}}
          
          // onChange={(e) => setEmployeeId(e.target.value)}
          onChange={(e)=>handleAllEmployee(e)}
          >
          <option value="">  Select Employee  </option>
          {
            employee.map((emp, index) => (
              <option key={index} value={emp.id}>{emp.firstName} {emp.lastName}</option>
            ))
          }
        </select>
                 <label>Start Date : </label>
        <TextField 
        type="date" placeholder="yyyy-mm-dd"
         onChange={e => setStartDate(e.target.value)} 
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
                onChange={e => setEndDate(e.target.value)}
              />
            <label>Total Days : <span>  {totalDays} </span>
        </label>
     
          </Stack>
        </form>
            </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary"
         onClick={handleSubmitLeave}
       
         variant="contained">
          Add Leave Record
        </Button>
      </DialogActions>
    </Dialog>
  );
};
// **********************End of EditLeaveRecord Return**************************** //
// creating a mui dialog modal for editing row
export const CreateNewAccountModal2 = ({ open, onClose,SaveDetails,rowId }) => {
  const [token, setToken] = useState(localStorage.getItem('TOKEN'));
  const axiosJWT = axios.create();
  const navigate = useNavigate();
  // Calculating total days 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  let d1 = new Date(startDate);
  let d2 = new Date(endDate);
  var totalDays;
  if (d2>d1){
    const mintime = d2.getTime() - d1.getTime();
    totalDays = mintime / (1000 * 3600 * 24);
  }
  const totalDaysInString=String(totalDays);
  //  End of Calculating total days 
  
  // console.log(SaveDetails.name);
  
const firstName=SaveDetails.firstName;
const lastName=SaveDetails.lastName;
const teamName=SaveDetails.name;
const empid=SaveDetails.emp_id;
const row_Id=SaveDetails.id;
// const row_Id=rowId;

const handleSubmitSaveLeave = async() => {
  // console.log("Save button is clicked");
  
  alert("Record Edited Successfully");
  await axios.patch('http://localhost:4000/leave/editleave',
  {       
  //   headers: {
  //   Authorization: `Bearer ${token}`
  // } ,
  emp_id:empid,
  id:row_Id,
  fromDate: startDate,
  toDate: endDate,
  noOfDays: totalDaysInString
 } )
  .then(res => {
    //  console.log("resposnse data",res)
    })
    onClose();
    window.location.reload(false) //working
}


 return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Edit Leave Record</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              // maxWidth:'1565px',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {/* <InputLabel id="demo-simple-select-autowidth-label">Employee</InputLabel> */}
            <label>Employee Name : <h3>{firstName} {lastName}</h3></label>
        {/* <TextField> Name</TextField> */}
        <label>Team Name : 
        <h3>{teamName}</h3></label> 

                 <label>Start Date : </label>
        <TextField 
        type="date" placeholder="yyyy-mm-dd"
         onChange={e => setStartDate(e.target.value)} 
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
                onChange={e => setEndDate(e.target.value)}
              />
            <label>Total Days : <span>  {totalDays} </span>
        </label>
     
          </Stack>
        </form>
            </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary"
         onClick={handleSubmitSaveLeave}
         variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditLeaveRecord;
