const pool = require("../../config/database");

module.exports = {
    getEmployee: (data,callback) =>{
        pool.query(
            `select id, firstName, lastName ,email from employee where designation  = 'employee'`,
            [],
            (error,results,fields) =>{
                if(error){
                    return callback(error);

                }
                return callback(null, results);
            }
        );
    },
    getTeamEmployee:(id,callback) =>{
        pool.query(
            `SELECT E.id, firstName, lastName, email from employee E, team_employee_table T 
            where E.id = T.emp_id and E.designation = 'employee' and T.team_id = ?
            `,
            [id],
            (error,results,fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null,results);
            }
        )
    },
    getManeger:(id,callback) =>{
        pool.query(
            `SELECT distinct employee.id, employee.firstName,employee.lastName from employee ,team_manager_table
            where employee.id = team_manager_table.manager_id  and employee.designation='manager' 
            and team_manager_table.manager_id = ?`,
            [id],
            (error,results,fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null,results);
            }
        )
    }
};