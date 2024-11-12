import { Request, Response } from "express";
import productModel from "../model/productModel";
import sellerModel from "../model/sellerModel";
import { Types } from "mongoose";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { productName, productPrice, productQTY, productDetail, category } =
      req.body;
    const { sellerID } = req.params;
    const seller = await sellerModel.findById(sellerID);
    if (seller && seller.status === "seller") {
      const product: any = await productModel.create({
        productName,
        productPrice,
        productQTY,
        productDetail,
        category,
        sellerID,
      });
      seller.sellerProduct.push(new Types.ObjectId(product?._id));
      seller.save();
      return res.status(201).json({
        message: "product created",
        data: product,
        status: 201,
      });
    } else {
      return res
        .status(404)
        .json({ message: "You are unauthorized for this action" });
    }
  } catch (error) {
    return res.status(404).json({ message: "Error creating" });
  }
};

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await productModel.find();
    return res.status(201).json({
      message: "products found",
      data: products,
      status: 201,
    });
  } catch (error) {
    return res.status(404).json({ message: "Error getting all products" });
  }
};

export const getSellerProduct = async (req: Request, res: Response) => {
  try {
    const { sellerID } = req.params;
    const products = await sellerModel.findById(sellerID).populate({
      path: "sellerProduct",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.status(201).json({
      message: "products found",
      data: products,
      status: 201,
    });
  } catch (error) {
    return res.status(404).json({ message: "Error getting all products" });
  }
};
