import { Link, NavLink } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';

const navLinks = [
  { to: '/', label: 'Home', private: false },
  { to: '/dashboard', label: 'My Tasks', private: true },
  { to: '/schedule', label: 'Schedule', private: true },
  { to: '/about', label: 'About', private: false },
];

const Layout = ({ children }) => {
  const { user, logout } = useAuthContext();

  return (
    <div className="layout">
      <header className="layout__header">
        <div className="layout__branding">
          <Link to="/" className="layout__logo">
            <span className="layout__logo-mark" aria-hidden="true">
              ⚡
            </span>
            TaskFlow
          </Link>
          <p className="layout__tagline">Streamline your workflow, boost productivity</p>
        </div>
        <nav className="layout__nav">
          {navLinks.map((link) => {
            if (link.private && !user) return null;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `layout__nav-link ${isActive ? 'layout__nav-link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="layout__auth">
          {user ? (
            <>
              <span className="layout__user">{user.username}</span>
              <button type="button" className="btn btn--ghost" onClick={logout}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--ghost">
                Sign In
              </Link>
              <Link to="/register" className="btn">
                Get Started
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="layout__main">{children}</main>
      <footer className="layout__footer">
        <p>&copy; {new Date().getFullYear()} TaskFlow. Built for modern teams.</p>
      </footer>
    </div>
  );
};

export default Layout;
