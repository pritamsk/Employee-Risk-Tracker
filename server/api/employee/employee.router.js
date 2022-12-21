const {getEmployee,getTeamEmployee, getManeger} = require("./employee.controller");
const router = require("express").Router();
const {checkToken} = require("../auth/token_validation");

router.get("/manager/:id",checkToken,getManeger);//fetches the list of all users belonging to all the teams of Manager
router.get("/:id",checkToken,getTeamEmployee);//fetches the list of users of the team
router.get('/',checkToken,getEmployee);//fetches the details of a user from user table


module.exports = router;