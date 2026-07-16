// ============================================
// products.js — Product data and functions
// ============================================

// --- Data ---

let products = [];

// Loads products from the JSON file
// Must be called before any other function
async function loadProducts() {
  const response = await fetch("http://localhost:3000/products");
  products = await response.json();
  return products;
}

// --- Core Functions ---

// Returns the full list of products
function getAllProducts() {
  return products;
}

// Returns a single product by its id
// Returns undefined if not found
function getProductById(id) {
  return products.find(p => p.id === id);
}

// Returns true if product has stock_quantity > 0, false otherwise
function isInStock(productId) {
  const product = getProductById(productId);
  if (!product) return false;
  return product.stock_quantity > 0;
}