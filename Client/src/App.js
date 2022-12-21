import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard"; //working
import Login from "./components/Login/Login.jsx";
import TeamDetails from "./components/TeamDetails/TeamDetails";  //Team Details page 
import EditLeaveRecord from "./components/LeaveRecord/EditLeaveRecord";   // Leave Info page
import ResourceTable from "./components/ResourceTable/ResourceTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/teamdetails" element={<TeamDetails />}/>
        <Route path="/leaverecord" element={<EditLeaveRecord/>}/>
        <Route path="/resourcetable" element={<ResourceTable/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;