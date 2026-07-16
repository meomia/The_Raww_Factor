import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/styleForms.css';

export default function RegisterPage() {

  // ── State ─────────────────────────────
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // ── Auth + navigation ─────────────────
  const { register } = useAuth();
  const navigate = useNavigate();

  // ── Register handler ──────────────────
  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setIsSuccess(false);
      setMessage('Passwords do not match.');
      return;
    }

    const result = register({
      name: `${firstName} ${familyName}`,
      email,
      password,
      birthday,
    });

    setIsSuccess(result.success);
    setMessage(result.message);

    // Redirect after success
    if (result.success) {
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  }

  // ── UI ────────────────────────────────
  return (
    <main className="auth-page">
      <div className="auth-card">

        <h1>Create Account</h1>

        <p className="auth-subtitle">
        Join Raww Factor and adopt your perfect dinosaur companion.
        </p>

        <form onSubmit={handleRegister} className="auth-form">

          {/* First name */}
          <div className="auth-field">
            <label>First Name</label>

            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </div>

          {/* Family name */}
          <div className="auth-field">
            <label>Family Name</label>

            <input
              type="text"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              placeholder="Enter your family name"
              required
            />
          </div>

          {/* Email */}
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

          {/* Birthday */}
          <div className="auth-field">
            <label>Birthday</label>

            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </div>

          {/* Password */}
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

          {/* Confirm Password */}
          <div className="auth-field">
            <label>Confirm Password</label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Message */}
          {message && (
            <p
             className={`auth-message ${isSuccess ? 'success' : 'error'}`}
            >
              {message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-raww-primary auth-button"
          >
            Create Account
          </button>

          {/* CTA Login */}
         <p className="auth-switch">
         Already have an account? <Link to="/login">Login here</Link>
         </p>

        </form>
      </div>
    </main>
  );
}