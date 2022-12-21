require("dotenv").config();
const express = require ('express');
const app = express();
const userRouter = require("./api/employee/employee.router");
const teamRouter = require("./api/team/team.router");
const leaveRouter = require("./api/leave/leave.router");
const loginRouter = require("./user_manager/user_manager.router");
const eventRouter = require("./api/event/event.router");
const cors = require("cors");

app.use(express.json());

app.use(cors({credentials:true,origin:'http://localhost:3000'}))

// app.use((req,res,next) =>{
//     res.header('Access-Control-Allow-Origin','*')
// });

//routers
app.use("/employee", userRouter);

app.use("/team",teamRouter);

app.use("/leave",leaveRouter);

app.use("/login",loginRouter);

app.use("/event",eventRouter);







app.listen(process.env.APP_PORT, ()=>{
    console.log("Server running on port 4000");
})