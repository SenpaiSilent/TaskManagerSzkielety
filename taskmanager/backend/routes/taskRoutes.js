const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const taskValidators = require('../validators/taskValidators');

// Wszystkie endpointy zadań wymagają zalogowania
router.use(auth);

// GET    /api/tasks          - lista zadań (z opcjonalnym filtrowaniem)
// POST   /api/tasks          - utwórz zadanie
// PUT    /api/tasks/:id      - edytuj zadanie
// DELETE /api/tasks/:id      - usuń zadanie

router.get('/', getTasks);
router.post('/', taskValidators, createTask);
router.put('/:id', taskValidators, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
