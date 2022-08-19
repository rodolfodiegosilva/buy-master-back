const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController').default;

router.post('/', authController.handleLogin);

module.exports = router;