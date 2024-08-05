const { Op } = require('sequelize');
const transaksi = require('../models/transaksi');
const Sepatu = require('../models/sepatu');
const User = require('../models/user'); 

const createTransaksi = async (req, res) => {
    const { details } = req.body;
    const today = new Date();
    const {id, email} = req.user;
    try {

        const detailTransaksi = []; //array untuk menampung data yang telah di create
        let TotalSeluruhSetelah = 0; // untuk menampung nilai keseluruhan
        let totalSebelum = 0;
        let totalDiskon = 0;

        for (const detail of details) { //details adalah sebuah array yang memiliki beberapa objek
            //for of berguna untuk memproses data dalam array satu per satu
            const {id_sepatu, jumlahProduk, diskon} = detail; //detail adalah objek untuk menampung properti yang ada di dalam array
            
            const dataSepatu = await Sepatu.findByPk(id_sepatu)
            const totalValue = jumlahProduk * dataSepatu.harga;

            const pdiskon = totalValue * (diskon / 100);
            const hargasetelah = totalValue - pdiskon;

            const Transaksi = await transaksi.create({
                tanggalTransaksi: today,
                id_user: id,
                id_sepatu: id_sepatu,
                jumlahProduk: jumlahProduk,
                total: totalValue,
                diskon: diskon,
                totalSetelahdiskon: hargasetelah,
            });

            detailTransaksi.push(Transaksi); // setiap Transaksi yang dijalankan akan disimpan dalam array detailTransaksi
            TotalSeluruhSetelah += hargasetelah; // grand total akan menyimpan harga setelah/ keseluruhan
            totalSebelum += totalValue;
            totalDiskon += pdiskon;
        }
        res.json({
        id_user : id,
        email : email,
        tanggalTransaksi : today,
        detailTransaksi: detailTransaksi,
        totalSebelum : totalSebelum,
        totalDiskon : totalDiskon,
        TotalSeluruhSetelah : TotalSeluruhSetelah
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getbyidTransaksi = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const Transaksi = await transaksi.findByPk(id, {
            include: [
                {
                    model: User,
                },
                {
                    model: Sepatu,
                }
            ]
        });
        if (Transaksi) {
            res.json(Transaksi);
        } else {
            res.status(404).json({
                message: 'Transaksi not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAllTransaksi = async (req, res) => { //untuk mengambil semua baris dari databases
    try {
        const Transaksi = await transaksi.findAll({
        });
        res.json(Transaksi);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createTransaksi,
    getAllTransaksi,
    getbyidTransaksi
};
