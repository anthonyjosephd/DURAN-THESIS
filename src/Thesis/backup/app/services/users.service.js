const Users = require('../models/users');

module.exports = {
    create,
    update,
    remove,
    findUser,
    findAll
};


async function create(requestBody) {
    return await Users.create({
            "rfid": requestBody.rfid,
            "name": requestBody.name,
            "last_login": requestBody.last_login,
            "latest_temp": requestBody.latest_temp
        })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during inserting new user: ", error); throw error; });
}


async function update(id, requestBody) {
    return await Users.update({
            "rfid": requestBody.rfid,
            "name": requestBody.name,
            "last_login": requestBody.last_login,
            "latest_temp": requestBody.latest_temp
        }, { where: { "id": id } })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during updating user: ", error); throw error; });
}

async function remove(id) {
    return await Users.destroy({ where: { "id": id } })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during deletion user: ", error); throw error; });
}

async function findUser(rfid) {
    return await Users.findOne({ where: { "rfid": rfid } })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getting user by rfid: ", error); throw error; });
}

async function findAll() {
    return await Users.findAll()
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getting user by rfid: ", error); throw error; });
}