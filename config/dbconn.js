"use strict";


require('dotenv').config({ path: 'a.env'});

const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const dbOption = {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    
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