const Logs = require('../models/logs');
const db = require('../configs/mysql_db');

module.exports = {
    create,
    findAll,
    findByUser,
    getLogsByDateRange,
    getAllLogs
};

async function create(requestBody) {
    return await Logs.create({
            "id": requestBody.id,
            "rfid": requestBody.rfid,
            "locationid": requestBody.locationid,
            "logtype": requestBody.logtype,
            "usertemp": requestBody.usertemp,
            "date": requestBody.date
        })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during inserting new log: ", error); throw error; });
}

async function findAll() {
    return await Logs.findAll()
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getting user by rfid: ", error); throw error; });
}

async function findByUser(rfid) {
    return await Logs.findAll({
        where: { rfid: rfid }
    })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getting user by rfid: ", error); throw error; });
}

async function getLogsByDateRange(requestBody) {  
    const querytStr = `SELECT l.id, l.date as log_date, CONCAT(u.firstname, ' ', u.lastname) as user_fullname,
    loc.name, l.usertemp  FROM logs l 
    INNER JOIN users u ON u.rfid = l.rfid
    INNER JOIN locations loc ON loc.id = l.locationid
    WHERE l.date BETWEEN :date_from AND :date_to`;
    return await db.query(querytStr, {
        replacements: {
            date_from: requestBody.dateFrom,
            date_to: requestBody.dateTo
        },
        model: Logs
        }).then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getting getLogsByDateRange: ", error); throw error; });
}

async function getAllLogs() {
    const querytStr = `SELECT l.id, l.date as log_date, CONCAT(u.firstname, ' ', u.lastname) as user_fullname,
    loc.name, l.usertemp, IF(l.logtype = 1, 'IN', 'OUT') as logtype FROM logs l
    INNER JOIN users u ON u.rfid = l.rfid
    INNER JOIN locations loc ON loc.id = l.locationid`;
    return await db.query(querytStr, {
        model: Logs
        }).then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getting getLogsByDateRange: ", error); throw error; });
}