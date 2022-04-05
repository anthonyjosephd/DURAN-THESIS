const Sequelize = require('sequelize');
const db = require('../configs/mysql_db');

const TrainData = db.define('train_data', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    population: { type: Sequelize.INTEGER},
    novaccinated: { type: Sequelize.INTEGER},
    nohighriskoccupation: { type: Sequelize.INTEGER },
    locationid: { type: Sequelize.INTEGER },
}, { timestamps: false }, {
    Sequelize,
    tableName: 'train_data'
});

module.exports = TrainData;