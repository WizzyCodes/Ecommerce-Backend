import { Application, Request, Response } from "express";
import seller from "./router/sellerRouter";
import product from "./router/productRouter";

export const mainApp = async (app: Application) => {
  try {
    app.use("/api", seller);
    app.use("/api", product);
    app.use("/", (req: Request, res: Response) => {
      try {
        res.json({
          message: "Welcome to the deafult api",
        });
      } catch (error) {
        res.status(404).json({ message: "Error reading path" });
      }
    });
  } catch (error) {
    return error;
  }
};
