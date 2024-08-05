const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const auth = require('../middleware/logs')

router.get('/', auth, userController.getAllUser);
router.get('/:id', auth, userController.getbyidUser);
//router.post('/', userController.createUser);
router.post('/',userController.register)

module.exports = router;
