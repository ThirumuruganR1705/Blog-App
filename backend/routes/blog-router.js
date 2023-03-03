import express from "express";
import { blogsById, createBlogs, DeleteBlog, getAllBlogs, updateBlog } from "../controllers/blog-controller.js";

let blogRouter = express.Router();

blogRouter.get("/",getAllBlogs);
blogRouter.post("/findbyid",blogsById);
blogRouter.post("/create",createBlogs);
blogRouter.put("/update/:id",updateBlog);
blogRouter.delete("/delete/:id",DeleteBlog);

export default blogRouter;