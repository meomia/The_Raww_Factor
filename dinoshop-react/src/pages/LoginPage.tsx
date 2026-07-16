import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/styleForms.css';

export default function LoginPage() {

  // ── State ─────────────────────────────
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // ── Auth + navigation ─────────────────
  const { login } = useAuth();
  const navigate = useNavigate();

  // ── Login handler ─────────────────────
  // try: attempt login
  //catch    → show error if something breaks
  // finally  → always stop loading
  async function handleLogin(e: React.FormEvent) {
  e.preventDefault();
  setMessage('');

  try {
    const result = await login(email, password);

    setMessage(result.message);

    if (result.success) {
      const pendingCheckout = localStorage.getItem('pendingCheckout');

      if (pendingCheckout) {
        localStorage.removeItem('pendingCheckout');
        navigate('/cart');
      } else {
        navigate('/');
      }
    }
  } catch (error) {
    console.error('Login failed:', error);
    setMessage('Something went wrong. Please try again.');
  }
}

  // ── UI ────────────────────────────────
  return (
  <main className="auth-page">
    <div className="auth-card">
      <h1>Welcome back</h1>
      <p className="auth-subtitle">
        Log in to continue your Raww Factor shopping adventure.
      </p>

      <form onSubmit={handleLogin} className="auth-form">
        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="auth-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {message && (
          <p
            className={`auth-message ${
              message.toLowerCase().includes('account created')
                ? 'success'
                : 'error'
            }`}
          >
            {message}
          </p>
        )}

        <button type="submit" 
            className="btn btn-raww-primary auth-button"
          >
            Login
          </button>
      </form>

      <p className="auth-switch">
        Don&apos;t have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  </main>
);
}