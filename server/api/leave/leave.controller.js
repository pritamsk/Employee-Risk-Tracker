const {getLeaves,getTeamLeave,deleteLeave,addLeave,editLeave,getNoOfLeaves} = require("./leave.service");

module.exports = {
    addLeave:(req,res) =>{
        const body = req.body;
        addLeave(body,(err,results) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message:"Error in adding leave"
                });
            }
            return res.status(200).json(results)
        });
    },
    getLeaves:(req,res) =>{
        const id = req.params.id;
        getLeaves(id,(err,results) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message:"Error in getting leave records"
                });
            }
            return res.status(200).json(results
            )
        });
    },
    getTeamLeave:(req,res) =>{
        const id = req.params.id;
        getTeamLeave(id,(err,results) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message:"Error in getting team leave records"
                });
            }
            return res.status(200).json(results)
        });
    },
    deleteLeave:(req,res) =>{
        const id = req.params.id;
        deleteLeave(id,(err,results) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message:"Error in deleteing leave"
                });
            }
            return res.status(200).json(results)
        });
    },
    editLeave:(req,res) =>{
        const body = req.body;
        editLeave(body,(err,results) =>{
            if(err){
                console.log(err);
                return false;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Failed to update leave"
                });
            }
            return res.status(200).json(results)
        });
    },
    getNoOfLeaves:(req,res) =>{
        const id = req.params.id;
        getNoOfLeaves(id,(err,results) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message:"Error in getting User Leave data"
                });
            }
            return res.status(200).json(results)
        });
    },

}