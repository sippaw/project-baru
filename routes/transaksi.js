const express = require('express')
const router = express.Router();
const TransaksiController = require('../controller/transaksi')
const auth = require('../middleware/logs')
 
router.get('/', auth, TransaksiController.getAllTransaksi);
router.post('/', auth, TransaksiController.createTransaksi);
router.get('/:id', auth, TransaksiController.getbyidTransaksi);

module.exports =  router;