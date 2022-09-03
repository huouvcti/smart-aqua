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
            `SELECT * FROM simulator_halibut WHERE user_key=? ORDER BY day ASC`, [user_key], (err, db_data) => {
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


set.temp


module.exports = {
    clear,

    show,

    get,

    set
}