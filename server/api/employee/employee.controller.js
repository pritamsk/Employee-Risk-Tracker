const {getEmployee,getTeamEmployee, getManeger} = require("./employee.service");

module.exports = {
    getEmployee:(req,res) =>{
        const body = req.body;
        getEmployee(body,(err,results) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message:"Error in getting User data"
                });
            }
            return res.status(200).json(results)
        });
    },
    getTeamEmployee : (req,res) =>{
        const id = req.params.id;
        getTeamEmployee(id,(err,results) =>{
            if (err) {
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Unable to get team users"
                });
            }
            return res.json(results);

        });
    },

    getManeger : (req,res) =>{
        const id = req.params.id;
        getManeger(id,(err,results) =>{
            if (err) {
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Unable to get manager"
                });
            }
            return res.json(results);

        });
    },

}