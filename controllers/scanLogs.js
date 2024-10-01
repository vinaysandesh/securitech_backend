const { selectAllLogs, getGroupedLogs } = require("../models/userModel");

const getAllLogs = (req,res)=>{
    const logs = selectAllLogs((err,row)=>{
        if(err){
            console.log('error',err)
            res.status(400).send("Error occured")
        }
        console.log('row',row)
        res.status(200).send(row)
    })
}
const get_grouped_logs = (req,res)=>{
    const logs = getGroupedLogs((err,row)=>{
        if(err){
            console.log('error',err)
            res.status(400).send("Error occured")
        }
        console.log('row',row)
        res.status(200).send(row)
    })
}
module.exports = getAllLogs;