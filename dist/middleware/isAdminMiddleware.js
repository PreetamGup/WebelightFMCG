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
const userModel_1 = __importDefault(require("../models/userModel"));
const isAdminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.user.id;
        const user = yield userModel_1.default.findById(id);
        console.log(user);
        if (user === null || user === void 0 ? void 0 : user.isAdmin) {
            next();
        }
        else {
            res.status(401).json({
                message: 'Only admin can access',
                success: false
            });
        }
    }
    catch (error) {
        res.status(401).json({
            message: 'Auth Failed',
            success: false
        });
    }
});
exports.default = isAdminMiddleware;
