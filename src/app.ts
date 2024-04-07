import express from "express";
import logic from "./logics";
import {
  createValidation,
  isConflict,
  isProductIdValid,
  validation,
} from "./middlewares";

const app = express();

app.use(express.json());

app.post(
  "/products",
  validation(createValidation),
  isConflict,
  logic.createProduct
);
app.get("/products", logic.getProductList);
app.get("/products/:id", isProductIdValid, logic.getProductById);
app.patch("/products/:id", isConflict, isProductIdValid, logic.updatePartialProduct);
app.delete("/products/:id", logic.deleteProduct);

const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(`API started sucessfully in port: ${PORT}`);
});
