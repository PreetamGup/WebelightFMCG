import { Router } from "express";
const {addNewProduct, getProductDetails, getAllProduct, updateProduct, deleteProduct} = require('../controllers/productController')
import authMiddleware from "../middleware/authMiddleware";


const router= Router();

router.get("/allproduct",authMiddleware,getAllProduct)
router.post("/addProduct",authMiddleware,addNewProduct)
router.put("/updateProduct/:id",authMiddleware, updateProduct)
router.delete("/deleteProduct/:id",authMiddleware, deleteProduct)


export=router