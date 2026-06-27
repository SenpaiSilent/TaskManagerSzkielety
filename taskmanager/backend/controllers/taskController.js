const { validationResult } = require('express-validator');
const Task = require('../models/Task');

/**
 * GET /api/tasks
 * Pobiera wszystkie zadania zalogowanego użytkownika.
 * Opcjonalne query params: ?status=todo&priority=high
 */
const getTasks = async (req, res) => {
  try {
    const filter = { user: req.user.id };

    if (req.query.status) filter.status = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error('Błąd pobierania zadań:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

/**
 * POST /api/tasks
 * Tworzy nowe zadanie dla zalogowanego użytkownika
 */
const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, status, priority, dueDate } = req.body;

  try {
    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      status,
      priority,
      dueDate: dueDate || undefined,
    });
    res.status(201).json(task);
  } catch (err) {
    console.error('Błąd tworzenia zadania:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

/**
 * PUT /api/tasks/:id
 * Aktualizuje zadanie — tylko właściciel może edytować
 */
const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Zadanie nie zostało znalezione' });
    }

    const allowedFields = ['title', 'description', 'status', 'priority', 'dueDate'];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        task[field] = req.body[field];
      }
    });

    await task.save();
    res.json(task);
  } catch (err) {
    console.error('Błąd aktualizacji zadania:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

/**
 * DELETE /api/tasks/:id
 * Usuwa zadanie — tylko właściciel może usunąć
 */
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Zadanie nie zostało znalezione' });
    }
    res.json({ message: 'Zadanie zostało usunięte' });
  } catch (err) {
    console.error('Błąd usuwania zadania:', err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
