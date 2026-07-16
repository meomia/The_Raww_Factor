// ============================================
// pages/stubs.tsx
// Placeholder pages for teammates to fill in.
// Each page follows the same pattern:
//   - Import useCart / useAuth as needed
//   - Fetch data from ../api
//   - Build your UI
// ============================================

// ── HomePage ──────────────────────────────────
export function HomePage() {
  // TODO: Build the home/landing page (index.html)
  return (
    <main style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <h1>Welcome to Raww Factor 🦖</h1>
      <p style={{ color: 'var(--muted)' }}>Home page — coming soon!</p>
    </main>
  );
}

// ── ShopPage ──────────────────────────────────
export function ShopPage() {
  // TODO: Build the product listing page (dinoShop.html)
  // Hints:
  //   import { fetchProducts, fetchCategories } from '../api'
  //   import { useCart } from '../context/CartContext'
  //   Use Product type from '../types'
  return (
    <main style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <h1>Dino Shop 🦕</h1>
      <p style={{ color: 'var(--muted)' }}>Product listing — coming soon!</p>
    </main>
  );
}

// ── LoginPage ─────────────────────────────────
export function LoginPage() {
  // TODO: Build the login page (login.html)
  // Hints:
  //   import { useAuth } from '../context/AuthContext'
  //   const { login } = useAuth()
  //   import { useNavigate } from 'react-router-dom'
  //   After login: navigate('/') or navigate('/cart') if pendingCheckout
  return (
    <main style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <h1>Login</h1>
      <p style={{ color: 'var(--muted)' }}>Login form — coming soon!</p>
    </main>
  );
}

// ── RegisterPage ──────────────────────────────
export function RegisterPage() {
  // TODO: Build the registration page (register.html)
  // Hints:
  //   import { useAuth } from '../context/AuthContext'
  //   const { register } = useAuth()
  return (
    <main style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <h1>Create Account</h1>
      <p style={{ color: 'var(--muted)' }}>Registration form — coming soon!</p>
    </main>
  );
}

// ── AboutPage ─────────────────────────────────
export {AboutPage} from './About';

// ── ContactPage ───────────────────────────────
export function ContactPage() {
  // TODO: Build the contact page (contactUs.html)
  // Hint: autofill email using useAuth → currentUser.email
  return (
    <main style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <h1>Contact Us</h1>
      <p style={{ color: 'var(--muted)' }}>Contact form — coming soon!</p>
    </main>
  );
}
