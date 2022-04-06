const db = require('../configs/mysql_db');
const Users = require('../models/users');

module.exports = {
    create,
    update,
    remove,
    findUser,
    findById,
    findAll
};


async function create(requestBody) {
    return await Users.create({
            "rfid": requestBody.rfid,
            "firstname": requestBody.firstname,
            "lastname": requestBody.lastname,
            "contactno": requestBody.contactno,
            "email": requestBody.email,
            "age": requestBody.age,
            "address": requestBody.address,
            "gender": requestBody.gender,
            "dateregistered": requestBody.dateregistered,
            "status": requestBody.status || 0,
            "occupationid": requestBody.occupationid
        })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during inserting new user: ", error); throw error; });
}


async function update(id, requestBody) {
    return await Users.update({
            "rfid": requestBody.rfid,
            "firstname": requestBody.firstname,
            "lastname": requestBody.lastname,
            "contactno": requestBody.contactno,
            "email": requestBody.email,
            "age": requestBody.age,
            "address": requestBody.address,
            "gender": requestBody.gender,
            "dateregistered": requestBody.dateregistered,
            "status": requestBody.status,
            "occupationid": requestBody.occupationid
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

async function findById(id) {
    return await Users.findOne({ where: { "id": id } })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getting user by rfid: ", error); throw error; });
}

async function findUser(rfid) {
    return await Users.findOne({ where: { "rfid": rfid } })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getting user by rfid: ", error); throw error; });
}

async function findAll() {
    const querytStr = `SELECT u.id, u.rfid, u.dateregistered as userreg_date, CONCAT(u.firstname, ' ', u.lastname) as user_fullname,
                        IF(u.gender = 1, 'Male', 'Female') as gender, o.description , age, address, u.contactno, u.email, IFNULL(vu.status, 'not vaccinated') as vaccine_status, 
                        IF(u.status = 1, 'Registered', 'Pending') as user_status FROM users u
                        LEFT JOIN vaccinated_users vu  ON vu.rfid = u.rfid 
                        LEFT JOIN occupations o  ON o.id = u.occupationid`;
    return await db.query(querytStr, {
        model: Users
        }).then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getting  users: ", error); throw error; });
}