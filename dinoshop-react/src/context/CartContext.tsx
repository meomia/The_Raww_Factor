// ============================================
// context/CartContext.tsx
// React + TypeScript port of cart.js
// Handles both guest (localStorage) and
// logged-in (server) cart state.
// ============================================

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { CartItem, Product } from '../types';
import { putBasketItem, deleteBasketItem } from '../api';
import { useAuth } from './AuthContext';

// ── Context shape ─────────────────────────────

interface CartContextValue {
  cart: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  isInStock: (productId: number, products: Product[]) => boolean;
  setCartFromServer: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

// ── Provider ──────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
  const saved = localStorage.getItem('cart');
  if (saved) {
    try { return JSON.parse(saved); } catch { return []; }
  }
  return [];
});
  const { currentUser } = useAuth();

  // Load guest cart from localStorage on mount
  useEffect(() => {
    if (!currentUser) {
      const saved = localStorage.getItem('cart');
      if (saved) {
        try {
          setCart(JSON.parse(saved));
        } catch {
          setCart([]);
        }
      }
    }
  }, [currentUser]);

  // Save to localStorage whenever cart changes (guest only)
  useEffect(() => {
    if (!currentUser) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, currentUser]);

  // Called after login to load server basket items
  const setCartFromServer = useCallback((items: CartItem[]) => {
    setCart(items);
  }, []);

  // ── isInStock ───────────────────────────────
  const isInStock = useCallback(
    (productId: number, products: Product[]): boolean => {
      const product = products.find((p) => p.id === productId);
      return product ? product.stock_quantity > 0 : false;
    },
    []
  );

  // ── addItem ─────────────────────────────────
  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);

        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.productType,
            image: product.mainImage,
            quantity,
          },
        ];
      });

      // Sync to server if logged in
      if (currentUser) {
        putBasketItem(currentUser.id, {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
        }).catch((err) => console.error('Could not sync to server:', err));
      }
    },
    [currentUser]
  );

  // ── removeItem ──────────────────────────────
  const removeItem = useCallback(
    (productId: number) => {
      setCart((prev) => prev.filter((item) => item.id !== productId));

      if (currentUser) {
        deleteBasketItem(currentUser.id, productId).catch((err) =>
          console.error('Could not remove from server:', err)
        );
      }
    },
    [currentUser]
  );

  // ── updateQuantity ──────────────────────────
  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }

      setCart((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );

      if (currentUser) {
        // Delete then re-add with new quantity (mirrors server logic)
        deleteBasketItem(currentUser.id, productId)
          .then(() => {
            const item = cart.find((i) => i.id === productId);
            if (item) {
              putBasketItem(currentUser.id, {
                productId,
                name: item.name,
                price: item.price,
                quantity,
              });
            }
          })
          .catch((err) =>
            console.error('Could not update quantity on server:', err)
          );
      }
    },
    [currentUser, cart, removeItem]
  );

  // ── clearCart ───────────────────────────────
  const clearCart = useCallback(() => {
    if (currentUser) {
      cart.forEach((item) => {
        deleteBasketItem(currentUser.id, item.id).catch((err) =>
          console.error('Could not clear item from server:', err)
        );
      });
    }
    setCart([]);
  }, [currentUser, cart]);

  // ── Read helpers ─────────────────────────────
  const getTotal = useCallback(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const getItemCount = useCallback(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
        isInStock,
        setCartFromServer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
