"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const { addNewProduct, getProductDetails, getAllProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.get("/allproduct", authMiddleware_1.default, getAllProduct);
router.post("/addProduct", authMiddleware_1.default, addNewProduct);
router.put("/updateProduct/:id", authMiddleware_1.default, updateProduct);
router.delete("/deleteProduct/:id", authMiddleware_1.default, deleteProduct);
module.exports = router;
