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
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel_1 = __importDefault(require("../models/userModel"));
const JWT_SECRET = "webelight1234564";
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({
                message: "User Not Found",
                success: false,
            });
        }
        const isMatch = bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({
                message: "Invalid Email or Password",
                success: false,
            });
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: "30d",
        });
        res.status(200).send({
            message: "Login Success",
            success: true,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Error in LonginController ${error}`,
        });
    }
});
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existedUser = yield userModel_1.default.findOne({ email: req.body.email });
        if (existedUser) {
            return res.status(200).send({
                message: "User already exists",
                success: false,
            });
        }
        const password = req.body.password;
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new userModel_1.default(req.body);
        yield newUser.save();
        res.status(201).send({
            message: "Registered Successfully",
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `register Controller ${error}`,
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUser = yield userModel_1.default.find({});
        return res.status(200).json({
            message: "All User fetched succefully",
            success: true,
            allUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `Fetching all User failed ${error}`,
        });
    }
});
module.exports = { registerController, loginController, getAllUser };
