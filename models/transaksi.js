const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/koneksi'); // Pastikan ini benar
const Sepatu = require('./sepatu');
const Users = require('./user');

const Transaksi = sequelize.define('transaksi', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tanggalTransaksi: {
        type: DataTypes.DATE,
        allowNull : false,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    id_sepatu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Sepatu,
            key: 'id'
        }
    },
    jumlahProduk: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    diskon: {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    totalSetelahdiskon : {
        type : DataTypes.INTEGER,
        allowNull : false,
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Users.hasMany(Transaksi, { foreignKey: 'id_user' });
Transaksi.belongsTo(Users, { foreignKey: 'id_user' });

Sepatu.hasMany(Transaksi, { foreignKey: 'id_sepatu' });
Transaksi.belongsTo(Sepatu, { foreignKey: 'id_sepatu' });

module.exports = Transaksi;
