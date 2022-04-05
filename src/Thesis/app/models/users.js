const Sequelize = require('sequelize');
const db = require('../configs/mysql_db');

const Users = db.define('users', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    rfid: { type: Sequelize.STRING(20), allowNull: true },
    firstname: { type: Sequelize.STRING(50), allowNull: false },
    lastname: { type: Sequelize.STRING(50), allowNull: false },
    contactno: { type: Sequelize.STRING(20), allowNull: true },
    address: { type: Sequelize.STRING(50), allowNull: true },
    email: { type: Sequelize.STRING(20), allowNull: true },
    age: { type: Sequelize.INTEGER },
    gender: { type: Sequelize.INTEGER },
    dateregistered: { type: Sequelize.DATE },
    status: { type: Sequelize.STRING(20), allowNull: false },
    occupationid: { type: Sequelize.INTEGER },
}, { timestamps: false }, {
    Sequelize,
    tableName: 'users'
});

module.exports = Users;