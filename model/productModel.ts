import { Document, model, Schema, Types } from "mongoose";

interface iProduct {
  productName: string;
  productPrice: string;
  productQTY: string;
  productDetail: string;
  category: string;

  seller: {};
}

interface iProductData extends iProduct, Document {}

const productModel = new Schema<iProductData>({
  productName: {
    type: String,
    unique: true,
  },
  productPrice: {
    type: String,
  },
  productQTY: {
    type: String,
  },
  productDetail: {
    type: String,
  },
  category: {
    type: String,
  },

  seller: {
    type: Types.ObjectId,
    ref: "sellers",
  },
});

export default model<iProductData>("products", productModel);
