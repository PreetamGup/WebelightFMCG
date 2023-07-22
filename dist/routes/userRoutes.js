"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const { registerController, loginController, getAllUser } = require('../controllers/userController');
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const isAdminMiddleware_1 = __importDefault(require("../middleware/isAdminMiddleware"));
const router = (0, express_1.Router)();
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/alluser", authMiddleware_1.default, isAdminMiddleware_1.default, getAllUser); //route only admin can access
module.exports = router;
