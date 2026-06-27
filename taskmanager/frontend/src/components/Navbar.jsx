import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-icon">✓</span> TaskManager
      </Link>

      {user && (
        <div className="navbar-actions">
          <span className="navbar-user">Cześć, {user.name}!</span>
          <button onClick={handleLogout} className="btn btn-ghost">
            Wyloguj
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
