import { Router } from "express";

import {
  createProduct,
  getAllProduct,
  getSellerProduct,
} from "../controller/productController";

const router: any = Router();

router.route("/create-product/:sellerID").post(createProduct);
router.route("/get-seller-product/:sellerID").get(getSellerProduct);
router.route("/get-all-product").get(getAllProduct);
export default router;
