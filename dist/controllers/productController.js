"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = __importDefault(require("../models/productModel"));
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { maxprice = 500000, minprice = 0, category } = req.query;
        const pageNumber = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (pageNumber - 1) * limit;
        console.log(req.query);
        if (req.query.page) {
            let allProduct = yield productModel_1.default.find(category ? { category, price: { $gt: minprice, $lt: maxprice } } : { price: { $gt: minprice, $lt: maxprice } })
                .skip(skip).limit(limit);
            return res.status(200).json({
                message: "All product fetched succefully",
                success: true,
                allProduct,
            });
        }
        else {
            let allProduct = yield productModel_1.default.find(category ? { category, price: { $gt: minprice, $lt: maxprice } } : { price: { $gt: minprice, $lt: maxprice } });
            return res.status(200).json({
                message: "All product fetched succefully",
                success: true,
                allProduct,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `Fetching all Product failed ${error}`,
        });
    }
});
const getProductDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.params.id;
        const customerDetails = yield productModel_1.default.findById(customerId);
        return res.status(200).json({
            message: "product detail fetched succefully",
            customerDetails,
            success: true,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `Fetching Product detail failed ${error}`,
        });
    }
});
const addNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existedProduct = yield productModel_1.default.findOne({ productName: req.body.productName });
        if (existedProduct) {
            return res.status(200).send({
                message: "Proudct already exists",
                success: false,
            });
        }
        const newProduct = new productModel_1.default(req.body);
        yield newProduct.save();
        return res.status(201).json({
            message: "New Product Added Successfully",
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: `Product creation is failed ${error}`,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const response = yield productModel_1.default.updateOne({ _id: productId }, req.body);
        if (response.modifiedCount === 1) {
            return res.status(200).json({
                message: "Product Update Successfully",
                success: true
            });
        }
        else {
            return res.status(400).json({
                message: "Product Not Exists",
                success: false
            });
        }
    }
    catch (error) {
        console.log(`Update error ${error}`);
        return res.status(500).json({
            message: `Update Error ${error}`,
            success: false
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cusId = req.params.id;
        const response = yield productModel_1.default.deleteOne({ _id: cusId });
        if (response.deletedCount === 1) {
            return res.status(200).json({
                message: "Product Details Deleted",
                success: true
            });
        }
        else {
            return res.status(404).json({
                message: "Product Not Exists",
                success: false
            });
        }
    }
    catch (error) {
        console.log(`Delete error ${error}`);
        return res.status(404).json({
            message: "Deleteing error",
            success: false
        });
    }
});
module.exports = { addNewProduct, getProductDetails, getAllProduct, updateProduct, deleteProduct };
