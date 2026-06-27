import { useState, useEffect, useCallback } from 'react';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '' });

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      const res = await getTasks(params);
      setTasks(res.data);
    } catch {
      setError('Nie udało się pobrać zadań. Spróbuj odświeżyć stronę.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (data) => {
    try {
      await createTask(data);
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Błąd podczas tworzenia zadania');
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateTask(editingTask._id, data);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Błąd podczas aktualizacji zadania');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Czy na pewno chcesz usunąć to zadanie?')) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch {
      setError('Błąd podczas usuwania zadania');
    }
  };

  const handleStatusChange = async (id, data) => {
    try {
      await updateTask(id, data);
      fetchTasks();
    } catch {
      setError('Błąd podczas zmiany statusu');
    }
  };

  const openAddForm = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const openEditForm = (task) => {
    setShowForm(false);
    setEditingTask(task);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  // Statystyki
  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
  };

  return (
    <div className="dashboard">

      {/* Nagłówek */}
      <div className="dashboard-header">
        <h1>Moje zadania</h1>
        <button onClick={openAddForm} className="btn btn-primary">
          + Nowe zadanie
        </button>
      </div>

      {/* Statystyki */}
      <div className="stats-bar">
        <div className="stat"><span className="stat-num">{stats.total}</span><span>Wszystkich</span></div>
        <div className="stat"><span className="stat-num">{stats.todo}</span><span>Do zrobienia</span></div>
        <div className="stat"><span className="stat-num">{stats.inProgress}</span><span>W toku</span></div>
        <div className="stat"><span className="stat-num">{stats.done}</span><span>Zrobionych</span></div>
      </div>

      {/* Błąd */}
      {error && (
        <div className="alert alert-error" onClick={() => setError('')}>
          {error} <span className="alert-close">✕</span>
        </div>
      )}

      {/* Formularz dodawania */}
      {showForm && (
        <div className="form-panel">
          <h2>Nowe zadanie</h2>
          <TaskForm onSubmit={handleCreate} onCancel={closeForm} />
        </div>
      )}

      {/* Formularz edycji */}
      {editingTask && (
        <div className="form-panel">
          <h2>Edytuj zadanie</h2>
          <TaskForm
            onSubmit={handleUpdate}
            initialData={editingTask}
            onCancel={closeForm}
          />
        </div>
      )}

      {/* Filtry */}
      <div className="filters">
        <select
          value={filters.status}
          onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
          className="form-input filter-select"
        >
          <option value="">Wszystkie statusy</option>
          <option value="todo">Do zrobienia</option>
          <option value="in-progress">W toku</option>
          <option value="done">Zrobione</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilters((f) => ({ ...f, priority: e.target.value }))}
          className="form-input filter-select"
        >
          <option value="">Wszystkie priorytety</option>
          <option value="low">Niski</option>
          <option value="medium">Średni</option>
          <option value="high">Wysoki</option>
        </select>

        {(filters.status || filters.priority) && (
          <button
            onClick={() => setFilters({ status: '', priority: '' })}
            className="btn btn-ghost btn-sm"
          >
            Wyczyść filtry
          </button>
        )}
      </div>

      {/* Lista zadań */}
      {loading ? (
        <div className="loading-screen">Ładowanie zadań...</div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📋</p>
          <p>Brak zadań do wyświetlenia.</p>
          <button onClick={openAddForm} className="btn btn-primary">
            Dodaj pierwsze zadanie
          </button>
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={openEditForm}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Dashboard;
