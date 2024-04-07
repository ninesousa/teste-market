import { Request, Response } from "express";
import { productDatabase } from "./database";
import { Product } from "./interfaces";

let id = 1;

const createProduct = (req: Request, res: Response) => {
  const expirationDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 360);
  const newProduct = {
    id: id++,
    ...req.body,
    expirationDate: expirationDate,
  };
  productDatabase.push(newProduct);
  return res.status(201).json(newProduct);
};

const getProductList = (req: Request, res: Response) => {
  const totalPrice = productDatabase.reduce((acc, product) => {
    return acc + product.price;
  }, 0);

  const responseObjecto = {
    total: totalPrice,
    products: productDatabase,
  };
  return res.status(200).json(responseObjecto);
};

const getProductById = (req: Request, res: Response) => {
  return res.status(200).json(res.locals.foundProduct);
};

const updatePartialProduct = (req: Request, res: Response) => {
  const index = productDatabase.findIndex(
    (product) => product.id === +req.params.id
  );

  const updateProduct = (productDatabase[index] = {
    ...productDatabase[index],
    ...req.body,
  });

  productDatabase.splice(index, 1, updateProduct as Product);

  return res.status(200).json(updateProduct);
};

const deleteProduct = (req: Request, res: Response) => {
  const index = productDatabase.findIndex(
    (product) => product.id === +req.params.id
  );

  if (index === -1) {
    return res.status(404).json({ message: "Product not found." });
  }

  productDatabase.splice(index, 1);
  return res.status(204).json();
};

export default {
  createProduct,
  getProductList,
  getProductById,
  deleteProduct,
  updatePartialProduct,
};
