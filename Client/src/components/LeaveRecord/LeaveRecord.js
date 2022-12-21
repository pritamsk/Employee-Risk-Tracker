import React, { useState, useMemo,useEffect } from "react";
import MaterialReactTable from 'material-react-table';
import { Card, CardContent } from "@material-ui/core";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

const LeaveRecord = props => {
  // const [tableData, setTableData] = useState(() => leaveData);
  const teamId = props.teamId;
  const decoded = jwt_decode(localStorage.getItem('TOKEN'));
  const [id, setId] = useState(decoded.result.id);
  const [token, setToken] = useState(localStorage.getItem('TOKEN'));
  const [expire, setExpire] = useState(decoded.exp);
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const axiosJWT = axios.create();
  // const url = "http://localhost:4000/employee/";  //set here {id} from table click coloumn

  useEffect(() => {
    if(!localStorage.getItem('login')){
      navigate("/")
    }
  getEmployee()
  }, []);

  const getEmployee=async ()=>{
    const response = await axiosJWT.get('http://localhost:4000/leave/teamleave/'+teamId ,{ //+teamId
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
  console.log(token);
  setTableData(response.data);
  };
console.log(tableData);
 
  

  const columns = useMemo(
    () => [
      {
        accessorKey: 'emp_id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        minSize: 10, //min size enforced during resizing
        maxSize: 10, //max size enforced during resizing
        size: 10,
      },
      {
        accessorKey: 'firstName',
        header: 'Name',
        enableColumnOrdering: false,
        minSize: 140, //min size enforced during resizing
        maxSize: 200, //max size enforced during resizing
        size: 80,
      
      },
      {
        accessorKey: 'fromDate',
        header: 'Start Date',
        enableColumnOrdering: false,
        minSize: 130, //min size enforced during resizing
        maxSize: 150, //max size enforced during resizing
        size: 80,
      
      },
      {
        accessorKey: 'toDate',
        header: 'End Date',
        enableColumnOrdering: false,
        minSize: 130, //min size enforced during resizing
        maxSize: 150, //max size enforced during resizing
        size: 80,
      
      },
      {
        accessorKey: 'noOfDays',
        header: 'Total Days',
        enableColumnOrdering: false,
        minSize: 40, //min size enforced during resizing
        maxSize: 40, //max size enforced during resizing
        size: 80,
   
      },
      
    ],

  );

  return (
    <>
    
    {/* <Card style={{textAlign:"center",padding:"10px 60px 10px 60px"}}> */}
 {/* <DialogTitle textAlign="center">Leave Records</DialogTitle> */}
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            Header:'Action',
            // size: 100,
            muiTableHeadCellProps: {
              align: 'center'
            },
            size:80,
            
          },
          
        }}
        columns={columns}
        data={tableData}
        enableColumnActions={false}
        // positionActionsColumn={'last'}

enableColumnFilters={false}
enablePagination={false}
enableSorting={false}
muiTableBodyRowProps={{ hover: false }}
enableTopToolbar={false} //top create new account button available 
// enableBottomToolbar={false}
        editingMode="modal" //default
        enableColumnOrdering={false}
       
      />
     

    {/* </Card> */}
    </>
  );
};


export default LeaveRecord;