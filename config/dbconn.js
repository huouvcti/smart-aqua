"use strict";

const { env_var } = require("../env_var");

const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// const dbOption = {
//     host: process.env.HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DATABASE,
//     user: process.env.DB_USER,
//     password: process.env.DB_PW,
    
//     multipleStatements: true    // 다중쿼리문 허용
// }

const dbOption = {
    host: env_var.HOST,
    port: env_var.DB_PORT,
    database: env_var.DATABASE,
    user: env_var.DB_USER,
    password: env_var.DB_PW,
    
    multipleStatements: true    // 다중쿼리문 허용
}

const db = mysql.createConnection(dbOption);

const sessionStore = new MySQLStore(dbOption);

console.log(sessionStore)

db.connect();

module.exports = {
    db,
    sessionStore
}