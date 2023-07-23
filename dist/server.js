"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
dotenv_1.default.config();
(0, dbConnection_1.default)();
app.use("/users", userRoutes_1.default);
app.use("/products", productRoutes_1.default);
const swaggerOptions = require('../src/swagger.json');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerOptions));
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
    console.log("sever running.....");
});
