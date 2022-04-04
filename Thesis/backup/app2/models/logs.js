const Sequelize = require('sequelize');
const db = require('../configs/mysql_db');

const Logs = db.define('logs', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    rfid: { type: Sequelize.STRING(20), allowNull: false },
    location: { type: Sequelize.STRING(20), allowNull: false },
    log_type: { type: Sequelize.STRING(3), allowNull: false },
    date_log: { type: Sequelize.DATE },
}, { timestamps: false }, {
    Sequelize,
    tableName: 'logs'
});

module.exports = Logs;