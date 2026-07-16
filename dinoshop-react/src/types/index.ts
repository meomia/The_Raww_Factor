// ============================================
// types/index.ts — Shared TypeScript types
// ============================================

export interface Product {
  id: number;
  name: string;
  productType: 'Dinosaur' | 'Accessory';
  diet?: 'Carnivore' | 'Herbivore' | 'Omnivore';
  environment?: 'Terrestrial' | 'Aerial' | 'Aquatic';
  size?: 'Small' | 'Medium' | 'Large' | 'XL';
  era?: 'Jurassic' | 'Cretaceous' | 'Triassic';
  price: number;
  stock_quantity: number;
  requires_license?: boolean;
  mainImage: string;
  extraImages?: string[];
  traits?: string;
  description?: string;
  ownership_requirement?: string;
  category?: string; // for accessories
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Basket {
  id: number;
  userId: string;
  items: BasketItem[];
}

export interface BasketItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Categories {
  diet: string[];
  size: string[];
  environment: string[];
  era: string[];
  license: string[];
}
