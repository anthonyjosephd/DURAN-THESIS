const Logs = require('../models/logs');

module.exports = {
    create
};


async function create(requestBody) {
    return await Logs.create({
            "rfid": requestBody.rfid,
            "location": requestBody.location,
            "last_login": requestBody.last_login,
            "log_type": requestBody.log_type,
            "date_log": requestBody.date_log
        })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during inserting new log: ", error); throw error; });
}