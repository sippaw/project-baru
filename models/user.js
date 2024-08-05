// models/users.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/koneksi');

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type : DataTypes.STRING,
        allowNull : false
    },
}, {
    freezeTableName: true,
    timestamps: false,
}
);

module.exports = Users;
