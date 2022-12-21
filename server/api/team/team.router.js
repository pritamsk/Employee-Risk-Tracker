const { checkToken } = require("../auth/token_validation");
const {getManegerteam} = require("./team.controller");
const router = require("express").Router();

router.get('/teammanager/:id',checkToken,getManegerteam);//fetches the list of teams of the manager
module.exports = router;