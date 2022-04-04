const Sequelize = require('sequelize');
const db = require('../configs/mysql_db');

const VaccinatedUsers = db.define('vaccinated_users', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    rfid: { type: Sequelize.STRING(20), allowNull: true },
    firstdosevac: { type: Sequelize.STRING(20) },
    seconddosevac: { type: Sequelize.STRING(20) },
    datevaccinated_first: { type: Sequelize.DATE },
    datevaccinated_second: { type: Sequelize.DATE },
    status: { type: Sequelize.STRING(20), allowNull: false },
}, { timestamps: false }, {
    Sequelize,
    tableName: 'vaccinated_users'
});

module.exports = VaccinatedUsers;