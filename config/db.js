const mysql = require("mysql2")
/*
module.exports = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "blogging",
    insecureAuth : true
})
*/
require("dotenv").config()

module.exports = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  insecureAuth : true
})