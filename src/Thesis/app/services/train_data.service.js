const TrainData = require('../models/train_data');
const db = require('../configs/mysql_db');

module.exports = {
    create,
    findAll,
    getLastTrainData
    /*update,
    remove,
    findUser
    */
};


async function create(requestBody) {
    console.log(requestBody)
    return await TrainData.create({
            "population": requestBody.population,
            "novaccinated": requestBody.novaccinated,
            "nohighriskoccupation": requestBody.nohighriskoccupation,
            "locationid": requestBody.locationid
        })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during inserting new training data: ", error); throw error; });
}

async function findAll() {
    return await TrainData.findAll()
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getting all training data: ", error); throw error; });
}

async function getLastTrainData() {
    return await TrainData.findOne({ order: [['id', 'DESC']] })
        .then(resp => {
            return resp;
        }).catch(error => { console.error("Error occured during getting getLastTrainData: ", error); throw error; });
}