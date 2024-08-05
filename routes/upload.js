// routes/uploadRoutes.js

const express = require('express');
const router = express.Router();
const path = require('path');
const File= require('../controller/upload');

// Rute untuk mengunggah satu file
router.post('/upload', File.upload.single("file"), File.uploadFile);
router.delete('/', File.deleteImage)

// Rute untuk mengunggah beberapa file
// router.post('/upload-multiple', uploadMultipleFiles, handleMultipleFileUpload);

// router.get('/', (req, res) => {
//     const filename = req.query.filename;
//     const filepath = path.join(__dirname, "..", "uploads", filename) //ffile name mengarahkan file yang dituju
//     res.sendFile(filepath);
// })

module.exports = router;

