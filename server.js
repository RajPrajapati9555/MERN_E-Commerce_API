import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user.js";
import bodyParser from "express";
import productRouter from "./Routes/product.js";
import cartRouter from "./Routes/cart.js";
import addressRouter from "./Routes/address.js";
import paymentRouter from "./Routes/payment.js"
import cors from "cors";
const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//home testing route
app.get("/", (req, res) => res.json({ message: "This is home route" }));

//user router
app.use("/api/user", userRouter);

//product router
app.use("/api/product", productRouter);

//cart Router
app.use("/api/cart", cartRouter);

// address router
app.use("/api/address", addressRouter);

//payment router
app.use("/api/payment",paymentRouter)

mongoose
  .connect(
    "mongodb+srv://rprajapati0812:DtWKrzNGiRatqa1t@cluster0.dxlhi.mongodb.net/",
    {
      dbName: "MERN_E_Commerce",
    }
  )
  .then(() => {
    console.log("MongoDB connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = 1000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
  ;
});

// rprajapati0812
// DtWKrzNGiRatqa1t
