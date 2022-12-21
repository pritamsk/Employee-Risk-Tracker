const {getManegerteam} = require("./team.service");

module.exports = {
    getManegerteam : (req,res) =>{
        const id = req.params.id;
        getManegerteam(id,(err,results) =>{
            if (err) {
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Record not found"
                });
            }
            return res.json(results);

        });
    },
}