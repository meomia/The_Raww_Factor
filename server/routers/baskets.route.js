import express from "express";
import { 
    createBasket,
    addItemToBasket,
    removeItemFromBasket,
    getBasketByUserId
} from "../controllers/baskets.controller.js";

export const basketRouter = express.Router();

// --- Requirement 5 ---
// Create a basket for a specific user
basketRouter.post("/users/:userId/basket", createBasket);

// --- Requirement 6 ---
// Put a product in the basket for a specific user
basketRouter.put("/users/:userId/basket/items", addItemToBasket);

// --- Requirement 7 ---
// Remove a product from the basket for a specific user
basketRouter.delete("/users/:userId/basket/items/:productId", removeItemFromBasket);


// --- Requirement 8 ---
// Get basket content for a specific user
basketRouter.get("/users/:userId/basket", getBasketByUserId);