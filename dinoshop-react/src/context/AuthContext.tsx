// ============================================
// context/AuthContext.tsx
// React + TypeScript port of auth.js
// Handles login, register, logout via
// localStorage (same as original auth.js)
// ============================================

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { User } from '../types';
import { initBasket } from '../api';

const USERS_KEY = 'dinoUsers';
const CURRENT_USER_KEY = 'dinoCurrentUser';

// ── Stored user shape (includes password) ─────

interface StoredUser {
  id: number;
  name: string;
  email: string;
  password: string;
  birthday: string;
}

// ── Context shape ─────────────────────────────

interface AuthContextValue {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  register: (data: RegisterData) => { success: boolean; message: string };
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  birthday: string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Helpers ───────────────────────────────────

function getStoredUsers(): StoredUser[] {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readCurrentUser(): User | null {
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

function isValidEmail(email: string): boolean {
  return email.includes('@') && email.includes('.');
}

// ── Provider ──────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(readCurrentUser);

  // ── register ────────────────────────────────
  const register = useCallback(
    ({ name, email, password, birthday }: RegisterData) => {
      if (!name || !email || !password || !birthday) {
        return { success: false, message: 'Please fill in all fields.' };
      }
      const selectedBirthday = new Date(birthday);
      const today = new Date();
      
      if (selectedBirthday > today) {
        return { success: false, message: 'Birthday cannot be in the future.' };
      }
      
      const minimumAgeDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
      );

      if (selectedBirthday > minimumAgeDate) {
        return {
          success: false,
          message: 'You must be at least 18 years old to register.',
        };
      }
      
      if (!isValidEmail(email)) {
        return { success: false, message: 'Please enter a valid email.' };
      }
      
      if (password.length < 6) {
        return {
          success: false,
          message: 'Password must be at least 6 characters.',
        };
      }

      const hasUppercase = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);

      if (!hasUppercase) {
        return {
          success: false,
          message: 'Password must contain at least one uppercase letter.',
        };
      }

      if (!hasNumber) {
        return {
          success: false,
          message: 'Password must contain at least one number.',
        };
      }

      const users = getStoredUsers();
      if (users.find((u) => u.email === email.toLowerCase())) {
        return { success: false, message: 'An account with this email already exists.' };
      }

      const newUser: StoredUser = {
        id: Date.now(),
        name,
        email: email.toLowerCase(),
        password,
        birthday,
      };

      saveStoredUsers([...users, newUser]);
      return { success: true, message: 'Account created! Redirecting to login...' };
    },
    []
  );

  // ── login ────────────────────────────────────
  const login = useCallback(async (email: string, password: string) => {
    if (!email || !password) {
      return { success: false, message: 'Please enter both email and password.' };
    }

    const users = getStoredUsers();
    const matched = users.find(
      (u) => u.email === email.toLowerCase() && u.password === password
    );

    if (!matched) {
      return { success: false, message: 'Wrong email or password.' };
    }

    const user: User = {
      id: String(matched.id),
      name: matched.name,
      email: matched.email,
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    setCurrentUser(user);

    initBasket(user.id); // the basket validation will happen in the backgroud, overwise the login process feels delayed

    return { success: true, message: 'Login successful!' };
  }, []);

  // ── logout ───────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setCurrentUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
