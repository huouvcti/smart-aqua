"use strict";

const { env_var } = require("../env_var");

const mysql = require('mysql');


const dbOption = {
    host: env_var.DB_HOST,
    port: env_var.DB_PORT,
    database: env_var.DATABASE,
    user: env_var.DB_USER,
    password: env_var.DB_PW,
    
    multipleStatements: true    // 다중쿼리문 허용
}

const db = mysql.createConnection(dbOption);


db.connect();

module.exports = {
    db,
}