const pool = require("../config/database");

module.exports = {
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from employee where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
