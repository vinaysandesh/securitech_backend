// models/userModel.js

const { db } = require("../db/db");
const { insertUser } = require("../db/InsertQuery");
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
  selectAllLogs: (callback)=>{
    db.all(getLogs,[],callback)
  },
  getGroupedLogs: (callback)=>{
    db.all(get_group_by_tools,[],callback)
  }
};

