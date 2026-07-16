// ============================================
// components/Navbar.tsx
// React + TypeScript port of navbar.js
// ============================================

import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { label: 'Home',    href: '/' },
  { label: 'Shop',    href: '/shop' },
  { label: 'About',   href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="navbar-wrapper">
      <nav className="custom-navbar">
        <div className="nav-grid">

          {/* Brand */}
          <div className="nav-left">
            <Link className="custom-brand" to="/">
              <span style={{ fontSize: '1.6rem' }}>🦖</span>
              <span>RAWW FACTOR</span>
            </Link>
          </div>

          {/* Burger toggle (mobile only) */}
          <button
            className="nav-burger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className={`burger-icon${menuOpen ? ' open' : ''}`} />
          </button>

          {/* Links */}
          <div className={`nav-center${menuOpen ? ' menu-open' : ''}`}>
            <div className="custom-nav-links">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={
                    'custom-nav-link' +
                    (location.pathname === link.href ? ' active' : '')
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Search + icons */}
          <div className="nav-right">
            <div className="search-wrapper">
              <input
                className="custom-search"
                type="search"
                placeholder="Search..."
              />
            </div>
            <div className="nav-icons">
              {/* Cart icon */}
              <Link to="/cart" className="nav-icon" title="Shopping Cart">
                <span style={{ position: 'relative', display: 'inline-flex' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                  {getItemCount() > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-6px',
                        right: '-8px',
                        background: 'var(--accent)',
                        color: 'var(--bg)',
                        borderRadius: '50%',
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        width: '16px',
                        height: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {getItemCount()}
                    </span>
                  )}
                </span>
              </Link>

              {/* Auth area */}
              <div className="auth-area">
                {currentUser ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                    <span>Hi, {currentUser.name.split(' ')[0]}</span>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                      Logout
                    </a>
                  </>
                ) : (
                  <Link to="/login" className="nav-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>

        </div>
      </nav>
    </div>
  );
}
