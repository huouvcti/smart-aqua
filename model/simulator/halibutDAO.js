const {db} = require('../../config/dbconn');


const show = {};
const get = {};
const set = {};

const clear = (user_key) =>{
    return new Promise((resolve, reject) =>{
        db.query(
            `DELETE FROM simulator_halibut WHERE user_key = ?`, [user_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

show.all = (user_key) =>{
    return new Promise((resolve, reject) =>{
        db.query(
            `SELECT month, day,
            ROUND(Temp,2) AS Temp,
            TF,
            ROUND(FV,2) AS FV,
            ROUND(OF,2) AS OF,
            ROUND(Wg,2) AS Wg,
            ROUND(Wig,2) AS Wig,
            ROUND(TWg,2) AS TWg,
            ROUND(TWig,2) AS TWig,
            ROUND(die,2) AS die  
            FROM simulator_halibut
            WHERE user_key=1 ORDER BY day ASC`, [user_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

show.first = (user_key) =>{
    return new Promise((resolve, reject) =>{
        db.query(
            `SELECT
            TF,
            ROUND(FV,2) AS FV,
            ROUND(Wg,2) AS Wg,
            ROUND(TWg,2) AS TWg
            FROM simulator_halibut
            WHERE user_key=? ORDER BY day ASC LIMIT 1`, [user_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

show.nextDay = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(
            `SELECT
            ROUND(FV,2) AS FV,
            ROUND(OF,2) AS OF,
            ROUND(Wg,2) AS Wg,
            ROUND(Wig,2) AS Wig,
            ROUND(TWg,2) AS TWg,
            ROUND(TWig,2) AS TWig
            FROM simulator_halibut
            WHERE user_key=? AND day=?`, [parameters.user_key, parameters.day], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

get.Temp = (user_key) =>{
    return new Promise((resolve, reject) =>{
        db.query(
            `SELECT Temp FROM simulator_halibut WHERE user_key=? ORDER BY day ASC`, [user_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

get.requireI = (user_key, day) =>{
    return new Promise((resolve, reject) =>{
        db.query(
            `SELECT day, Wg, TF, FV, Wig FROM simulator_halibut WHERE user_key=? AND (day=? OR day=?+1) ORDER BY day ASC`, [user_key, day, day], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}


set.Temp = (temper_json, user_key) =>{
    return new Promise((resolve, reject) =>{
        db.query(
            `INSERT INTO simulator_halibut(user_key, month, day, Temp) VALUES(?, ?, ?, ?);`, [user_key, temper_json.month, temper_json.day, temper_json.Temp], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}


set.TF = (TF, user_key) =>{
    return new Promise((resolve, reject) =>{
        db.query(
            `UPDATE simulator_halibut SET TF = ? WHERE user_key=?;`, [TF, user_key], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

set.Wig = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(
            `UPDATE simulator_halibut SET OF=?, Wig = ?, TWig=? WHERE (user_key=? AND day=?);`, [parameters.OF, parameters.Wig, parameters.TWig, parameters.user_key, parameters.day], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

set.FV = (parameters) =>{
    return new Promise((resolve, reject) =>{
        db.query(
            `UPDATE simulator_halibut SET Wg = ?, TWg=?, FV=? WHERE (user_key=? AND day=?);`, [parameters.Wg, parameters.TWg, parameters.FV, parameters.user_key, parameters.day], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}



module.exports = {
    clear,

    show,

    get,

    set
}