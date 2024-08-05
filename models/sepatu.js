const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/koneksi');

//antribut yang ada di tabel users
const Sepatu = db.define('sepatu', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    merk: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jenis: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ukuran: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    harga: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    url: {
        type: DataTypes.STRING,
        allowNull : true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Sepatu;
