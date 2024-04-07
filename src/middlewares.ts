import { Request, Response, NextFunction } from "express";
import { productDatabase } from "./database";

export const validation =
  (validations: any) => (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    Object.entries(validations).forEach((validation) => {
      const [key, value] = validation;
      if (value === "required") {
        if (!req.body[key]) errors.push(`${key} is required`);
      }
    });

    if (errors.length > 0) {
      return res.status(422).json({ errors });
    }
    return next();
  };

export const createValidation = {
  name: "required",
  price: "required",
  weight: "required",
  section: "required",
};

export const isProductIdValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const foundProduct = productDatabase.find(
    (product) => product.id === +req.params.id
  );

  if (!foundProduct) {
    return res.status(404).json({ message: "Product not found." });
  }
  res.locals.foundProduct = foundProduct;
  return next();
};

export const isConflict = (req: Request, res: Response, next: NextFunction) => {
  const nameConflict = req.body.name;
  const products = productDatabase;

  const hasConflict = products.some((product) => product.name === nameConflict);
  if (hasConflict) {
    return res.status(409).json({ message: "Product already registered." });
  }

  return next();
};
