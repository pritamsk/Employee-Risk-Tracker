const { checkToken } = require("../auth/token_validation");
const { getEvent, getThreshold, getTeamRiskInfo, getEmployeeLeaveInfo } = require("./event.controller");
const router = require("express").Router();

router.post('/',getThreshold);//fetches the list of teams of the manager
router.post('/getteaminfo',getTeamRiskInfo);//fetches team risk
router.post('/getemployeeleaveinfo',getEmployeeLeaveInfo);//Fetches Employee info from date

module.exports = router;