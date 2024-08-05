// controllers/uploadController.js
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 
//untuk berinteraksi dengan sistem file

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Tentukan folder tempat file akan disimpan
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Tentukan nama file
    }
    //file asli yang berhasil diunggah
    //fieldname = nama form tempat diunggah, date now = timestamp waktu saat file diunggah, extname =mengembalikan ekstensi dari nama file asli
});

// Filter untuk menentukan jenis file yang diizinkan
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/; // / adalah batas | adalah op OR
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype); //mengidentifikasi jenis data atau format file yang dikirim melalui internet
    //jenis dan format

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

// Package untuk mengunggah beberapa file
// const uploadMultipleFiles = upload.array('files', 10);

/// Fungsi untuk menangani unggahan file 
    const uploadFile = (req, res) => {
        try {
            const filepath = `/uploads/${req.file.filename}`;
           res.json({
            berhasil : filepath
           })
        } catch (error) {
           console.log(error);
        }
    }


// fungsi untuk hapus
const deleteImage = (req, res) => {
    const filename = req.query.filename;
    const filePath = path.join(__dirname,"..",'uploads', filename);

    //menghapus file dari sistem file (file system)
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.send('File deleted');
        console.log("Berhasil dihapus dari path");
        console.log(filePath);
    });
};

module.exports = {
    uploadFile,
    upload,
    deleteImage,
};
