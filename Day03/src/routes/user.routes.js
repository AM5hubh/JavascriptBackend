import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser) //called from app.js

export default router