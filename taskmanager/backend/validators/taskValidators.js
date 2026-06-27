const { body } = require('express-validator');

const taskValidators = [
  body('title')
    .trim()
    .notEmpty().withMessage('Tytuł jest wymagany')
    .isLength({ max: 100 }).withMessage('Tytuł może mieć maksymalnie 100 znaków'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Opis może mieć maksymalnie 500 znaków'),

  body('status')
    .optional()
    .isIn(['todo', 'in-progress', 'done'])
    .withMessage('Status musi być jednym z: todo, in-progress, done'),

  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priorytet musi być jednym z: low, medium, high'),

  body('dueDate')
    .optional({ checkFalsy: true })
    .isISO8601().withMessage('Podaj poprawną datę'),
];

module.exports = taskValidators;
