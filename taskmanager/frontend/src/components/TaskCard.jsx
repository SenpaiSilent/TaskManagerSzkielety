const STATUS_LABELS = {
  todo: 'Do zrobienia',
  'in-progress': 'W toku',
  done: 'Zrobione',
};

const PRIORITY_LABELS = {
  low: 'Niski',
  medium: 'Średni',
  high: 'Wysoki',
};

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const isOverdue =
    task.dueDate &&
    task.status !== 'done' &&
    new Date(task.dueDate) < new Date();

  return (
    <div className={`task-card priority-${task.priority} ${task.status === 'done' ? 'task-done' : ''}`}>

      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`badge status-${task.status}`}>
          {STATUS_LABELS[task.status]}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <span className={`priority-badge priority-${task.priority}`}>
          ● {PRIORITY_LABELS[task.priority]}
        </span>
        {task.dueDate && (
          <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
            {isOverdue ? '⚠ ' : '📅 '}
            {new Date(task.dueDate).toLocaleDateString('pl-PL')}
          </span>
        )}
      </div>

      <div className="task-card-footer">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, { status: e.target.value })}
          className="status-select"
        >
          <option value="todo">Do zrobienia</option>
          <option value="in-progress">W toku</option>
          <option value="done">Zrobione</option>
        </select>

        <div className="task-buttons">
          <button onClick={() => onEdit(task)} className="btn btn-sm btn-outline">
            Edytuj
          </button>
          <button onClick={() => onDelete(task._id)} className="btn btn-sm btn-danger">
            Usuń
          </button>
        </div>
      </div>

    </div>
  );
};

export default TaskCard;
