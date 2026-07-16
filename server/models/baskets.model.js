import * as fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basketsPath = path.join(__dirname, "..", "data", "baskets.json");

// Read Function
export async function readAllBaskets() { //Reads baskets.json
  const file = await fs.readFile(basketsPath, "utf8");
  return JSON.parse(file);
}

// Update Function
export async function writeAllBaskets(baskets) { // Saves updated basket data back into baskets.json
  await fs.writeFile(basketsPath, JSON.stringify(baskets, null, 2));
}