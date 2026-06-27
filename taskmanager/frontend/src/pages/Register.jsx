import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { register as registerService } from '../services/authService';

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const password = watch('password');

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const res = await registerService({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setServerError(
        err.response?.data?.message || 'Wystąpił błąd podczas rejestracji'
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Utwórz konto</h1>
          <p>Dołącz i zacznij zarządzać zadaniami.</p>
        </div>

        {serverError && (
          <div className="alert alert-error">{serverError}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-group">
            <label className="form-label">Imię</label>
            <input
              type="text"
              placeholder="Twoje imię"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              {...register('name', {
                required: 'Imię jest wymagane',
                minLength: { value: 2, message: 'Imię musi mieć co najmniej 2 znaki' },
              })}
            />
            {errors.name && <p className="error-msg">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              {...register('email', {
                required: 'Email jest wymagany',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Podaj poprawny adres email',
                },
              })}
            />
            {errors.email && <p className="error-msg">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Hasło</label>
            <input
              type="password"
              placeholder="Minimum 6 znaków"
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              {...register('password', {
                required: 'Hasło jest wymagane',
                minLength: { value: 6, message: 'Hasło musi mieć co najmniej 6 znaków' },
              })}
            />
            {errors.password && <p className="error-msg">{errors.password.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Potwierdź hasło</label>
            <input
              type="password"
              placeholder="Powtórz hasło"
              className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
              {...register('confirmPassword', {
                required: 'Potwierdzenie hasła jest wymagane',
                validate: (value) =>
                  value === password || 'Hasła nie są identyczne',
              })}
            />
            {errors.confirmPassword && (
              <p className="error-msg">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Tworzenie konta...' : 'Zarejestruj się'}
          </button>
        </form>

        <p className="auth-footer">
          Masz już konto?{' '}
          <Link to="/login" className="auth-link">
            Zaloguj się
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
