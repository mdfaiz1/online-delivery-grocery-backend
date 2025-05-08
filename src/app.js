import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// User Routes
import userRouter from "./routes/user.route.js";
app.use("/api/v1/user", userRouter);

// Seller Routes
import sellerRouter from "./routes/seller.route.js";
app.use("/api/v1/seller", sellerRouter);

// Product Routes
import productRouter from "./routes/product.route.js";
app.use("/api/v1/product", productRouter);

// Cart Router
import cartRouter from "./routes/cart.route.js";
app.use("/api/v1/cart", cartRouter);

// address Router
import addressRouter from "./routes/address.route.js";
app.use("/api/v1/address", addressRouter);

// Order Router
import orderRouter from "./routes/order.route.js";
app.use("/api/v1/order", orderRouter);

export { app };
