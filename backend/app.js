import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-router.js";
import router from "./routes/user-router.js";
import cors from "cors";

let app = express();
app.use(express.json());
app.use(cors());
app.use("/api/user",router);
app.use("/api/blogs",blogRouter);
// app.use("api/imageupload",imageuploadhandler);

mongoose
.connect(
  "mongodb+srv://admin:tle6WWx5szM6UbFy@cluster0.7slggme.mongodb.net/?retryWrites=true&w=majority"
)
.then(app.listen(5000))
.then(console.log("Database Connected And Running on Port Number 5000"))
.catch((e) => {
  console.log(e);
});



