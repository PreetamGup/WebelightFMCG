import { Router } from "express";
const {registerController,loginController, getAllUser}= require('../controllers/userController')
import authMiddleware from "../middleware/authMiddleware";
import isAdminMiddleware from "../middleware/isAdminMiddleware";


const router= Router();

router.post("/register",registerController)
router.post("/login", loginController)
router.get("/alluser",authMiddleware,isAdminMiddleware, getAllUser) //route only admin can access

export=router