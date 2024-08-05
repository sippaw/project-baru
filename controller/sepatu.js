const { Op, where } = require('sequelize')
const sepatu = require('../models/sepatu');
const multer = require('multer');
const path = require('path');

const getAllSepatu = async (req, res) => { //untuk mengambil semua baris dari databases
    try {
        const Sepatu = await sepatu.findAll();
        res.json(Sepatu);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getbyidSepatu = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const Sepatu = await sepatu.findByPk(id); // Finding the shoe by primary key
        if (Sepatu) {
            res.json(Sepatu); 
        } else {
            res.status(404).json({        
                message: 'Not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Tentukan folder tempat file akan disimpan
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Tentukan nama file
    }
    //fieldname = nama form tempat diunggah, date now = timestamp waktu saat file diunggah, extname =mengembalikan ekstensi dari nama file asli
});

// Filter untuk menentukan jenis file yang diizinkan
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/; // / adalah batas | adalah op OR
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype); //mengidentifikasi jenis data atau format file yang dikirim melalui internet

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: File type not allowed!');
    }
};


// Inisialisasi multer dengan konfigurasi penyimpanan
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1000000 }, // Batas ukuran file dalam byte (1MB)
    fileFilter: fileFilter });

const createSepatu = async (req, res) => {
    const {merk, jenis, ukuran, harga} = req.body
    const url = req.file ? `/uploads/${req.file.filename}` : "tidak ada file yang di upload"; //operator ternary jika ada diambil nama nya, jika tidak maka bernilai null
    try {
        const Sepatu = await sepatu.create({
            merk: merk,
            jenis: jenis,
            ukuran: ukuran,
            harga: harga,
            url : url
        });
        res.json(Sepatu);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAllSepatu,
    getbyidSepatu,
    createSepatu,
    upload
};
