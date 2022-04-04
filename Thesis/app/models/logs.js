const Sequelize = require('sequelize');
const db = require('../configs/mysql_db');

const Logs = db.define('logs', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    rfid: { type: Sequelize.STRING(20), allowNull: false },
    locationid: { type: Sequelize.INTEGER, allowNull: false },
    logtype: { type: Sequelize.INTEGER, allowNull: false },
    usertemp: { type: Sequelize.DECIMAL, allowNull: false },
    date: { type: Sequelize.DATE },
}, { timestamps: false }, {
    Sequelize,
    tableName: 'logs'
});

module.exports = Logs;