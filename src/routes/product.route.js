import { Router } from "express";
import { addProduct } from "../controller/product.controller.js";
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

export default productRouter;
