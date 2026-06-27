const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { registerValidators, loginValidators } = require('../validators/authValidators');

// POST /api/auth/register
router.post('/register', registerValidators, register);

// POST /api/auth/login
router.post('/login', loginValidators, login);

module.exports = router;
