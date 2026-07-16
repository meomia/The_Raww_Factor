import { 
    readAllBaskets, 
    writeAllBaskets 
} from "../models/baskets.model.js";

// --- Requirement 5 ---
// Create a shopping basket for a specific user
export async function createBasket(req, res) {
  try {
      
    // extract userId from URL -  e.g. /users/1/basket → userId = "1"
    const { userId } = req.params;

    const baskets = await readAllBaskets();

    // check if basket already exists for this user
    // find() looks through array for a match
    const existingBasket = baskets.find(b => b.userId === userId);

    // if basket already exists stop here and return 400 error
    // one basket per user only
    if (existingBasket) {
      return res.status(400)
      .json({ error: "basket already exists for this user" });
    }

    // create new empty basket object
    // Date.now() generates unique id based on current timestamp
    // userId links basket to specific user
    // items starts as empty array
    const newBasket = {
      id: Date.now(),  // unique id
      userId: userId,  // links basket to user
      items: []        // empty basket
    };

    // add new basket to baskets array
    baskets.push(newBasket);

    await writeAllBaskets(baskets);

    res.status(201).json(newBasket); // success! send back newly created basket
  } catch (error) {
    console.error("Error creating basket:", error);
    res.status(500).json({ error: "Could not create basket" });
  }
};

// --- Requirement 6 ---
// Put a product in the basket for a specific user
export async function addItemToBasket(req, res) {
  try {
    const { userId } = req.params;
    const { productId, name, price, quantity } = req.body;

    // productId is required - return 400 if missing
    if (!productId) {
      return res.status(400).json({ error: "productId is required" });
    }

    const baskets = await readAllBaskets();

    // find the basket for this user
    const basket = baskets.find(b => b.userId === userId);

    // if no basket exists for this user, return 404
    if (!basket) {
      return res.status(404).json({ error: "Basket not found for this user" });
    }

    const numericProductId = Number(productId);

    // check if product is already in the basket
    const existingItem = basket.items.find(
      item => item.productId === numericProductId
    );

    if (existingItem) {
    // product already in basket - increase quantity
      existingItem.quantity += (quantity || 1);
    } else {
    // new product - add it to items array
      basket.items.push({
        productId: numericProductId,
        name,
        price,
        quantity: quantity || 1
      });
    }

    // update/save
    await writeAllBaskets(baskets);

    res.status(200).json(basket);

  } catch (error) {
    console.error("Error adding item to basket:", error);
    res.status(500).json({ error: "Could not add item to basket" });
  }
};

// --- Requirement 7 ---
// Remove a product from the basket for a specific user
export async function removeItemFromBasket(req, res) {
  try {
    const { userId, productId } = req.params;

    const baskets = await readAllBaskets();

    // find the basket for this user
    const basket = baskets.find(b => b.userId === userId);

    // if no basket exists for this user, return 404
    if (!basket) {
      return res.status(404).json({ error: "Basket not found for this user" });
    }

    const numericProductId = Number(productId);

    // check if the product is actually in the basket
    const itemExists = basket.items.find(
      item => item.productId === numericProductId
    );

    if (!itemExists) {
      return res.status(404).json({ error: "Product not found in basket" });
    }

    // filter out the product we want to remove
    // keeps everything EXCEPT the product with this id
    basket.items = basket.items.filter(item => item.productId !== numericProductId);

    // update / save
    await writeAllBaskets(baskets);

    res.status(200).json(basket);

  } catch (error) {
    console.error("Error removing item from basket:", error);
    res.status(500).json({ error: "Could not remove item from basket" });
  }
};

// --- Requirement 8 ---
// Get shopping basket content for a specific user
export async function getBasketByUserId(req, res) {
  try {
    // extract userId from URL
    // e.g. /users/1/basket → userId = "1"
    const { userId } = req.params;

    const baskets = await readAllBaskets();

    // find basket that belongs to this user
    // compares userId from URL with userId stored in each basket
    const basket = baskets.find(b => b.userId === userId);

    // if no basket found for this user return 404 error
    if (!basket) {
      return res.status(404).json({ error: "basket not found" });
    }

    // success! send back the basket content
    // 200 = request succeeded
    res.status(200).json(basket);

  } catch (error) {
    console.error("Error fetching basket:", error);
    // if JSON in file is broken return 500 error
    res.status(500).json({ error: "Invalid JSON format in baskets file" });
  }
};