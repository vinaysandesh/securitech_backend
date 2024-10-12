const { addManualAlert } = require("../models/userModel")

const updateManualAlerts = (req,res)=>{
    const logs = addManualAlert(req.body ,(err,row)=>{
        if(err){
            console.log('error',err)
            res.status(400).send("Error occured")
        }
        console.log('row',row)
        res.status(200).send(row)
    })
}
module.exports = {updateManualAlerts}