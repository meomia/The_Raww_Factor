import * as fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, "..", "data", "products.json");

export async function readAllProducts() {
  const file = await fs.readFile(productsPath, "utf8");
  return JSON.parse(file);
}