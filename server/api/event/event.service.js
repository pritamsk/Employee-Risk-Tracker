const pool = require("../../config/database");

module.exports = {
  getEvent: async (req, res, fromDate) => {
    try {
      var results1 = await new Promise((resolve, reject) => {
        pool.query(
          `SELECT count(emp_id) as count_emp ,team_id from team_employee_table 
            where emp_id in 
            ( SELECT emp_id from employee_leave_record where ?>=fromDate   and  ? <=toDate)
             group by team_id`,
          [fromDate, fromDate],
          (error, results) => {
            if (error) reject(error);
            // console.log("Result", results);
            resolve(results);
          }
        );
      });

      return results1;
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        success: 0,
        message: "Error in getting data",
      });
    }
  },
  getThreshold: async (req, res) => {
    try {
      var results = await new Promise((resolve, reject) => {
        pool.query(
          `SELECT count(emp_id) as count_emp,team_id,threshold from team_employee_table tet,team 
            where team.id = tet.team_id group by team_id`,
          [],
          (error, results) => {
            if (error) reject(error);
            resolve(results);
          }
        );
      });

      return results;
    } catch (e) {
      console.log(error);
      return res.status(500).json({
        success: 0,
        message: "Error in getting data",
      });
    }
  },
  getTeamRiskInfo:(data,callback) =>{
    pool.query(
        `select E.id,firstName,lastName,date_format(fromDate,'%Y-%m-%d') as fromDate, date_format(toDate,'%Y-%m-%d') as toDate
        from employee E , employee_leave_record elr , team_employee_table tet
        where E.id=tet.emp_id and elr.emp_id=tet.emp_id and tet.team_id= ? and ? >=fromDate and ? <=toDate;`,
        [
            data.id,
            data.dateStart,
            data.dateStart
        ],
        (error,results,fields) => {
            if (error) {
                callback(error);
            }
            return callback(null,results);
        }
    )
},
getEmployeeLeaveInfo: async (req, res, fromDate) => {
  try {
    var results1 = await new Promise((resolve, reject) => {
      pool.query(
        `select E.id,firstName,lastName,date_format(fromDate,'%Y-%m-%d') as fromDate, date_format(toDate,'%Y-%m-%d') as toDate
        from employee E , employee_leave_record elr , team_employee_table tet
        where E.id=tet.emp_id and elr.emp_id=tet.emp_id and ? >=fromDate and ? <=toDate group by id;`,
        [fromDate, fromDate],
        (error, results) => {
          if (error) reject(error);
          // console.log("Result", results);
          resolve(results);
        }
      );
    });

    return results1;
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: 0,
      message: "Error in getting data",
    });
  }
}
};
