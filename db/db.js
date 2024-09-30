// app.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { CREATE_TABLE_USERS } = require('./CreateQueries');

// Path to the SQLite3 database file
const dbPath = path.join(__dirname, 'data.db');

// Create a new database or open an existing one
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.run(CREATE_TABLE_USERS,(err)=>{
  if(err){
    console.log(err)
  }else{
    console.log("created")
  }
})

module.exports ={db}