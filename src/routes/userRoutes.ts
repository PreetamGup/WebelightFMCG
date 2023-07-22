import { Router } from "express";
const {registerController,loginController}= require('../controllers/userController')

const router= Router();

router.post("/register",registerController)
router.post("/login", loginController)

export=router