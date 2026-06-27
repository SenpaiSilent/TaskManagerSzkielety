import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const TaskForm = ({ onSubmit, initialData, onCancel }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Wypełnij formularz danymi gdy edytujemy istniejące zadanie
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'todo',
        priority: initialData.priority || 'medium',
        dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : '',
      });
    } else {
      reset({ title: '', description: '', status: 'todo', priority: 'medium', dueDate: '' });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>

      <div className="form-group">
        <label className="form-label">Tytuł *</label>
        <input
          type="text"
          placeholder="Wpisz tytuł zadania..."
          className={`form-input ${errors.title ? 'input-error' : ''}`}
          {...register('title', {
            required: 'Tytuł jest wymagany',
            maxLength: { value: 100, message: 'Tytuł może mieć maksymalnie 100 znaków' },
          })}
        />
        {errors.title && <p className="error-msg">{errors.title.message}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Opis</label>
        <textarea
          placeholder="Opcjonalny opis zadania..."
          rows={3}
          className={`form-input ${errors.description ? 'input-error' : ''}`}
          {...register('description', {
            maxLength: { value: 500, message: 'Opis może mieć maksymalnie 500 znaków' },
          })}
        />
        {errors.description && <p className="error-msg">{errors.description.message}</p>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Status</label>
          <select className="form-input" {...register('status')}>
            <option value="todo">Do zrobienia</option>
            <option value="in-progress">W toku</option>
            <option value="done">Zrobione</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Priorytet</label>
          <select className="form-input" {...register('priority')}>
            <option value="low">Niski</option>
            <option value="medium">Średni</option>
            <option value="high">Wysoki</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Termin</label>
          <input
            type="date"
            className="form-input"
            {...register('dueDate')}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Zapisywanie...' : initialData ? 'Zapisz zmiany' : 'Dodaj zadanie'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-ghost">
            Anuluj
          </button>
        )}
      </div>

    </form>
  );
};

export default TaskForm;
