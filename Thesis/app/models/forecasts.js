const Sequelize = require('sequelize');
const db = require('../configs/mysql_db');

const Forecasts = db.define('forecasts', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    predict_noinfec: { type: Sequelize.DECIMAL},
    percentage: { type: Sequelize.DECIMAL},
    dateforecasts: { type: Sequelize.DATE },
}, { timestamps: false }, {
    Sequelize,
    tableName: 'forecasts'
});

module.exports = Forecasts;