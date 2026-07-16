// ============================================
// pages/ShoppingCart.tsx
// React + TypeScript port of shoppingCart.html
// ============================================

import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { fetchProducts, getBasket } from '../api';
import type { Product } from '../types';

const SHIPPING = 500;

export default function ShoppingCart() {
  const { cart, removeItem, updateQuantity, clearCart, getTotal, getItemCount, setCartFromServer } =
    useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // On mount: load server basket (logged in) or use local cart (guest)
  useEffect(() => {
    async function init() {
      setLoading(true);
      try {
        if (currentUser) {
          const [products, basket] = await Promise.all([
            fetchProducts(),
            getBasket(currentUser.id),
          ]);

          if (basket && basket.items.length > 0) {
            const productMap = new Map<number, Product>(
              products.map((p) => [p.id, p])
            );
            const cartItems = basket.items.map((item) => {
              const full = productMap.get(item.productId);
              return {
                id: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: full?.mainImage ?? '',
                category: full?.productType ?? '',
              };
            });
            setCartFromServer(cartItems);
          }
        }
      } catch (err) {
        console.error('Could not load cart:', err);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleCheckout() {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    if (!currentUser) {
      localStorage.setItem('pendingCheckout', 'true');
      alert('Please log in before checkout.');
      navigate('/login');
      return;
    }
    alert(
      `Thank you, ${currentUser.name}! Your new family member is on the way and is now being prepared for shipping.`
    );
    clearCart();
  }

  const subtotal = getTotal();
  const total = subtotal + SHIPPING;

  return (
    <>
      {/* Page Header */}
      <header className="cart-header">
        <div className="container">
          <h1>Your Shopping Cart</h1>
          <p>Review your selected dinos before checkout</p>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '0 0 2rem' }}>
        <div className="container">
          <div className="cart-layout">

            {/* Cart Items */}
            <div className="cart-card">
              <h2>Cart Items</h2>

              {loading ? (
                <p style={{ color: 'var(--muted)' }}>Loading your cart...</p>
              ) : cart.length === 0 ? (
                <div className="cart-empty">
                  <p>Your cart is empty. Use the button below to browse our collection.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img
                      src={item.image.startsWith('/') ? item.image : `/${item.image}`}
                      alt={item.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-category">{item.category}</div>
                      <div className="cart-item-price">{item.price} DKK each</div>
                    </div>

                    {/* Quantity controls */}
                    <div className="qty-controls">
                      <button
                        className="btn-icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="btn-icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal + remove */}
                    <div className="cart-item-actions">
                      <div className="cart-item-subtotal">
                        {item.price * item.quantity} DKK
                      </div>
                      <button
                        className="btn-danger-outline"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}

              <Link
                to="/shop"
                className="btn btn-raww-outline"
                style={{ marginTop: '1rem', display: 'inline-flex' }}
              >
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <aside>
              <div className="order-summary">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Items</span>
                  <span>{getItemCount()} items</span>
                </div>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{subtotal} DKK</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{SHIPPING} DKK</span>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span>{total} DKK</span>
                </div>
                <div className="summary-actions">
                  <button
                    className="btn btn-raww-primary"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    className="btn btn-raww-outline"
                    onClick={() => { clearCart(); }}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>
    </>
  );
}
