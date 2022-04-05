const Sequelize = require('sequelize');
const db = require('../configs/mysql_db');

const options = {
    defaultScope: {
        attributes: { exclude: ['hash'] }
    },

    scopes: {
        withHash: { attributes: {}, }
    },

    timestamps: false
};

const attributes = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: { type: Sequelize.STRING, allowNull: false },
    hash: { type: Sequelize.STRING, allowNull: false },

}

const AdminUsers = db.define('admin_users', attributes, options);

module.exports = AdminUsers;