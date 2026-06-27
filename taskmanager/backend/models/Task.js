const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Tytuł jest wymagany'],
      trim: true,
      maxlength: [100, 'Tytuł może mieć maksymalnie 100 znaków'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Opis może mieć maksymalnie 500 znaków'],
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'done'],
      default: 'todo',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Indeks: szybkie wyszukiwanie zadań konkretnego użytkownika
taskSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Task', taskSchema);
