import { readAllProducts } from "../models/products.model.js";

// --- Requirement 1---
// Get most important information about all products that are offered.
export async function getAllProducts(req, res) {
    try {
      const products = await readAllProducts();

      // --- Requirement 4 ---
      //query const
      const {diet, size,environment,era,license} = req.query;
 
      //the filtering of the query / categories
      if (diet || size || environment || era || license) {
        let filtered = [...products]; //spread operator
 
        //filter implementation - === is comparing also type
        if (diet) filtered = filtered.filter(p => p.diet?.toLowerCase() === diet.toLowerCase());
        if (size) filtered = filtered.filter(p => p.size?.toLowerCase() === size.toLowerCase());
        if (environment) filtered = filtered.filter(p => p.environment?.toLowerCase() === environment.toLowerCase());
        if (era) filtered = filtered.filter(p => p.era?.toLowerCase() === era.toLowerCase());
        if (license) filtered = filtered.filter(p => String(p.requires_license) === license.toLowerCase());
 
        return res.json(filtered);
      }
      
      // --- Requirement 1 (Continued) ---
      // Return only the important fields for the product list
      const simplifiedProducts = products.map((product) => ({
        id: product.id,
        name: product.name,
        productType: product.productType,
        era: product.era,
        diet: product.diet,
        environment: product.environment,
        size: product.size,
        price: product.price,
        requires_license: product.requires_license,
        mainImage: product.mainImage,
        stock_quantity: product.stock_quantity,
      }));

      res.json(simplifiedProducts);
    } catch (parseError) {
      console.error("Error parsing products JSON:", parseError);
      res.status(500).json({ error: "Invalid JSON format in products file" });
    }
};

// --- Requirement 2---
// Get all details about a specific product.
export async  function getProductById (req, res) {
try {
      const products = await readAllProducts();
      const productId = Number(req.params.id); // This reads the id from the URL

      const product = products.find((product) => product.id === productId); // Finds the matching product in the array

      if (!product) {
        return res
          .status(404)
          .json({ error: "Raaaw! Product with this ID does not exist" });
      }

      res.json(product);
    } catch (error) {
      console.error("Error fetching product by id:", error);
      res
        .status(500)
        .json({ error: "Internal server error while fetching product details" });
    }
  };

// --- Requirement 3 ---
// Get categories from products
export async function getCategories(req, res) {
    try {
       const products = await readAllProducts();
 
      //creates sets for each category - note to self: can maybe be used for better filtration from last assignment
      const dietSet = new Set();
      const sizeSet = new Set();
      const envSet = new Set();
      const eraSet = new Set();
      const licenseSet = new Set();
 
      //adds data to right sets
      products.forEach((p) => {
        if (p.diet) dietSet.add(p.diet);
        if (p.size) sizeSet.add(p.size);
        if (p.environment) envSet.add(p.environment);
        if (p.era) eraSet.add(p.era);
 
        // add booleans correctly - no need to check for null
        if (typeof p.requires_license === "boolean") {
          licenseSet.add(String(p.requires_license));
        }
    });
 
    //sorts and makes arrays from sets
    const categories = {
      diet: Array.from(dietSet).sort(),
      size: Array.from(sizeSet).sort(),
      environment: Array.from(envSet).sort(),
      era: Array.from(eraSet).sort(),
      license: Array.from(licenseSet).sort()
    };
 
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error in getCategories:", error);
    res.status(500).json({ error: "Raaaw! Could not filter dinosaur categories 2"});
  }
};

