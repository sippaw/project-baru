const express = require('express');
const router = express.Router();
const SepatuController = require('../controller/sepatu');
const auth = require('../middleware/logs')

router.get('/', auth, SepatuController.getAllSepatu);
router.get('/:id', auth, SepatuController.getbyidSepatu);
router.post('/', auth, SepatuController.upload.single('url'), SepatuController.createSepatu);

module.exports = router;
