const pool = require("../../config/database");

module.exports = {
    addLeave: (data,callback) =>{
        pool.query(
            `insert into employee_leave_record (emp_id, fromDate, toDate, noOfDays) values (?,?,?,?)`,
            [
                data.emp_id,
                data.fromDate,
                data.toDate,
                data.noOfDays
            ],
            (error,results,fields) =>{
                if(error){
                    return callback(error);

                }
                return callback(null, results);
            }
        );
    },
    getLeaves:(id,callback) =>{
        pool.query(
            `select team.name, elr.id, elr.emp_id, firstName,lastName, date_format(fromDate,'%Y-%m-%d') as fromDate, date_format(toDate,'%Y-%m-%d') as toDate , noOfDays 
            from employee_leave_record elr,employee,team , team_employee_table tet, team_manager_table tmt
            where  team.id=tet.team_id and tet.emp_id=employee.id and elr.emp_id = employee.id  
            and team.id = tmt.team_id and tmt.manager_id= ?;`,
            [id],
            (error,results,fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null,results);
            }
        )
    },
    getTeamLeave:  (id,callback) =>{
        pool.query(
            `SELECT elr.emp_id,E.firstName,E.lastName , date_format(fromDate,'%Y-%m-%d') as fromDate , date_format(toDate,'%Y-%m-%d') as toDate,noOfDays 
            from employee_leave_record elr , team_employee_table tet ,employee E
                        where E.id =elr.emp_id and elr.emp_id = tet.emp_id and tet.team_id = ?`,
            [id],
            (error,results,fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null,results);
            }
        )
    },
    deleteLeave: (id,callback) =>{
        pool.query(
            `DELETE FROM employee_leave_record WHERE emp_id= ?`,
            [id],
            (error,results,fields) =>{
                if(error){
                    return callback(error);

                }
                return callback(null, results);
            }
        );
    },

    editLeave: (data,callback) =>{
        pool.query(
            `UPDATE employee_leave_record
            SET fromDate = ?, toDate = ?, noOfDays = ?
            WHERE id = ?;`,
            [
                data.fromDate,
                data.toDate,
                data.noOfDays,
                data.id,
            ],
            (error,results,fields) =>{
                if(error){
                    return callback(error);

                }
                return callback(null, results);
            }
        );
    },
    getNoOfLeaves:(id,callback) =>{
        pool.query(
            `select e.id, firstName, lastName ,sum(noOfDays) ,team.name
            from employee e,employee_leave_record elr,team_employee_table tet,team ,team_manager_table tmt
            where e.id = elr.emp_id and e.id=tet.emp_id and tet.team_id=team.id and team.id=tmt.team_id and manager_id= ?
            group by e.id;`,
            [id],
            (error,results,fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null,results);
            }
        )
    },
    
};