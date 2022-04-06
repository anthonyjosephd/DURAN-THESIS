const db = require('../configs/mysql_db');
const VaccinatedUsers = require('../models/vaccinatedusers');

module.exports = {
    create,
    update,
    remove,
    findAll,
    getById
};


async function create(requestBody) {
    return await VaccinatedUsers.create({
            "rfid": requestBody.rfid,
            "firstdosevac": requestBody.firstdosevac,
            "seconddosevac": requestBody.seconddosevac,
            "datevaccinated_first": requestBody.datevaccinated_first,
            "datevaccinated_second": requestBody.datevaccinated_second,
            "status": requestBody.status
        })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during inserting new vaccinated user: ", error); throw error; });
}


async function update(requestBody) {
    return await VaccinatedUsers.update({
            "rfid": requestBody.rfid,
            "firstdosevac": requestBody.firstdosevac,
            "seconddosevac": requestBody.seconddosevac,
            "datevaccinated_first": requestBody.datevaccinated_first,
            "datevaccinated_second": requestBody.datevaccinated_second,
            "status": requestBody.status
        }, { where: { "id": requestBody.id } })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during updating vaccinated user: ", error); throw error; });
}

async function remove(id) {
    return await VaccinatedUsers.destroy({ where: { "id": id } })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during deletion vaccinated user: ", error); throw error; });
}

async function getById(id) {
    return await VaccinatedUsers.findOne({ where: { "id": id } })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getbyid: ", error); throw error; });
}


async function findAll() {
    const querytStr = `SELECT vu.id, u.id as user_id, u.rfid, CONCAT(u.firstname, ' ', u.lastname) as user_fullname, 
                        IFNULL(vu.status, 'not yet') as vaccine_status, vu.datevaccinated_first, vu.datevaccinated_second, vu.firstdosevac, vu.seconddosevac 
                        FROM users u 
                        INNER JOIN vaccinated_users vu on vu.rfid = u.rfid`;
    return await db.query(querytStr, {
        model: VaccinatedUsers
        }).then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getting vaccinated user: ", error); throw error; });
}