import React, { useEffect, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import {
  DialogTitle
} from '@mui/material';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';



const ResourceTable = () => {
 
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
      const response = await axiosJWT.get('http://localhost:4000/leave/getnoofleaves/'+idString ,{
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      // console.log(token);
      setTableData(response.data); 
      console.log(response.data)
    //   console.log(response.data[0].name);     
    };



  const columns = useMemo(
    () => [
           {
        accessorKey: 'firstName',
        header: 'First Name',
        enableColumnOrdering: false,
        size: 10,
        enableEditing: false, 
                },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        enableColumnOrdering: false,
        size:10,
        enableEditing: false,
              },
              {
                accessorKey: 'name',
                header: 'Team',
                enableColumnOrdering: false,
                size:100,
                enableEditing: false,
                      },
              {
                accessorKey: 'sum(noOfDays)',
                header: 'Total Leaves (In Days)',
                enableColumnOrdering: false,
                size:160,
                enableEditing: false,
                      },
              
      
    ],
  );
  return (
    <>
    <Navigation name={name}/>
    <div style={{marginLeft:"20%",marginRight:"30%"}}>
    {/* <Card style={{textAlign:"center",padding:"0px 30px 1px 30px"}}> */}
 <DialogTitle textAlign="center">Resource Table</DialogTitle>
      <MaterialReactTable
    
        columns={columns}
        data={tableData}
   
        rowNumberMode="static"
        enableColumnActions={false}
enableColumnFilters={false}
enablePagination={true}
enableSorting={false}
muiTableBodyRowProps={{ hover: false }}
enableTopToolbar={false} //top create new account button available 
// enableBottomToolbar={false}
        // editingMode="modal" //default
        enableColumnOrdering={false}
        // enableEditing
        // onEditingRowSave={handleSaveRowEdits} //if any error got in rendering the action column then uncomment that line    
/>
       
    </div>
    </>
  );
};





export default ResourceTable;