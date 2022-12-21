const { checkToken } = require("../auth/token_validation");
const {getLeaves,getTeamLeave,deleteLeave, addLeave, editLeave,getNoOfLeaves} = require("./leave.controller");
const router = require("express").Router();

router.post("/addleave",addLeave);//creates a new leave record in the leaveRecord table.
router.get("/leaves/:id",checkToken,getLeaves);//fetches the list of all leave records of all users belonging to all teams of Manager from leaveRecord table.
router.get("/teamleave/:id",checkToken,getTeamLeave);//fetches the list of all leave records of all users belonging to team from leaveRecord table
router.get("/deleteleave/:id",checkToken,deleteLeave);//deletes a leave records from the leaveRecord table
router.patch("/editleave/",editLeave);//edit leave of employee
router.get("/getnoofleaves/:id",getNoOfLeaves);//get employees all leaves
module.exports = router;