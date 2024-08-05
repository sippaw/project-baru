const express = require('express');
const router = express.Router();
const loginController = require('../controller/login');

router.post('/login', loginController.login)
router.delete('/log',loginController.logout)

module.exports = router;
