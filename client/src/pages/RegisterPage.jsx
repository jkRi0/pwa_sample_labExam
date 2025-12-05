import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, authError, setAuthError, authStatus } = useAuthContext();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setAuthError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const result = await register(form);
    setSubmitting(false);
    if (result.success) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h1>Create Your Account</h1>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Choose a username"
            autoComplete="username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            autoComplete="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            autoComplete="new-password"
            required
          />
        </div>

        {authError ? <div className="alert">{authError}</div> : null}

        <div className="form-actions form-actions--stacked">
          <button type="submit" className="btn" disabled={submitting || authStatus === 'loading'} style={{ width: '100%' }}>
            {submitting ? 'Creating account...' : 'Create Account'}
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--color-text-light)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Sign in here</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
