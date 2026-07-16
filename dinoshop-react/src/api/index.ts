// ============================================
// api/index.ts — All server API calls
// Mirrors the Express routes in server.js
// ============================================

import type { Product, Basket, BasketItem, Categories } from '../types';

const SERVER_URL = 'http://localhost:3000';

// ── Products ──────────────────────────────────

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${SERVER_URL}/products`);
  if (!res.ok) throw new Error('Could not fetch products');
  return res.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${SERVER_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Could not fetch product ${id}`);
  return res.json();
}

export async function fetchCategories(): Promise<Categories> {
  const res = await fetch(`${SERVER_URL}/categories`);
  if (!res.ok) throw new Error('Could not fetch categories');
  return res.json();
}

// ── Basket ────────────────────────────────────

export async function getBasket(userId: string): Promise<Basket | null> {
  const res = await fetch(`${SERVER_URL}/users/${userId}/basket`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Could not fetch basket');
  return res.json();
}

export async function createBasket(userId: string): Promise<Basket> {
  const res = await fetch(`${SERVER_URL}/users/${userId}/basket`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Could not create basket');
  return res.json();
}

export async function putBasketItem(
  userId: string,
  item: Omit<BasketItem, 'quantity'> & { quantity?: number }
): Promise<Basket> {
  const res = await fetch(`${SERVER_URL}/users/${userId}/basket/items`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Could not add item to basket');
  return res.json();
}

export async function deleteBasketItem(
  userId: string,
  productId: number
): Promise<Basket> {
  const res = await fetch(
    `${SERVER_URL}/users/${userId}/basket/items/${productId}`,
    { method: 'DELETE' }
  );
  if (!res.ok) throw new Error('Could not remove item from basket');
  return res.json();
}

// ── Basket init + guest sync (mirrors cart.js) ──

export async function initBasket(userId: string): Promise<void> {
  try {
    const basket = await getBasket(userId);
    if (!basket) {
      await createBasket(userId);
    }
    await syncLocalCartToServer(userId);
  } catch (err) {
    console.error('Could not init basket:', err);
  }
}

export async function syncLocalCartToServer(userId: string): Promise<void> {
  const saved = localStorage.getItem('cart');
  if (!saved) return;

  const localItems: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }> = JSON.parse(saved);

  if (localItems.length === 0) return;

  for (const item of localItems) {
    try {
      await putBasketItem(userId, {
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      });
    } catch (err) {
      console.error('Could not sync item:', err);
    }
  }

  localStorage.removeItem('cart');
}
