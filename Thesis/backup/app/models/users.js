const Sequelize = require('sequelize');
const db = require('../configs/mysql_db');

const Users = db.define('users', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    rfid: { type: Sequelize.STRING(20), allowNull: false },
    name: { type: Sequelize.STRING(50), allowNull: false },
    last_login: { type: Sequelize.DATE },
    latest_temp: { type: Sequelize.DECIMAL },
}, { timestamps: false }, {
    Sequelize,
    tableName: 'users'
});

module.exports = Users;