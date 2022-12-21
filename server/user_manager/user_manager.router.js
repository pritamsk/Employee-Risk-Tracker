const router = require("express").Router();
const { checkToken } = require("../api/auth/token_validation");
const {login} = require("./user_manager.controller");

router.post("/", login);

module.exports = router;
