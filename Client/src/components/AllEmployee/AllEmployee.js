// import React, { useCallback, useMemo, useState } from 'react';
import React, { useState, useMemo,useEffect } from "react";
import MaterialReactTable from 'material-react-table';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';


const AllEmployee = props => {
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
    const response = await axiosJWT.get('http://localhost:4000/employee/'+teamId ,{ //+teamId
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
  console.log(token);
  setTableData(response.data);
  
  };

  // const [tableData, setTableData] = useState(() => leaveData);


  const columns = useMemo(
    () => [
      {
        // accessorFn: (row) => row.emp_id,
        accessorKey: 'id',
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
        header: 'First Name',
        enableColumnOrdering: false,
        minSize: 140, //min size enforced during resizing
        maxSize: 200, //max size enforced during resizing
        size: 80,
      
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        enableColumnOrdering: false,
        minSize: 140, //min size enforced during resizing
        maxSize: 200, //max size enforced during resizing
        size: 80,
      
      }
      ,
      {
        accessorKey: 'email',
        header: 'Email',
        enableColumnOrdering: false,
        minSize: 140, //min size enforced during resizing
        maxSize: 200, //max size enforced during resizing
        size: 80,
      
      }
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
        // data={data}
      
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


export default AllEmployee;