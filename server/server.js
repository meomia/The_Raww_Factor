import express from "express";
import cors from "cors";
import { productRouter } from "./routers/products.route.js";
import { basketRouter } from "./routers/baskets.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(productRouter);
app.use(basketRouter);

//Test Server
app.get("/", (req, res) => {
  res.send("Hello from DinoServer!!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});