import { Router } from "express";
import {
  addProduct,
  productList,
  productById,
  changeStock,
} from "../controller/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const productRouter = Router();

productRouter.route("/").post(
  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
  ]),
  addProduct
);
productRouter.route("/").get(productList);
productRouter.route("/:id").get(productById);
productRouter.route("/:id").patch(changeStock);

export default productRouter;
