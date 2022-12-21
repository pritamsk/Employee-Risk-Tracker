const pool = require("../../config/database");

module.exports = {
    getManegerteam:(id,callback) =>{
        pool.query(
            `SELECT team.id as team_id,team.name,threshold, manager_id as manager_id from team, team_manager_table
            where team.id=team_id and manager_id = ?`,
            [id],
            (error,results,fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null,results);
            }
        )
    }
}