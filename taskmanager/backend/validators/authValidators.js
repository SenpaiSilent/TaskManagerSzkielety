const { body } = require('express-validator');

const registerValidators = [
  body('name')
    .trim()
    .notEmpty().withMessage('Imię jest wymagane')
    .isLength({ min: 2 }).withMessage('Imię musi mieć co najmniej 2 znaki'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email jest wymagany')
    .isEmail().withMessage('Podaj poprawny adres email')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Hasło jest wymagane')
    .isLength({ min: 6 }).withMessage('Hasło musi mieć co najmniej 6 znaków'),
];

const loginValidators = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email jest wymagany')
    .isEmail().withMessage('Podaj poprawny adres email')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Hasło jest wymagane'),
];

module.exports = { registerValidators, loginValidators };
