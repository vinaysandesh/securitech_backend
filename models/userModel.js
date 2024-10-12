// models/userModel.js

const { db } = require("../db/db");
const { insertUser, addManualAlerts } = require("../db/InsertQuery");
const { getUserDetails, getLogs, get_group_by_tools } = require("../db/SelectQueries");

const users = [];

module.exports = {
  findUserByEmail: (email,username, callback) => { 
    db.all(`SELECT * FROM users WHERE email = ? OR username=?`, [email,username], callback);
  },

  // Close the database connection when done
  close: () => {
    db.close();
  },
  createUser: (user, callback) => {
    console.log(user)
    db.run(insertUser, [user.name, user.email, user.password], callback );
  },
  findUserById: (id, callback)=>{
    db.all(getUserDetails,[id], callback)

  },
  selectAllLogs: (data,callback)=>{
    db.all(getLogs,[data.assigned_to,data.assigned_to, data.offset],callback)
  },
  getGroupedLogs: (callback)=>{
    db.all(get_group_by_tools,[],callback)
  },
  addManualAlert: (data,callback)=>{
    console.log(data)
    db.all(addManualAlerts,[data.id_type,data.issue_name, data.issue_type, data.issue_priority, data.issue_description, data.issue_brief_description,data.issue_resolution, data.issue_url, data.assigned_to, data.status, data.host, data.ip,data.scan_date,data.tool],callback)
    
  },
  fetchAllUsers:(data,callback)=>{
     db.all("SELECT id, username, email FROM users",callback)
  }
};

