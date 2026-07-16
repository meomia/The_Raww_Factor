import express from "express";
import { 
    getAllProducts,
    getProductById,
    getCategories
 } from "../controllers/products.controller.js";

export const productRouter = express.Router();

// --- Requirement 1---
// Get most important information about all products that are offered.
productRouter.get("/products", getAllProducts);

// --- Requirement 2---
// Get all details about a specific product.
productRouter.get("/products/:id", getProductById);

// --- Requirement 3 ---
// Get categories from products
productRouter.get("/categories", getCategories);