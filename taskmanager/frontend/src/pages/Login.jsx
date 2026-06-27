import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginService } from '../services/authService';

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const res = await loginService(data);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setServerError(
        err.response?.data?.message || 'Wystąpił błąd podczas logowania'
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Zaloguj się</h1>
          <p>Witaj z powrotem! Wpisz swoje dane.</p>
        </div>

        {serverError && (
          <div className="alert alert-error">{serverError}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
              placeholder="Twoje hasło"
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              {...register('password', {
                required: 'Hasło jest wymagane',
              })}
            />
            {errors.password && <p className="error-msg">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logowanie...' : 'Zaloguj się'}
          </button>
        </form>

        <p className="auth-footer">
          Nie masz konta?{' '}
          <Link to="/register" className="auth-link">
            Zarejestruj się
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
