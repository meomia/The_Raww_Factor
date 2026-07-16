// ============================================
// cart.js — Cart data and functions
// ============================================

// --- Data ---

let cart = [];
// --- Server URL ---
const SERVER_URL = 'http://localhost:3000';


// --- Core Functions ---

// Adds a product to the cart with a given quantity
// Increases quantity if product already exists
// Blocks if product is out of stock
async function addItem(product, quantity = 1) {

  // Step 1 — check stock
  if (!isInStock(product.id)) {
    console.log("Product is out of stock");
    return;
  }

  const currentUser = getCurrentUser();

  // Logged-in user -> use server basket
  if (currentUser) {
    try {
      await initBasket(String(currentUser.id));

      const response = await fetch(`${SERVER_URL}/users/${currentUser.id}/basket/items`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity
        })
      });

      const data = await response.json();
      console.log("Added to server basket:", data);
      return;
    } catch (err) {
      console.error('Could not sync to server:', err);
      return;
    }
  }

  // Step 2 — check if item already exists in cart
  // Guest user -> use local cart only
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    // Step 3a — already in cart, just increase quantity
    existing.quantity += quantity;
  } else {
    // Step 3b — new item, add to cart
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.productType,  // ← updated
      image: product.mainImage,        // ← updated
      quantity: quantity
    });
  }

  // Step 4 — save to localStorage
  saveCart();

  // Step 5 — sync to server if user is logged in
  if (currentUser) {

    await initBasket(String(currentUser.id));


    await fetch(`${SERVER_URL}/users/${currentUser.id}/basket/items`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.id, name: product.name, price: product.price })
    }).catch(err => console.error('Could not sync to server:', err));
  }
}

// Removes a product completely from the cart by id
function removeItem(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();

  // sync removal to server if user is logged in
  const currentUser = getCurrentUser();
  if (currentUser) {
    fetch(`${SERVER_URL}/users/${currentUser.id}/basket/items/${productId}`, {
      method: 'DELETE'
    }).catch(err => console.error('Could not sync removal to server:', err));
  }
}

// Sets a specific quantity for a product
// Removes item if quantity reaches 0
function updateQuantity(productId, quantity) {

  // Step 1 — if quantity is 0 or less, remove item completely
  if (quantity <= 0) {
    removeItem(productId);
    return;
  }

  // Step 2 — find the item in cart
  const item = cart.find(item => item.id === productId);

  // Step 3 — update quantity
  item.quantity = quantity;

  // Step 4 — save
  saveCart();

  // Step 5 — sync to server if user is logged in
  const currentUser = getCurrentUser();
  if (currentUser) {
    // remove old item and re-add with new quantity
    fetch(`${SERVER_URL}/users/${currentUser.id}/basket/items/${productId}`, {
      method: 'DELETE'
    }).then(() => {
      fetch(`${SERVER_URL}/users/${currentUser.id}/basket/items`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: productId, name: item.name, price: item.price, quantity: quantity })
      });
    }).catch(err => console.error('Could not sync quantity to server:', err));
  }
}

// Empties the entire cart
function clearCart() {
  // clear server basket if user is logged in
  const currentUser = getCurrentUser();
  if (currentUser) {
    for (const item of cart) {
      fetch(`${SERVER_URL}/users/${currentUser.id}/basket/items/${item.id}`, {
        method: 'DELETE'
      }).catch(err => console.error('Could not remove item from server:', err));
    }
  }

  cart = [];
  saveCart();
}


// --- Read Functions ---

// Returns the full cart array
function getCart() {
  return cart;
}

// Returns the total price of all items in the cart
function getTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Returns total number of items (sum of all quantities)
function getItemCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}


// --- Storage Functions ---

// Saves the cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Loads the cart from localStorage
function loadCart() {
  const saved = localStorage.getItem("cart");
  if (saved) {
    cart = JSON.parse(saved);
  }
}

// ============================================
// Server Functions
// ============================================

// Checks if basket exists on server for this user
// Creates basket if it does not exist
// Called on login from auth.js
async function initBasket(userId) {

  try {

    // Step 1 - check if basket already exists
    const response = await fetch(`${SERVER_URL}/users/${userId}/basket`);

    if (response.status === 404) {

      // Step 2 - basket not found, create it
      const createResponse = await fetch(`${SERVER_URL}/users/${userId}/basket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (createResponse.status === 201) {
        console.log('Basket created for user:', userId);

        
        await syncLocalCartToServer(userId);
      } else {
        console.error('Could not create basket');
      }

    } else if (response.status === 200) {

      // Step 3 - basket already exists, sync any guest items too
      console.log('Basket already exists for user:', userId);
      await syncLocalCartToServer(userId);

    }

  } catch (error) {
    // if server is not running or unreachable
    console.error('Could not connect to server:', error);
  }
}

// Gets basket content from server for a specific user
// Called when logged in user wants to see their basket
async function getBasket(userId) {

  try {

    // Step 1 - call GET /users/:userId/basket
    const response = await fetch(`${SERVER_URL}/users/${userId}/basket`);

    if (response.status === 200) {

      // Step 2 - basket found, return it
      const basket = await response.json();
      console.log('Basket retrieved for user:', userId);
      return basket;

    } else if (response.status === 404) {

      // Step 3 - basket not found
      console.error('Basket not found for user:', userId);
      return null;

    }

  } catch (error) {
    // if server is not running or unreachable
    console.error('Could not connect to server:', error);
    return null;
  }
}

// Syncs guest cart items from localStorage to the server basket
// Called on login so items added as a guest are not lost
async function syncLocalCartToServer(userId) {
  const saved = localStorage.getItem("cart");
  if (!saved) return;

  const localItems = JSON.parse(saved);
  if (localItems.length === 0) return;

  for (const item of localItems) {
    try {
      await fetch(`${SERVER_URL}/users/${userId}/basket/items`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: item.id, name: item.name, price: item.price, quantity: item.quantity })
      });
    } catch (err) {
      console.error('Could not sync item to server:', err);
    }
  }

  localStorage.removeItem("cart");
  console.log('Guest cart synced to server for user:', userId);
}


function getCurrentUser() {
  const user = localStorage.getItem("dinoCurrentUser");
  return user ? JSON.parse(user) : null;
}