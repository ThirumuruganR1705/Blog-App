import express from "express";
import { blogsById, createBlogs, DeleteBlog, getAllBlogs, updateBlog } from "../controllers/blog-controller.js";
import imageuploadhandler from "../controllers/imageuploadhandler";

let blogRouter = express.Router();

blogRouter.get("/",getAllBlogs);
blogRouter.post("/findbyid",blogsById);
blogRouter.post("/create",createBlogs);
blogRouter.put("/update/:id",updateBlog);
blogRouter.delete("/delete/:id",DeleteBlog);
blogRouter.post("/uploadimage",imageuploadhandler);

export default blogRouter;