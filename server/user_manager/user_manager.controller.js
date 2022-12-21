const { getUserByUserEmail } = require("./user_manager.service");

const { sign } = require("jsonwebtoken"); 

module.exports = {
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          code:500,
          success: 0,
          data: "user not found"
        });
      }
      const result = results.password == body.password;
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "8237266", {
          expiresIn: "1h"
        });
        return res.json({
          code:200,
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          code:404,
          success: 0,
          data: "Wrong password"
        });
      }
    });
  },
};
