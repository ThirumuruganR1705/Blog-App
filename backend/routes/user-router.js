import { getAllUsers, getUser, getUserId, login, signup } from "../controllers/user-controller.js";
import express from "express";

let router = express.Router();

router.get("/users",getAllUsers);
router.post("/signup",signup);
router.post("/login",login);
router.post("/finduser",getUserId);
router.post("/fuser",getUser);

export default router;