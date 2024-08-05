const express = require('express');
const router = express.Router();
const loginController = require('../controller/login');

router.post('/login', loginController.login)
router.delete('/logout',loginController.logout)

module.exports = router;
