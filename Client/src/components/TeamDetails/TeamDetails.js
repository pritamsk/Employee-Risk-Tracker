import React, { useEffect, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
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
} from '@mui/material';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';
import LeaveRecord from '../LeaveRecord/LeaveRecord';
import AllEmployee from '../AllEmployee/AllEmployee';

const TeamDetails = () => {
  const decoded = jwt_decode(localStorage.getItem('TOKEN'));
  const [name, setName] = useState(decoded.result.firstName);
  const [id, setId] = useState(decoded.result.id);
  const [token, setToken] = useState(localStorage.getItem('TOKEN'));
  const [expire, setExpire] = useState(decoded.exp);
  const [users, setUsers] = useState([]);
  const [tableData, setTableData] = useState([]);
  // const [eventsData, setEventsData] = useState(events);

  const navigate = useNavigate();
  const axiosJWT = axios.create();

  useEffect(() => {
    if(!localStorage.getItem('login')){
      navigate("/")
    }
      getManagerTeam();
  }, []);

const getManagerTeam = async () => {
    var idString = _.toString(id);
      const response = await axiosJWT.get('http://localhost:4000/team/teammanager/'+idString ,{
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      console.log(token);
      setTableData(response.data); 
      // console.log(response.data[0].name);     
    };
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createModalOpen2, setCreateModalOpen2] = useState(false);
  // const setteamid =(rowteamid)=>{
  //   // console.log(rowteamid);
  // }
  const [set_team_id,setTeamId]=useState(0);
  console.log(set_team_id);
  const [set_team_name,setTeamName]=useState('');

  const columns = useMemo(
    () => [
      {
        // accessorFn: (row) => row.team_id,
        accessorKey: 'team_id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 60,
     
        // Cell:({cell,row})=>(
        //   <Box
        //   sx={{
        //     alignItems:'left'
        //   }}/>
        // )

      },
      {
        accessorKey: 'name',
        header: 'Team Name',
        enableColumnOrdering: false,
        size: 160,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          // ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'threshold',
        header: 'Threshold',
        enableColumnOrdering: false,
        size:160,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          // ...getCommonEditTextFieldProps(cell),
        }),
      },
      
    ],
    // [getCommonEditTextFieldProps],
  );
  return (
    <>
    <Navigation name={name}/>
    <div style={{marginLeft:"50px",marginRight:"50px"}}>
    {/* <Card style={{textAlign:"center",padding:"0px 30px 1px 30px"}}> */}
 <DialogTitle textAlign="center">Team Details</DialogTitle>
      <MaterialReactTable
         displayColumnDefOptions={{
          'mrt-row-actions': {
            Header:'Action',
            // size: 100,
            muiTableHeadCellProps: {
              align: 'center'
            },
          
            size: 100,
           },
          // 'mrt-row-actions': {
          //   muiTableHeadCellProps: {
          //     align: 'center',
          //   },
          //   size: 120,
          // },
        }}
        columns={columns}
        data={tableData}
   
        rowNumberMode="static"
        enableColumnActions={false}
        positionActionsColumn={'last'}

enableColumnFilters={false}
enablePagination={true}
enableSorting={false}
muiTableBodyRowProps={{ hover: false }}
enableTopToolbar={false} //top create new account button available 
// enableBottomToolbar={false}
        editingMode="modal" //default
        enableColumnOrdering={false}
        enableEditing
        // onEditingRowSave={handleSaveRowEdits} //if any error got in rendering the action column then uncomment that line 
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem',p: "0.5rem",width:'80%' }}>
            <div style={{paddingLeft:"120px"}}>
                <Tooltip arrow placement="left" title="All Employees">
            <Button
            // color="secondary"
            // row.original.team_id
            onClick={() => {setCreateModalOpen(true); setTeamId(row.original.team_id)
            // console.log(tableData[row.id].name)
            setTeamName(tableData[row.id].name)
            // console.log(row.id);
          }}
            // variant="contained"
            style={{backgroundColor: "#66a3ff",
            color:"white",
            fontSize: "9px",
            padding:"4px 7px",
            borderRadius:"5px",
            margin:"2px",
            cursor:"pointer"}}
              // {row.original.team_id}  
            >
            All Employees  
          </Button>
          
            </Tooltip>
{/*following button for add new leave */}
            <Tooltip arrow placement="right" title="LEAVE RECORD">
                          <Button
                      // color="secondary"
            // onClick={() => setCreateModalOpen2(true)}
            onClick={() => {setCreateModalOpen2(true); setTeamId(row.original.team_id)
              setTeamName(tableData[row.id].name)}}
            // variant="contained"
            style={{backgroundColor: "red",
            color:"white",
            fontSize: "9px",
            padding:"4px 7px",
            borderRadius:"5px",
            margin:"2px",
            cursor:"pointer"}}
            >
            Leave Record
          </Button>
            </Tooltip>
                </div>
          </Box>
      
        )}
    
/>
        <CreateNewAccountModal
          //columns={columns}
          //render_team_id={row.original.team_id}
          open={createModalOpen}
          teamId={set_team_id}
          teamName={set_team_name}
           onClose={() => setCreateModalOpen(false)}
         //onSubmit={handleCreateNewRow}
       />

       <CreateNewAccountModal2
        // columns={columns}
        open={createModalOpen2}
        teamId={set_team_id}
        teamName={set_team_name}
        onClose={() => setCreateModalOpen2(false)}
        //onSubmit={handleCreateNewRow2}
      />
    {/*</Card>*/}
    </div>
    </>
  );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, onClose,teamId,teamName }) => {

   return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">All Employees of {teamName}</DialogTitle>
      <DialogContent>
      <AllEmployee teamId={teamId}/>
      {/*<h2>all employee list</h2>*/}
      </DialogContent>
      <DialogActions sx={{ p: '0.5rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        {/*<Button color="secondary" onClick={handleSubmit} variant="contained">
          All Employees
        </Button>*/}
      </DialogActions>
    </Dialog>
    
  );
};

// another new pop up box 
export const CreateNewAccountModal2 = ({ open,onClose,teamId,teamName}) => {
  return (
    <Dialog open={open} >
      <DialogTitle textAlign="center">Leave Record of {teamName}</DialogTitle>
      <DialogContent sx={{ p: '0.5rem' }}>
      <LeaveRecord teamId={teamId}/>  
      {/*<h2>hello from Leave Record</h2> */}
      </DialogContent>
      <DialogActions sx={{ p: '0.5rem' }}>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};



export default TeamDetails;